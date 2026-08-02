package controllers

import (
	"github.com/Jhovann23/movieV3-app/models"
	"github.com/Jhovann23/movieV3-app/services"
	"github.com/Jhovann23/movieV3-app/utils"
	"github.com/gofiber/fiber/v3"
	"github.com/jinzhu/copier"
)

type UserController struct {
	service services.UserService
}

func NewUserController(s services.UserService) *UserController {
	return &UserController{s}
}

func (c *UserController) Register(ctx fiber.Ctx) error {
	// membuat model baru menggunakan method bawaan go New()
	user := new(models.User)
	//body parser model
	if err := ctx.Bind().Body(user); err != nil {
		return utils.BadRequest(ctx, "Gagal Parsing data!", err.Error())
	}
	//panggil service register
	if err := c.service.Register(user); err != nil {
		return utils.BadRequest(ctx, "Registrasi Gagal!", err.Error())
	}
	//panggil user response dan simpan di sebuah variabel
	var userResponse models.UserResponse
	//copier copy struct
	_ = copier.Copy(&userResponse, &user)
	//return susccess
	return utils.Success(ctx, "Register Success", userResponse)
}

func (c *UserController) Login(ctx fiber.Ctx) error {
	//membuat struct untuk body
	var body struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}
	//parsing data yang dari body
	if err := ctx.Bind().Body(&body); err != nil {
		return utils.BadRequest(ctx, "Gagal Parsing data!", err.Error())
	}
	//panggil fungsi service login
	user, err := c.service.Login(body.Email, body.Password)
	if err != nil {
		return utils.Unauthorized(ctx, "Login Gagal!", err.Error())
	}

	//buat token atau generate token pakai utils yang sudah dibuat + generate refresh token
	token, _ := utils.GenerateToken(user.InternalID, user.Role, user.Email, user.PublicID)
	refresh, _ := utils.GenerateRefreshToken(user.InternalID)

	//copier ke userResponse
	var userResponse models.UserResponse
	_ = copier.Copy(&userResponse, &user)
	//return success + fiber.map dengan isi access,refresh token, dan user
	return utils.Success(ctx, "Login Success", fiber.Map{
		"access_token":  token,
		"refresh_token": refresh,
		"user":          userResponse,
	})
}
