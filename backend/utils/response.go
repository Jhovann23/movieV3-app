package utils

import (
	"github.com/gofiber/fiber/v3"
)

type Response struct {
	Status string
	ResponseCode int
	Message string
	Data interface{}
	Error string
}

func Success(c fiber.Ctx, message string, data interface{} ) error {
	return c.Status(fiber.StatusOK).JSON(
		Response{
			Status: "Success",
			ResponseCode: fiber.StatusOK,
			Message: message,
			Data: data,
		},
	)
}

func BadRequest(c fiber.Ctx, message string, err error) error {
	return c.Status(fiber.StatusBadRequest).JSON(
		Response{
			Status: "Bad Request",
			ResponseCode: fiber.StatusBadRequest,
			Message: message,
			Error: err.Error(),
		},
	)
}

func NotFound(c fiber.Ctx, message string, err error) error {
	return c.Status(fiber.StatusNotFound).JSON(
		Response{
			Status: "Not Found",
			ResponseCode: fiber.StatusNotFound,
			Message: message,
			Error: err.Error(),
		},
	)
}

func Unauthorized(c fiber.Ctx, message string, err error) error {
	return c.Status(fiber.StatusUnauthorized).JSON(
		Response{
			Status: "Unauthorized",
			ResponseCode: fiber.StatusUnauthorized,
			Message: message,
			Error: err.Error(),
		},
	)
}

func InternalServerError(c fiber.Ctx, message string, err error) error {
	return c.Status(fiber.StatusInternalServerError).JSON(
		Response{
			Status: "Internal Server Error",
			ResponseCode: fiber.StatusInternalServerError,
			Message: message,
			Error: err.Error(),
		},
	)
}