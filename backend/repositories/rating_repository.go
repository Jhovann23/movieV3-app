package repositories

import (
	"github.com/Jhovann23/movieV3-app/config"
	"github.com/Jhovann23/movieV3-app/models"
	"gorm.io/gorm/clause"
)

type RatingRepository interface {
	Upsert(rating *models.Rating) error
	GetByUserAndMovie(userID uint, movieID int) (*models.Rating, error)
	GetAllRatings(userID uint) ([]*models.Rating, error)
	DeleteByUserAndMovie(userID uint, movieID int) error
}

type ratingRepository struct{}

func NewRatingRepository() RatingRepository {
	return &ratingRepository{}
}

func (r *ratingRepository) Upsert(rating *models.Rating) error {
	return config.DB.Clauses(clause.OnConflict{
		Columns:   []clause.Column{{Name: "user_id"}, {Name: "movie_id"}},
		DoUpdates: clause.AssignmentColumns([]string{"score", "updated_at"}),
	}).Create(rating).Error
}

func (r *ratingRepository) GetByUserAndMovie(userID uint, movieID int) (*models.Rating, error) {
	var rating models.Rating

	err := config.DB.Where("user_id = ? AND movie_id = ?", userID, movieID).First(&rating).Error
	if err != nil {
		return nil, err
	}
	return &rating, nil
}

func (r *ratingRepository) DeleteByUserAndMovie(userID uint, movieID int) error {
	result := config.DB.Where("user_id = ? AND movie_id = ?", userID, movieID).Delete(&models.Rating{})
	return result.Error
}

func (r *ratingRepository) GetAllRatings(userID uint) ([]*models.Rating, error) {
	var ratings []*models.Rating
	err := config.DB.Where("user_id = ?", userID).Order("created_at ASC").Find(&ratings).Error
	if err != nil {
		return nil, err
	}
	return ratings, nil
}
