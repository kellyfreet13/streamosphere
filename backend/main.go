package main

import (
	"fmt"
	"net/http"
	"github.com/anthonyasanchez/streamosphere/backend/security"
)

func main() {
	mux := http.NewServeMux()
	// Returns the response to a request to '/' on the host name i.e streamosphere.net/ or streamosphere.net
	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "Hello Secure World")
	})

	sec_req := security.SecureRequest{
		Handler: mux,
	}
	fmt.Printf("Securing HTTPS\n")
	sec_req.Secure() 

}
