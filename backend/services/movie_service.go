package services

import (
	"errors"

	"github.com/Jhovann23/movieV3-app/models"
	"github.com/Jhovann23/movieV3-app/repositories"
)

type MovieService interface {
	GetPopularMovies(page int) (*models.MoviePaginatedResult, error)
	GetUpcomingMovies(page int) (*models.MoviePaginatedResult, error)
	GetTopRatedMovies(page int) (*models.MoviePaginatedResult, error)
	GetSearchMovies(search string, page int) (*models.MoviePaginatedResult, error)
	GetRecommendationsMovies(page, movieID int) (*models.MoviePaginatedResult, error)
	GetDetailsMovies(page, movieID int) (*models.MovieDetailResult, error)
	GetCreditsMovies(page, movieID int) (*models.MovieCreditPaginatedResult, error)
	GetNowPlaying(page int) (*models.MoviePaginatedResult, error)
}

type movieService struct {
	repo repositories.MovieRepository
}

func NewMovieService(repo repositories.MovieRepository) MovieService {
	return &movieService{repo: repo}
}

func (s *movieService) GetPopularMovies(page int) (*models.MoviePaginatedResult, error) {
	if page < 1 {
		page = 1
	}
	return s.repo.GetPopularMovies(page)
}

func (s *movieService) GetUpcomingMovies(page int) (*models.MoviePaginatedResult, error) {
	if page < 1 {
		page = 1
	}
	return s.repo.GetUpcomingMovies(page)
}

func (s *movieService) GetTopRatedMovies(page int) (*models.MoviePaginatedResult, error) {
	if page < 1 {
		page = 1
	}
	return s.repo.GetTopRatedMovies(page)
}

func (s *movieService) GetSearchMovies(search string, page int) (*models.MoviePaginatedResult, error) {
	if page < 1 {
		page = 1
	}
	if search == "" {
		return nil, errors.New("search parameter is required")
	}

	return s.repo.GetSearchMovies(search, page)
}

func (s *movieService) GetRecommendationsMovies(page, movieID int) (*models.MoviePaginatedResult, error) {
	if page < 1 {
		page = 1
	}
	return s.repo.GetRecommendationsMovies(page, movieID)
}

func (s *movieService) GetDetailsMovies(page, movieID int) (*models.MovieDetailResult, error) {
	if page < 1 {
		page = 1
	}

	return s.repo.GetDetails(page, movieID)
}

func (s *movieService) GetCreditsMovies(page, movieID int) (*models.MovieCreditPaginatedResult, error) {
	if page < 1 {
		page = 1
	}
	return s.repo.GetCredits(page, movieID)
}

func (s *movieService) GetNowPlaying(page int) (*models.MoviePaginatedResult, error) {
	if page < 1 {
		page = 1
	}
	return s.repo.GetNowPlaying(page)
}
