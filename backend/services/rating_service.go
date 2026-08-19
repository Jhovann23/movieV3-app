package services

import (
	"errors"

	"github.com/Jhovann23/movieV3-app/models"
	"github.com/Jhovann23/movieV3-app/repositories"
)

type RatingService interface {
	RateMovie(userID uint, movieID int, score int, review, posterPath, title string) error
	DeleteRatingByUser(userID uint, movieID int) error
	GetRatingByUser(userID uint, movieID int) (*models.Rating, error)
	GetAllRatingsUser(userID uint) ([]*models.Rating, error)
}

type ratingService struct {
	repo repositories.RatingRepository
}

func NewRatingService(repo repositories.RatingRepository) RatingService {
	return &ratingService{repo: repo}
}

func (s *ratingService) RateMovie(userID uint, movieID int, score int, review, posterPath, title string) error {
	if score < 1 || score > 5 {
		return errors.New("score must be between 1 and 5")
	}

	rating := &models.Rating{
		MovieID:    movieID,
		Score:      score,
		UserID:     userID,
		Review:     review,
		PosterPath: posterPath,
		MovieTitle: title,
	}

	return s.repo.Upsert(rating)
}

func (s *ratingService) DeleteRatingByUser(userID uint, movieID int) error {
	return s.repo.DeleteByUserAndMovie(userID, movieID)
}

func (s *ratingService) GetRatingByUser(userID uint, movieID int) (*models.Rating, error) {
	return s.repo.GetByUserAndMovie(userID, movieID)
}

func (s *ratingService) GetAllRatingsUser(userID uint) ([]*models.Rating, error) {
	return s.repo.GetAllRatings(userID)
}
