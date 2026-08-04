package models

type Movie struct {
	ID          int     `json:"id"`
	Title       string  `json:"title"`
	Overview    string  `json:"overview"`
	PosterPath  string  `json:"poster_path"`
	ReleaseDate string  `json:"release_date"`
	VoteAverage float64 `json:"vote_average"`
}

type MoviePaginatedResult struct {
	Movies       []Movie
	Page         int
	TotalPages   int
	TotalResults int
}
