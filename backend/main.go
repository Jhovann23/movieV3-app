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
	"github.com/gofiber/fiber/v3/middleware/cors"
)

func main() {
	config.LoadEnv()
	config.ConnectDB()

	seed.SeedAdmin()
	app := fiber.New()

	app.Use(cors.New(cors.Config{
		AllowOrigins: []string{"http://localhost:5173"},
		AllowMethods: []string{"GET,POST,PUT,DELETE,OPTIONS"},
		AllowHeaders: []string{"Origin, Content-Type, Accept, Authorization"},
	}))

	//injection manual atau rakit manual
	userRepository := repositories.NewUserRepository()
	userService := services.NewUserServices(userRepository)
	userController := controllers.NewUserController(userService)

	//injection manual movie
	movieRepository := repositories.NewMovieRepository(config.AppConfig.TMDBApiKey)
	movieService := services.NewMovieService(movieRepository)
	movieController := controllers.NewMovieController(movieService)

	//injection manual rating
	ratingRepository := repositories.NewRatingRepository()
	ratingService := services.NewRatingService(ratingRepository)
	ratingController := controllers.NewRatingController(ratingService)

	//injection manual watch_list
	watchListRepository := repositories.NewWatchListRepository()
	watchListService := services.NewWatchListService(watchListRepository)
	watchListController := controllers.NewWatchListController(watchListService)

	//setup route
	//panggil routes setupnya
	routes.Setup(app, userController, movieController, ratingController, watchListController)

	//logging port + log fatal
	port := config.AppConfig.AppPort
	log.Println("Starting server on port " + port)
	log.Fatal(app.Listen(":" + port))
}
