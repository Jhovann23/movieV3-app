package repositories

import (
	"github.com/Jhovann23/movieV3-app/config"
	"github.com/Jhovann23/movieV3-app/models"
)

type UserRepository interface {
	Create(user *models.User) error
	FindByEmail(email string) (*models.User, error)
	FindById(id int) (*models.User, error)
	FindByPublicId(publicId string) (*models.User, error)
	Update(user *models.User) error
	Delete(id int) error
}

type userRepository struct{}

func NewUserRepository() UserRepository {
	return &userRepository{}
}

func (r *userRepository) Create(user *models.User) error {
	return config.DB.Create(user).Error
}

func (r *userRepository) FindByEmail(email string) (*models.User, error) {
	var user models.User

	err := config.DB.Where("email = ?", email).First(&user).Error

	return &user, err
}

func (r *userRepository) FindById(id int) (*models.User, error) {
	var user models.User

	err := config.DB.First(&user, id).Error

	return &user, err
}

func (r *userRepository) FindByPublicId(publicId string) (*models.User, error) {
	var user models.User
	config.DB.Where("public_id_?", publicId).First(&user)

	return &user, nil
}

func (r *userRepository) Update(user *models.User) error {
	//menentukan model secara eksplisit, lalu mencari menggunakan where + parameter binding, setelah itu tinggal pakai update
	return config.DB.Model(&models.User{}).Where("public_id = ?", user.PublicID).Updates(map[string]interface{}{
		"username": user.Username,
	}).Error
}

func (r *userRepository) Delete(id int) error {
	return config.DB.Delete(&models.User{}, id).Error
}
