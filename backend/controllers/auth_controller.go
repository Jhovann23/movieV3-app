package controllers

import (
	"github.com/Jhovann23/movieV3-app/services"
	"github.com/Jhovann23/movieV3-app/utils"
	jwtware "github.com/gofiber/contrib/v3/jwt"
	"github.com/gofiber/fiber/v3"
	"github.com/golang-jwt/jwt/v5"
)

type AuthController struct {
	service services.UserService
}

func NewAuthController(s services.UserService) *AuthController {
	return &AuthController{s}
}

func (h *AuthController) Me(ctx fiber.Ctx) error {
	token := jwtware.FromContext(ctx)
	claims := token.Claims.(jwt.MapClaims)

	userIDFloat := claims["user_id"].(float64)
	userID := int(userIDFloat)

	user, err := h.service.FindById(userID)
	if err != nil {
		return utils.NotFound(ctx, "User tidak ditemukan", err.Error())
	}

	return ctx.JSON(fiber.Map{
		"data": fiber.Map{
			"id":    user.InternalID,
			"name":  user.Username,
			"email": user.Email,
		},
	})
}
