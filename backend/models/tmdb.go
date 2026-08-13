package models

type TMDBListMovieResponse struct {
	Page         int            `json:"page"`
	Results      []TMDBMovieRaw `json:"results"`
	TotalPages   int            `json:"total_pages"`
	TotalResults int            `json:"total_results"`
}

type TMDBMovieRaw struct {
	Adult            bool    `json:"adult"`
	BackdropPath     string  `json:"backdrop_path"`
	GenreIDs         []int   `json:"genre_ids"`
	ID               int     `json:"id"`
	OriginalLanguage string  `json:"original_language"`
	OriginalTitle    string  `json:"original_title"`
	Overview         string  `json:"overview"`
	Popularity       float64 `json:"popularity"`
	PosterPath       string  `json:"poster_path"`
	ReleaseDate      string  `json:"release_date"`
	Title            string  `json:"title"`
	Video            bool    `json:"video"`
	VoteAverage      float64 `json:"vote_average"`
	VoteCount        int     `json:"vote_count"`
}

type TMDBMovieCreditResponse struct {
	Page         int                  `json:"page"`
	Cast         []TMDBMovieCreditRaw `json:"cast"`
	TotalPages   int                  `json:"total_pages"`
	TotalResults int                  `json:"total_results"`
}

type TMDBMovieCreditRaw struct {
	ID          int    `json:"id"`
	Name        string `json:"name"`
	ProfilePath string `json:"profile_path"`
	Character   string `json:"character"`
}
