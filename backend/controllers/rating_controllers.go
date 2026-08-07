package controllers

import (
	"strconv"

	"github.com/Jhovann23/movieV3-app/services"
	"github.com/Jhovann23/movieV3-app/utils"
	jwtware "github.com/gofiber/contrib/v3/jwt"
	"github.com/gofiber/fiber/v3"
	"github.com/golang-jwt/jwt/v5"
)

type RatingController struct {
	services.RatingService
}

func NewRatingController(service services.RatingService) *RatingController {
	return &RatingController{service}
}

func (s *RatingController) RateMovie(ctx fiber.Ctx) error {
	token := jwtware.FromContext(ctx)

	claims := token.Claims.(jwt.MapClaims)

	userIDFloat := claims["user_id"].(float64)
	userID := uint(userIDFloat)
	movieID, _ := strconv.Atoi(ctx.Params("movie_id"))

	var req struct {
		Score  int    `json:"score"`
		Review string `json:"review"`
	}

	if err := ctx.Bind().Body(&req); err != nil {
		return utils.BadRequest(ctx, "Error binding body", err.Error())
	}

	if err := s.RatingService.RateMovie(uint(userID), movieID, req.Score, req.Review); err != nil {
		return utils.BadRequest(ctx, "Error rate movie", err.Error())
	}

	return utils.Success(ctx, "Rate movie", req)
}
