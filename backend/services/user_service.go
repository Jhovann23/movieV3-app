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
	Login(email, password string) (*models.User, error)
	Update(user *models.User) error
	Delete(id int) error
	FindByPublicId(public string) (*models.User, error)
	FindById(id int) (*models.User, error)
}
type userService struct {
	repo repositories.UserRepository
}

func NewUserServices(repo repositories.UserRepository) UserService {
	return &userService{repo: repo}
}

func (s *userService) Register(user *models.User) error {

	//kita cari di db ada atau tidak emailnya
	existing, _ := s.repo.FindByEmail(user.Email)
	if existing.InternalID != 0 {
		return errors.New("Email Already Registered!")
	}

	//lalu hash passwordnya menggunakan utils yang sudah kita buat
	hashPassword, err := utils.HashPassword(user.Password)
	if err != nil {
		return err
	}

	//mengisi models usernya spt role, email, password dll atau tempel ke models nya
	user.Password = hashPassword
	user.Role = "user"
	user.PublicID = uuid.New()

	//lalu kita return  create ke database
	return s.repo.Create(user)
}

func (s *userService) Login(email, password string) (*models.User, error) {
	//kita cek emailnya ada atau engga di database
	user, err := s.repo.FindByEmail(email)
	if err != nil {
		return nil, errors.New("Invalid Email")
	}

	//kita cek passwordnya sama atau tidak dengan yang ada di database, kalau false tidak masuk ke return if, jika true maka masuk
	if !utils.CheckHashPassword(password, user.Password) {
		return nil, errors.New("Invalid Credentials!")
	}

	//return user + errornya, kalau tidak error kasih nil
	return user, err
}

func (s *userService) Update(user *models.User) error {
	return s.repo.Update(user)
}

func (s *userService) Delete(id int) error {
	return s.repo.Delete(id)
}

func (s *userService) FindByPublicId(publicId string) (*models.User, error) {
	return s.repo.FindByPublicId(publicId)
}

func (s *userService) FindById(id int) (*models.User, error) {
	return s.repo.FindById(id)
}
