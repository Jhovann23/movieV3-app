package controllers

import (
	"strconv"

	"github.com/Jhovann23/movieV3-app/services"
	"github.com/Jhovann23/movieV3-app/utils"
	jwtware "github.com/gofiber/contrib/v3/jwt"
	"github.com/gofiber/fiber/v3"
	"github.com/golang-jwt/jwt/v5"
)

type WatchListController struct {
	service services.WatchList
}

func NewWatchListController(service services.WatchList) *WatchListController {
	return &WatchListController{service: service}
}

func (controller *WatchListController) AddWatchList(ctx fiber.Ctx) error {
	token := jwtware.FromContext(ctx)

	claims := token.Claims.(jwt.MapClaims)

	userIDFloat := claims["user_id"].(float64)
	userID := uint(userIDFloat)

	var req struct {
		MovieID    int    `json:"movie_id" binding:"required"`
		Title      string `json:"title" binding:"required"`
		PosterPath string `json:"poster_path"`
	}

	if err := ctx.Bind().Body(&req); err != nil {
		return utils.BadRequest(ctx, "Failed add watch list", err.Error())
	}

	err := controller.service.AddToWatchlist(userID, req.MovieID, req.Title, req.PosterPath)
	if err != nil {
		return utils.BadRequest(ctx, "Failed add watch list", err.Error())
	}

	return utils.Success(ctx, "Success add watch list", nil)
}

func (controller *WatchListController) RemoveWatchList(ctx fiber.Ctx) error {
	token := jwtware.FromContext(ctx)
	movieID, _ := strconv.Atoi(ctx.Params("movie_id"))

	claims := token.Claims.(jwt.MapClaims)

	userIDFloat := claims["user_id"].(float64)
	userID := uint(userIDFloat)

	if err := controller.service.RemoveFromWatchlist(userID, movieID); err != nil {
		return utils.BadRequest(ctx, "Failed remove watch list", err.Error())
	}

	return utils.Success(ctx, "Success remove watch list", nil)
}

func (controller *WatchListController) GetMyWatchList(ctx fiber.Ctx) error {
	token := jwtware.FromContext(ctx)

	claims := token.Claims.(jwt.MapClaims)

	userIDFloat := claims["user_id"].(float64)
	userID := uint(userIDFloat)

	watchList, _ := controller.service.GetMyWatchList(userID)

	return utils.Success(ctx, "Success get watch list", watchList)
}
