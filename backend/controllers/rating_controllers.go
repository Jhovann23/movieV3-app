package controllers

import (
	"strconv"

	"github.com/Jhovann23/movieV3-app/services"
	"github.com/Jhovann23/movieV3-app/utils"
	"github.com/gofiber/fiber/v3"
)

type RatingController struct {
	services.RatingService
}

func NewRatingController(service services.RatingService) *RatingController {
	return &RatingController{service}
}

func (s *RatingController) RateMovie(ctx fiber.Ctx) error {
	userID, _ := strconv.Atoi(ctx.Get("user_id"))
	movieID, _ := strconv.Atoi(ctx.Params("movie_id"))

	var req struct {
		Score int `json:"score"`
	}

	if err := ctx.Bind().Body(&req); err != nil {
		return utils.BadRequest(ctx, "Error binding body", err.Error())
	}

	if err := s.RatingService.RateMovie(uint(userID), movieID, req.Score); err != nil {
		return utils.BadRequest(ctx, "Error rate movie", err.Error())
	}

	return utils.Success(ctx, "Rate movie", req)
}
