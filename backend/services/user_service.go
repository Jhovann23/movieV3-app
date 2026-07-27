package services

import (
	"errors"

	"github.com/Jhovann23/movieV3-app/models"
	"github.com/Jhovann23/movieV3-app/repositories"
	"github.com/Jhovann23/movieV3-app/utils"
	"github.com/google/uuid"
)

type UserService interface {
	Register(user *models.User) error
}
type userService struct {
	repo repositories.UserRepository
}

func NewUserServices(repo repositories.UserRepository) UserService {
	return &userService{repo: repo}
}

func (s *userService) Register(user *models.User) error {
	//kita cari di db ada atau tidak emailnya
	//lalu hash passwordnya menggunakan utils yang sudah kita buat
	//mengisi models usernya spt role, email, password dll
	//lalu kita create ke database

	existing, _ := s.repo.FindByEmail(user.Email)
	if existing.InternalID != 0 {
		return errors.New("Email Already Registered!")
	}

	hashPassword, err := utils.HashPassword(user.Password)
	if err != nil {
		return err
	}

	user.Password = hashPassword
	user.Role = "user"
	user.PublicID = uuid.New()

	return s.repo.Create(user)
}
