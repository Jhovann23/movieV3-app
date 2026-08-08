package repositories

import (
	"errors"

	"github.com/Jhovann23/movieV3-app/config"
	"github.com/Jhovann23/movieV3-app/models"
)

type WatchListRepository interface {
	Add(watchList *models.Watchlist) error
	Remove(userID uint, movieID int) error
	GetByUser(userID uint) ([]models.Watchlist, error)
	IsInWatchList(userID uint, movieID int) (bool, error)
}

type watchListRepository struct{}

func NewWatchListRepository() WatchListRepository {
	return &watchListRepository{}
}

func (r *watchListRepository) Add(watchList *models.Watchlist) error {
	return config.DB.Create(watchList).Error
}

func (r *watchListRepository) Remove(userID uint, movieID int) error {
	result := config.DB.Where("user_id = ? AND movie_id = ?", userID, movieID).Delete(&models.Watchlist{})
	if result.RowsAffected == 0 {
		return errors.New("watch list not found")
	}
	return result.Error
}

func (r *watchListRepository) GetByUser(userID uint) ([]models.Watchlist, error) {
	var watchList []models.Watchlist
	err := config.DB.Where("user_id = ?", userID).Order("created_at DESC").Find(&watchList).Error
	return watchList, err
}

func (r *watchListRepository) IsInWatchList(userID uint, movieID int) (bool, error) {
	var watchList []models.Watchlist
	var count int64
	err := config.DB.Where("user_id = ? AND movie_id = ?", userID, movieID).Find(&watchList).Count(&count).Error

	return count > 0, err
}
