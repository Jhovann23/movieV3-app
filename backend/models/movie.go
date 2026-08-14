package models

type Movie struct {
	ID           int     `json:"id"`
	Title        string  `json:"title"`
	Overview     string  `json:"overview"`
	PosterPath   string  `json:"poster_path"`
	ReleaseDate  string  `json:"release_date"`
	VoteAverage  float64 `json:"vote_average"`
	BackdropPath string  `json:"backdrop_path"`
}

type MoviePaginatedResult struct {
	Movies       []Movie `json:"movies"`
	Page         int     `json:"page"`
	TotalPages   int     `json:"total_pages"`
	TotalResults int     `json:"total_results"`
}

type MovieDetailResult struct {
	ID           int     `json:"id"`
	PosterPath   string  `json:"poster_path"`
	Runtime      int     `json:"runtime"`
	ReleaseDate  string  `json:"release_date"`
	VoteAverage  float64 `json:"vote_average"`
	Genres       []Genre `json:"genres"`
	Overview     string  `json:"overview"`
	BackdropPath string  `json:"backdrop_path"`
	Title        string  `json:"original_title"`
}

type MovieDetailPaginatedResult struct {
	Page         int `json:"page"`
	TotalPages   int `json:"total_pages"`
	TotalResults int `json:"total_results"`
}

type MovieCredit struct {
	CastId      int    `json:"cast_id"`
	Name        string `json:"name"`
	ProfilePath string `json:"profile_path"`
	Character   string `json:"character"`
}

type MovieCreditPaginatedResult struct {
	Cast         []MovieCredit `json:"cast"`
	Page         int           `json:"page"`
	TotalPages   int           `json:"total_pages"`
	TotalResults int           `json:"total_results"`
}
