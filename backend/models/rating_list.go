package models

import (
	"time"

	"github.com/google/uuid"
)

type Rating struct {
	PublicID   uuid.UUID `json:"public_id" db:"public_id" gorm:"public_id"`
	InternalID int64     `json:"internal_id" db:"internal_id" gorm:"primaryKey"`
	UserID     int64     `json:"user_id" db:"user_id" gorm:"not null;index"`
	MovieID    int       `json:"movie_id" db:"movie_id" gorm:"not null"`
	Score      float32   `json:"score" db:"score" gorm:"not null"` // misal 1-10
	Review     string    `json:"review" db:"review"`
	CreatedAt  time.Time `json:"created_at" db:"created_at"`
	UpdatedAt  time.Time `json:"updated_at" db:"updated_at"`
}
