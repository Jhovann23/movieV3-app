package controllers

import (
	"strconv"
	"strings"

	"github.com/Jhovann23/movieV3-app/services"
	"github.com/Jhovann23/movieV3-app/utils"
	"github.com/gofiber/fiber/v3"
)

type MovieController struct {
	service services.MovieService
}

func NewMovieController(service services.MovieService) *MovieController {
	return &MovieController{service: service}
}

func (controller *MovieController) GetPopularMovie(ctx fiber.Ctx) error {
	page, _ := strconv.Atoi(ctx.Params("page", "1"))

	movies, err := controller.service.GetPopularMovies(page)
	if err != nil {
		return utils.BadRequest(ctx, "Failed to fetch API", err.Error())
	}
	return utils.Success(ctx, "Get Popular Movies", movies)
}

func (controller *MovieController) GetUpcomingMovie(ctx fiber.Ctx) error {
	page, err := strconv.Atoi(ctx.Params("page", "1"))
	if err != nil {
		return err
	}
	movies, err := controller.service.GetUpcomingMovies(page)
	if err != nil {
		return utils.BadRequest(ctx, "Failed to fetch API", err.Error())
	}
	return utils.Success(ctx, "Get Upcoming Movies", movies)
}

func (controller *MovieController) GetTopRatedMovie(ctx fiber.Ctx) error {
	page, err := strconv.Atoi(ctx.Params("page", "1"))
	if err != nil {
		return err
	}
	movies, err := controller.service.GetTopRatedMovies(page)
	if err != nil {
		return utils.BadRequest(ctx, "Failed to fetch API", err.Error())
	}
	return utils.Success(ctx, "Get Top Movies", movies)
}

func (controller *MovieController) GetSearchMovie(ctx fiber.Ctx) error {
	query := strings.TrimSpace(ctx.Query("query"))
	page, err := strconv.Atoi(ctx.Params("page", "1"))
	if err != nil {
		return err
	}
	result, err := controller.service.GetSearchMovies(query, page)
	if err != nil {
		return utils.BadRequest(ctx, "Failed to fetch API", err.Error())
	}
	return utils.Success(ctx, "Get Search Movies", result)
}

func (controller *MovieController) GetRecommendationsMovie(ctx fiber.Ctx) error {
	movieID, err := strconv.Atoi(ctx.Params("movie_id"))
	if err != nil {
		return err
	}
	page, err := strconv.Atoi(ctx.Params("page", "1"))
	if err != nil {
		return err
	}

	result, err := controller.service.GetRecommendationsMovies(page, movieID)
	if err != nil {
		return utils.BadRequest(ctx, "Failed to fetch API", err.Error())
	}

	return utils.Success(ctx, "Success Get API", result)
}

func (controller *MovieController) GetDetailsMovie(ctx fiber.Ctx) error {
	movieID, err := strconv.Atoi(ctx.Params("movie_id"))
	if err != nil {
		return err
	}
	page, err := strconv.Atoi(ctx.Params("page", "1"))
	if err != nil {
		return err
	}

	result, err := controller.service.GetDetailsMovies(page, movieID)
	if err != nil {
		return utils.BadRequest(ctx, "Failed to fetch API", err.Error())
	}
	return utils.Success(ctx, "Success Get API", result)
}

func (controller *MovieController) GetCreditsMovie(ctx fiber.Ctx) error {
	movieID, err := strconv.Atoi(ctx.Params("movie_id"))
	if err != nil {
		return err
	}
	page, err := strconv.Atoi(ctx.Params("page", "1"))
	if err != nil {
		return err
	}
	result, err := controller.service.GetCreditsMovies(page, movieID)
	if err != nil {
		return utils.BadRequest(ctx, "Failed to fetch API", err.Error())
	}
	return utils.Success(ctx, "Success Get API", result)
}
