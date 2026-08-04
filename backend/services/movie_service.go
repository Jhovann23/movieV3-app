package services

import (
	"github.com/Jhovann23/movieV3-app/models"
	"github.com/Jhovann23/movieV3-app/repositories"
)

type MovieService interface {
	GetPopularMovies(page int) (*models.MoviePaginatedResult, error)
	GetUpcomingMovies(page int) (*models.MoviePaginatedResult, error)
	GetTopRatedMovies(page int) (*models.MoviePaginatedResult, error)
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
