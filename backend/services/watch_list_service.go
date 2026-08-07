package services

import (
	"errors"

	"github.com/Jhovann23/movieV3-app/models"
	"github.com/Jhovann23/movieV3-app/repositories"
)

type WatchList interface {
	AddToWatchlist(userID uint, movieID int, title, posterPath string) error
	RemoveFromWatchlist(userID uint, movieID int) error
	GetMyWatchList(userID uint) ([]models.Watchlist, error)
}

type watchListService struct {
	repo repositories.WatchListRepository
}

func NewWatchListService(repo repositories.WatchListRepository) WatchList {
	return &watchListService{repo: repo}
}

func (s *watchListService) AddToWatchlist(userID uint, movieID int, title, posterPath string) error {
	exist, err := s.repo.IsInWatchList(userID, movieID)
	if err != nil {
		return err
	}
	if exist {
		return errors.New("watch list already exists")
	}

	watchList := &models.Watchlist{
		MovieID:    movieID,
		UserID:     userID,
		MovieTitle: title,
		PosterPath: posterPath,
	}

	return s.repo.Add(watchList)
}

func (s *watchListService) RemoveFromWatchlist(userID uint, movieID int) error {
	return s.repo.Remove(userID, movieID)
}

func (s *watchListService) GetMyWatchList(userID uint) ([]models.Watchlist, error) {
	return s.repo.GetByUser(userID)
}
