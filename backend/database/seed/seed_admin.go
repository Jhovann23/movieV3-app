package seed

import (
	"log"

	"github.com/Jhovann23/movieV2-app/config"
	"github.com/Jhovann23/movieV2-app/models"
	"github.com/Jhovann23/movieV2-app/utils"
	"github.com/google/uuid"
)

func SeedAdmin()  {
	password, _ := utils.HashPassword("jhovan23")

	admin := models.User{
		PublicID: uuid.New(),
		Username: "admin",
		Password: password,
		Email: "jovanfirmansyah23@gmail.com",
		Role: "admin",
	}

	if err := config.DB.FirstOrCreate(&admin, models.User{Email: admin.Email}).Error; err != nil{
		log.Println("Failed seeded admin")
	}
	log.Println("Admin user seeded")
}