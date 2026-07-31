package models

import (
	"time"

	"github.com/google/uuid"
)

type Watchlist struct {
	PublicID   uuid.UUID `json:"public_id" db:"public_id"`
	InternalID int64     `json:"internal_id" db:"internal_id" gorm:"primaryKey"`
	UserID     int64     `json:"user_id" db:"user_id" gorm:"not null;index"`
	MovieID    int64     `json:"movie_id" db:"movie_id" gorm:"not null"`
	MovieTitle string    `json:"movie_title" db:"movie_title"`
	PosterPath string    `json:"poster_path" db:"poster_path"`
	CreatedAt  time.Time `json:"created_at" db:"created_at"`
}
