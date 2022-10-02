package config

// AppConfig represents the
// application specific
// configuration.
// i.e host, port, version, etc..
type AppConfig struct {
	Host       string `yaml:"host"`
	Port       int    `yaml:"port"`
	APIVersion string `yaml:"api_version"`
}