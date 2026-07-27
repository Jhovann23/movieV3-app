package utils

import (
	"github.com/gofiber/fiber/v3"
)

type Response struct {
	Status       string      `json:"status"`
	ResponseCode int         `json:"respons_code"`
	Message      string      `json:"message,omitempty"`
	Data         interface{} `json:"data,omitempty"`
	Error        string      `json:"error,omitempty"`
}

func Success(c fiber.Ctx, message string, data interface{}) error {
	return c.Status(fiber.StatusOK).JSON(
		Response{
			Status:       "Success",
			ResponseCode: fiber.StatusOK,
			Message:      message,
			Data:         data,
		},
	)
}

func BadRequest(c fiber.Ctx, message string, err string) error {
	return c.Status(fiber.StatusBadRequest).JSON(
		Response{
			Status:       "Bad Request",
			ResponseCode: fiber.StatusBadRequest,
			Message:      message,
			Error:        err,
		},
	)
}

func NotFound(c fiber.Ctx, message string, err string) error {
	return c.Status(fiber.StatusNotFound).JSON(
		Response{
			Status:       "Not Found",
			ResponseCode: fiber.StatusNotFound,
			Message:      message,
			Error:        err,
		},
	)
}

func Unauthorized(c fiber.Ctx, message string, err string) error {
	return c.Status(fiber.StatusUnauthorized).JSON(
		Response{
			Status:       "Unauthorized",
			ResponseCode: fiber.StatusUnauthorized,
			Message:      message,
			Error:        err,
		},
	)
}

func InternalServerError(c fiber.Ctx, message string, err string) error {
	return c.Status(fiber.StatusInternalServerError).JSON(
		Response{
			Status:       "Internal Server Error",
			ResponseCode: fiber.StatusInternalServerError,
			Message:      message,
			Error:        err,
		},
	)
}
