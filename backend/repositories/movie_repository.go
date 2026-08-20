package repositories

import (
	"encoding/json"
	"fmt"
	"net/http"
	url2 "net/url"
	"time"

	"github.com/Jhovann23/movieV3-app/models"
)

type tmdbMovieRepository struct {
	apiKey  string
	baseURL string
	client  *http.Client
}

type MovieRepository interface {
	GetPopularMovies(page int) (*models.MoviePaginatedResult, error)
	GetUpcomingMovies(page int) (*models.MoviePaginatedResult, error)
	GetTopRatedMovies(page int) (*models.MoviePaginatedResult, error)
	GetSearchMovies(search string, page int) (*models.MoviePaginatedResult, error)
	GetRecommendationsMovies(page int, movieID int) (*models.MoviePaginatedResult, error)
	GetDetails(page, movieID int) (*models.MovieDetailResult, error)
	GetCredits(page, movieID int) (*models.MovieCreditPaginatedResult, error)
	GetNowPlaying(page int) (*models.MoviePaginatedResult, error)
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
			ID:           movie.ID,
			Title:        movie.Title,
			Overview:     movie.Overview,
			ReleaseDate:  movie.ReleaseDate,
			VoteAverage:  movie.VoteAverage,
			BackdropPath: movie.BackdropPath,
			PosterPath:   movie.PosterPath,
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
			ID:           movie.ID,
			Title:        movie.Title,
			Overview:     movie.Overview,
			ReleaseDate:  movie.ReleaseDate,
			VoteAverage:  movie.VoteAverage,
			PosterPath:   movie.PosterPath,
			BackdropPath: movie.BackdropPath,
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
			ID:           movie.ID,
			Title:        movie.Title,
			Overview:     movie.Overview,
			ReleaseDate:  movie.ReleaseDate,
			VoteAverage:  movie.VoteAverage,
			PosterPath:   movie.PosterPath,
			BackdropPath: movie.BackdropPath,
		}
	}

	return &models.MoviePaginatedResult{
		Movies:       movies,
		Page:         page,
		TotalPages:   tmdbResp.TotalPages,
		TotalResults: tmdbResp.TotalResults,
	}, nil
}

func (r *tmdbMovieRepository) GetSearchMovies(search string, page int) (*models.MoviePaginatedResult, error) {
	url := fmt.Sprintf("%s/search/movie?query=%s&api_key=%s", r.baseURL, url2.QueryEscape(search), r.apiKey)
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
			ID:           movie.ID,
			Title:        movie.Title,
			Overview:     movie.Overview,
			ReleaseDate:  movie.ReleaseDate,
			VoteAverage:  movie.VoteAverage,
			PosterPath:   movie.PosterPath,
			BackdropPath: movie.BackdropPath,
		}
	}

	return &models.MoviePaginatedResult{
		Movies:       movies,
		Page:         page,
		TotalPages:   tmdbResp.TotalPages,
		TotalResults: tmdbResp.TotalResults,
	}, nil
}

func (r *tmdbMovieRepository) GetRecommendationsMovies(page int, movieID int) (*models.MoviePaginatedResult, error) {
	url := fmt.Sprintf("%s/movie/%d/recommendations?api_key=%s", r.baseURL, movieID, r.apiKey)
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
			ID:           movie.ID,
			Title:        movie.Title,
			Overview:     movie.Overview,
			ReleaseDate:  movie.ReleaseDate,
			VoteAverage:  movie.VoteAverage,
			PosterPath:   movie.PosterPath,
			BackdropPath: movie.BackdropPath,
		}
	}

	return &models.MoviePaginatedResult{
		Movies:       movies,
		Page:         page,
		TotalPages:   tmdbResp.TotalPages,
		TotalResults: tmdbResp.TotalResults,
	}, nil
}

func (r *tmdbMovieRepository) GetDetails(page, movieID int) (*models.MovieDetailResult, error) {
	url := fmt.Sprintf("%s/movie/%d?api_key=%s", r.baseURL, movieID, r.apiKey)
	get, err := r.client.Get(url)
	if err != nil {
		return nil, err
	}
	defer get.Body.Close()

	var tmdbResp models.TMDBMovieDetails
	if err := json.NewDecoder(get.Body).Decode(&tmdbResp); err != nil {
		return nil, err
	}

	return &models.MovieDetailResult{
		ID:           tmdbResp.ID,
		PosterPath:   tmdbResp.PosterPath,
		Runtime:      tmdbResp.Runtime,
		ReleaseDate:  tmdbResp.ReleaseDate,
		VoteAverage:  tmdbResp.VoteAverage,
		Genres:       tmdbResp.Genres,
		Overview:     tmdbResp.Overview,
		BackdropPath: tmdbResp.BackDropPath,
		Title:        tmdbResp.Title,
	}, nil

}

func (r *tmdbMovieRepository) GetCredits(page, movieID int) (*models.MovieCreditPaginatedResult, error) {
	url := fmt.Sprintf("%s/movie/%d/credits?api_key=%s", r.baseURL, movieID, r.apiKey)
	get, err := r.client.Get(url)
	if err != nil {
		return nil, err
	}
	defer get.Body.Close()

	var tmdbResp models.TMDBMovieCredit
	if err := json.NewDecoder(get.Body).Decode(&tmdbResp); err != nil {
		return nil, err
	}
	movies := make([]models.MovieCredit, len(tmdbResp.Cast))
	for i, movie := range tmdbResp.Cast {
		movies[i] = models.MovieCredit{
			CastId:      movie.ID,
			Name:        movie.Name,
			ProfilePath: movie.ProfilePath,
			Character:   movie.Character,
		}
	}

	return &models.MovieCreditPaginatedResult{
		Cast: movies,
	}, nil
}

func (r *tmdbMovieRepository) GetNowPlaying(page int) (*models.MoviePaginatedResult, error) {
	url := fmt.Sprintf("%s/movie/now_playing?api_key=%s&page=%d", r.baseURL, r.apiKey, page)

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
			ID:           movie.ID,
			Title:        movie.Title,
			Overview:     movie.Overview,
			ReleaseDate:  movie.ReleaseDate,
			VoteAverage:  movie.VoteAverage,
			PosterPath:   movie.PosterPath,
			BackdropPath: movie.BackdropPath,
		}
	}

	return &models.MoviePaginatedResult{
		Movies:       movies,
		Page:         page,
		TotalPages:   tmdbResp.TotalPages,
		TotalResults: tmdbResp.TotalResults,
	}, nil
}
