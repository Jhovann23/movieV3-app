package config

import (
	"fmt"
	"log"
	"os"
	"time"

	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var (
	DB        *gorm.DB
	AppConfig *Config
)

type Config struct {
	AppPort         string
	DBHost          string
	DBPassword      string
	DBName          string
	DBPort          string
	DBUser          string
	JWTSecret       string
	JWTExpired      string
	JWTRefreshToken string
}

func LoadEnv() {
	err := godotenv.Load()

	if err != nil {
		log.Fatal(".env not found")
	}

	AppConfig = &Config{
		AppPort:         GetEnv("PORT", "3030"),
		DBHost:          GetEnv("DB_HOST", "localhost"),
		DBPassword:      GetEnv("DB_PASSWORD", "admin"),
		DBName:          GetEnv("DB_NAME", "movie_app"),
		DBPort:          GetEnv("DB_PORT", "5432"),
		DBUser:          GetEnv("DB_USER", "postgres"),
		JWTSecret:       GetEnv("JWT_SECRET", "C2Xdk8wdVxR66dVZxMQ8Ck87YjM7QaJt7gNajF5OnQj"),
		JWTExpired:      GetEnv("JWT_EXPIRED", "6h"),
		JWTRefreshToken: GetEnv("REFRESH_TOKEN_EXPIRED", "24h"),
	}
}

func GetEnv(key string, fallback string) string {
	value, exist := os.LookupEnv(key)

	if exist {
		return value
	}

	return fallback
}

func ConnectDB() {
	cfg := AppConfig

	dsn := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable", cfg.DBHost, cfg.DBPort, cfg.DBUser, cfg.DBPassword, cfg.DBName)

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("failed to connect to database", err)
	}

	sqlDB, err := db.DB()
	if err != nil {
		log.Fatal("failed to get instance", err)
	}

	sqlDB.SetMaxIdleConns(10)
	sqlDB.SetMaxOpenConns(100)
	sqlDB.SetConnMaxLifetime(time.Hour)

	DB = db
}
