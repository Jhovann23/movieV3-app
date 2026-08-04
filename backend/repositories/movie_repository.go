package repositories

import (
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"github.com/Jhovann23/movieV3-app/models"
)

type tmdbMovieRepository struct {
	apiKey  string
	baseURL string
	client  *http.Client
}

type MovieRepository interface {
	GetPopularMovies(Page int) (*models.MoviePaginatedResult, error)
	GetUpcomingMovies(Page int) (*models.MoviePaginatedResult, error)
	GetTopRatedMovies(Page int) (*models.MoviePaginatedResult, error)
}

func NewMovieRepository(apiKey string) MovieRepository {
	return &tmdbMovieRepository{
		apiKey:  apiKey,
		baseURL: "https://api.themoviedb.org/3",
		client:  &http.Client{Timeout: 10 * time.Second},
	}
}

func (r *tmdbMovieRepository) GetPopularMovies(page int) (*models.MoviePaginatedResult, error) {
	url := fmt.Sprintf("%s/movie/popular?api_key=%s&page=%d", r.baseURL, r.apiKey, page)

	get, err := r.client.Get(url)
	if err != nil {
		return nil, err
	}
	defer get.Body.Close()

	//buat struct untuk menampung movienya dan decode bodynya menjadi struct
	var tmdbResp models.TMDBListMovieResponse
	if err := json.NewDecoder(get.Body).Decode(&tmdbResp); err != nil {
		return nil, err
	}
	//mapping dari struct tmdb ke struct kita
	movies := make([]models.Movie, len(tmdbResp.Results))
	for i, movie := range tmdbResp.Results {
		movies[i] = models.Movie{
			ID:          movie.ID,
			Title:       movie.Title,
			Overview:    movie.Overview,
			ReleaseDate: movie.ReleaseDate,
			VoteAverage: movie.VoteAverage,
		}
	}

	return &models.MoviePaginatedResult{
		Movies:       movies,
		Page:         page,
		TotalPages:   tmdbResp.TotalPages,
		TotalResults: tmdbResp.TotalResults,
	}, nil
}

func (r *tmdbMovieRepository) GetUpcomingMovies(page int) (*models.MoviePaginatedResult, error) {
	url := fmt.Sprintf("%s/movie/upcoming?api_key=%s", r.baseURL, r.apiKey)
	get, err := r.client.Get(url)
	if err != nil {
		return nil, err
	}
	defer get.Body.Close()

	var tmdbResp models.TMDBListMovieResponse
	if err := json.NewDecoder(get.Body).Decode(&tmdbResp); err != nil {
		return nil, err
	}

	movies := make([]models.Movie, len(tmdbResp.Results))
	for i, movie := range tmdbResp.Results {
		movies[i] = models.Movie{
			ID:          movie.ID,
			Title:       movie.Title,
			Overview:    movie.Overview,
			ReleaseDate: movie.ReleaseDate,
			VoteAverage: movie.VoteAverage,
		}
	}

	return &models.MoviePaginatedResult{
		Movies:       movies,
		Page:         page,
		TotalPages:   tmdbResp.TotalPages,
		TotalResults: tmdbResp.TotalResults,
	}, nil
}

func (r *tmdbMovieRepository) GetTopRatedMovies(page int) (*models.MoviePaginatedResult, error) {
	url := fmt.Sprintf("%s/movie/top_rated?api_key=%s", r.baseURL, r.apiKey)
	get, err := r.client.Get(url)
	if err != nil {
		return nil, err
	}
	defer get.Body.Close()

	var tmdbResp models.TMDBListMovieResponse
	if err := json.NewDecoder(get.Body).Decode(&tmdbResp); err != nil {
		return nil, err
	}
	movies := make([]models.Movie, len(tmdbResp.Results))
	for i, movie := range tmdbResp.Results {
		movies[i] = models.Movie{
			ID:          movie.ID,
			Title:       movie.Title,
			Overview:    movie.Overview,
			ReleaseDate: movie.ReleaseDate,
			VoteAverage: movie.VoteAverage,
		}
	}

	return &models.MoviePaginatedResult{
		Movies:       movies,
		Page:         page,
		TotalPages:   tmdbResp.TotalPages,
		TotalResults: tmdbResp.TotalResults,
	}, nil
}
