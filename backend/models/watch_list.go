package models

import (
	"time"
)

type Watchlist struct {
	ID         uint      `json:"id" db:"id" gorm:"primaryKey"`
	UserID     uint      `json:"user_id" db:"user_id" gorm:"not null;uniqueIndex:idx_user_movie_watchlist" json:"user_id"`
	MovieID    int       `json:"movie_id" db:"movie_id" gorm:"not null;uniqueIndex:idx_user_movie_watchlist" json:"movie_id"`
	MovieTitle string    `json:"movie_title" db:"movie_title"`
	PosterPath string    `json:"poster_path" db:"poster_path"`
	CreatedAt  time.Time `json:"created_at" db:"created_at"`
}
