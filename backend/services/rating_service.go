package services

import (
	"errors"

	"github.com/Jhovann23/movieV3-app/models"
	"github.com/Jhovann23/movieV3-app/repositories"
)

type RatingService interface {
	RateMovie(userID uint, movieID int, score int, review string) error
	DeleteRatingByUser(userID uint, movieID int) error
}

type ratingService struct {
	repo repositories.RatingRepository
}

func NewRatingService(repo repositories.RatingRepository) RatingService {
	return &ratingService{repo: repo}
}

func (s *ratingService) RateMovie(userID uint, movieID int, score int, review string) error {
	if score < 1 || score > 5 {
		return errors.New("score must be between 1 and 5")
	}

	rating := &models.Rating{
		MovieID: movieID,
		Score:   score,
		UserID:  userID,
		Review:  review,
	}

	return s.repo.Upsert(rating)
}

func (s *ratingService) DeleteRatingByUser(userID uint, movieID int) error {
	return s.repo.DeleteByUserAndMovie(userID, movieID)
}
