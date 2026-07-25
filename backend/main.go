package main

import (
	"github.com/Jhovann23/movieV3-app/config"
	"github.com/Jhovann23/movieV3-app/database/seed"
)

func main() {
	config.LoadEnv()
	config.ConnectDB()

	seed.SeedAdmin()
	//App := fiber.New()
}
