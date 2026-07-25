package seed

import (
	"log"

	"github.com/Jhovann23/movieV3-app/config"
	"github.com/Jhovann23/movieV3-app/models"
	"github.com/Jhovann23/movieV3-app/utils"
	"github.com/google/uuid"
)

func SeedAdmin() {
	password, _ := utils.HashPassword("jhovann23")

	admin := models.User{
		PublicID: uuid.New(),
		Username: "admin",
		Password: password,
		Email:    "admin@gmail.com",
		Role:     "admin",
	}

	if err := config.DB.FirstOrCreate(&admin, models.User{Email: admin.Email}).Error; err != nil {
		log.Println("Failed seeded admin")
	}
	log.Println("Admin user seeded")
}
