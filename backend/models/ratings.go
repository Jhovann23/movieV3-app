package models

import (
	"time"
)

type Rating struct {
	ID        uint      `json:"id" db:"id" grom:"primaryKey"`
	UserID    uint      `json:"user_id" db:"user_id" gorm:"not null;uniqueIndex:idx_user_movie"`
	MovieID   int       `json:"movie_id" db:"movie_id" gorm:"not null;uniqueIndex:idx_user_movie"`
	Score     int       `json:"score" db:"score" gorm:"not null"` // 1-5
	Review    string    `json:"review" db:"review"`
	CreatedAt time.Time `json:"created_at" db:"created_at"`
	UpdatedAt time.Time `json:"updated_at" db:"updated_at"`
}

type RatingSummary struct {
	MovieID      int `json:"movie_id" db:"movie_id" gorm:"not null;uniqueIndex:idx_user_movie"`
	AverageScore int `json:"average_score" db:"average_score" gorm:"not null"`
	TotalScore   int `json:"total_score" db:"total_score" gorm:"not null"`
}
