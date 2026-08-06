package repositories

import (
	"github.com/Jhovann23/movieV3-app/config"
	"github.com/Jhovann23/movieV3-app/models"
)

type WatchListRepository interface {
	Add(watchList *models.Watchlist) error
}

type watchListRepository struct{}

func NewWatchListRepository() WatchListRepository {
	return &watchListRepository{}
}

func (r *watchListRepository) Add(watchList *models.Watchlist) error {
	return config.DB.Create(watchList).Error
}
