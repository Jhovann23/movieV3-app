package main

import (
	"log"

	"github.com/Jhovann23/movieV3-app/config"
	"github.com/Jhovann23/movieV3-app/controllers"
	"github.com/Jhovann23/movieV3-app/database/seed"
	"github.com/Jhovann23/movieV3-app/repositories"
	"github.com/Jhovann23/movieV3-app/routes"
	"github.com/Jhovann23/movieV3-app/services"
	"github.com/gofiber/fiber/v3"
)

func main() {
	config.LoadEnv()
	config.ConnectDB()

	seed.SeedAdmin()
	app := fiber.New()

	//injection manual atau rakit manual
	userRepository := repositories.NewUserRepository()
	userService := services.NewUserServices(userRepository)
	userController := controllers.NewUserController(userService)

	//panggil routes setupnya
	routes.Setup(app, userController)

	//logging port + log fatal
	port := config.AppConfig.AppPort
	log.Println("Starting server on port " + port)
	log.Fatal(app.Listen(":" + port))
}
