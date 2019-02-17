package main

import (
	"fmt"
	"net/http"
	"github.com/anthonyasanchez/streamosphere/backend/security"
	"github.com/anthonyasanchez/streamosphere/backend/api"
)

func main() {
	api_handler := api.CreateApiHandler()
	// Define default server port and paths to handle.
	server := &http.Server{
		Addr:    ":8443",
		Handler: api_handler,
	}
	// Getting Certification Manager for Server.
	cert_manager := security.SecureHTTPS(server) 

	fmt.Printf("Serving on HTTPS\n")
	// The http server is listening to port 8080 for http request and will send an invalid response.
	go http.ListenAndServe(":8080", cert_manager.HTTPHandler(nil))
	// Will by default use the TLSConfig in the construction of the server above.
	server.ListenAndServeTLS("", "")
}
