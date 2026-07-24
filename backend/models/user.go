package models

import (
	"time"

	"github.com/google/uuid"
)

type User struct {
	InternalID int64
	PublicID   uuid.UUID
	Username string
	Email string
	Password string
	Role string
	CreatedAt time.Time
	DeletedAt time.Time
	UpdatedAt time.Time
}

type UserResponse struct {
	PublicID uuid.UUID
	Username string
	Email string
	Role string
	CreatedAt time.Time
	DeletedAt time.Time
	UpdatedAt time.Time
}