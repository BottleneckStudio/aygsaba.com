package model

// Auth ...
type Auth struct {
	ID           string `json:"id"`
	EmailAddress string `json:"email_address"`
	Password     string `json:"password,omitempty"`
}
