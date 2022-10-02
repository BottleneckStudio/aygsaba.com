package config

// AppDatabase represents the
// database configuration.
type AppDatabase struct {
	Dialect string `yaml:"dialect"`
	DSN     string `yaml:"dsn"`
}