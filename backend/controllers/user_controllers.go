package controllers

import (
	"github.com/Jhovann23/movieV3-app/services"
	"github.com/gofiber/fiber/v3"
)

type UserController struct {
	service services.UserService
}

func NewUserController(s services.UserService) *UserController {
	return &UserController{s}
}

func (c *UserController) Register(ctx fiber.Ctx) error {

}
