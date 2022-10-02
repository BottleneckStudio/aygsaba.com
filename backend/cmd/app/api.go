package main

import (
	"flag"
	"fmt"
)

const AppVersion = "0.0.0"

var flagConfig = flag.String("config", "./config/local.toml", "Path to config file. Default: local")

func main() {
	flag.Parse()

	fmt.Println(*flagConfig)
}