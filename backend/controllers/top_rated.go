package controllers

import (
	"encoding/json"
	"io"
	"net/http"

	"github.com/Jhovann23/movieV3-app/config"
	"github.com/Jhovann23/movieV3-app/utils"
	"github.com/gofiber/fiber/v3"
)

func GetTopRatedMovie(ctx fiber.Ctx) {
	apiKey := config.GetEnv("API_KEY", "e8fa4e55e0a5b3c10498a6007494f603")
	url := "https://api.themoviedb.org/3/movie/top_rated?api_key=" + apiKey

	get, err := http.Get(url)
	if err != nil {
		_ = utils.InternalServerError(ctx, "Cannot get popular movie", err.Error())

		return
	}

	defer get.Body.Close()

	body, _ := io.ReadAll(get.Body)

	var data interface{}

	err = json.Unmarshal(body, &data)
	if err != nil {
		return
	}
}
