package utils

import (
	"time"
	_ "time"

	"github.com/Jhovann23/movieV3-app/config"
	"github.com/golang-jwt/jwt/v5"
	_ "github.com/golang-jwt/jwt/v5"
	"github.com/google/uuid"
	_ "github.com/google/uuid"
)

func GenerateToken(userID int64, role, email string, publicID uuid.UUID) (string, error) {
	secret := config.AppConfig.JWTSecret
	duration, _ := time.ParseDuration(config.AppConfig.JWTExpired)

	claims := jwt.MapClaims{
		"user_id":  userID,
		"role":     role,
		"email":    email,
		"publicID": publicID,
		"exp":      time.Now().Add(duration).Unix(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	return token.SignedString([]byte(secret))
}

func GenerateRefreshToken(userID int64) (string, error) {
	secret := config.AppConfig.JWTSecret
	duration, _ := time.ParseDuration(config.AppConfig.JWTExpired)

	claims := jwt.MapClaims{
		"user_id": userID,
		"exp":     time.Now().Add(duration).Unix(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	return token.SignedString([]byte(secret))
}
