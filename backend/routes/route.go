package routes

import (
	"github.com/Jhovann23/movieV3-app/config"
	"github.com/Jhovann23/movieV3-app/controllers"
	"github.com/Jhovann23/movieV3-app/utils"
	jwtware "github.com/gofiber/contrib/v3/jwt"
	"github.com/gofiber/fiber/v3"
	"github.com/joho/godotenv"
)

func Setup(app *fiber.App, uc *controllers.UserController) {
	//loadEnv pakai godotenv
	err := godotenv.Load()
	if err != nil {
		return
	}
	//post untuk login dan register
	app.Post("/login", uc.Login)
	app.Post("/register", uc.Register)

	//JWT Protected Routes memakai jwtwareNew jwtware.config + error handlernya(fungsi) (ditampung di var api) + app group
	api := app.Group("/api/v1", jwtware.New(jwtware.Config{
		SigningKey: jwtware.SigningKey{Key: []byte(config.AppConfig.JWTSecret)},
		ErrorHandler: func(ctx fiber.Ctx, err error) error {
			return utils.Unauthorized(ctx, "Unauthorized", err.Error())
		},
	}))

	//deklarasi user group untuk "/users" (ditampung di variabel)

	userGroup := api.Group("/users")

	//lalu fungsi get, put, delete, put + app group
	userGroup.Delete("/:id", uc.DeleteUser)
	userGroup.Put(":id", uc.Update)
}
