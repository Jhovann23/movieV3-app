package models

import (
	"time"

	"github.com/google/uuid"
)

type Comment struct {
	PublicID   uuid.UUID `json:"public_id" db:"public_id"`
	InternalID int64     `json:"internal_id" gorm:"internal_id" db:"internal_id"`
	UserID     int64     `json:"user_id" gorm:"not null;index" db:"user_id"`
	MovieID    int       `json:"movie_id" gorm:"not null;index" db:"movie_id"`
	Content    string    `json:"content" gorm:"type:text;not null" json:"content,omitempty" db:"content"`
	CreatedAt  time.Time `json:"created_at" json:"created_at"`
	UpdatedAt  time.Time `json:"updated_at" json:"updated_at" `
}
