package main

import (
	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()
	router.Use(static.Serve("/", static.LocalFile("frontend/dist/", true)))
	router.Run(":8080")
}

//
//import (
//	"backend/api"
//	"net/http"
//	//"github.com/kellyfreet13/streamosphere/backend/security"
//	//"github.com/kellyfreet13/streamosphere/backend/api"
//)
//
//
//func main() {
//
//    router_ref := api.InitApiHandler()
//
//	// Define default server port and paths to handle.
//	// Use port 8443 which the server vm will forward traffic from 443. i.e 443 -> 8443
//	server := &http.Server{
//		Addr:    ":8443",
//		Handler: router_ref,
//	}
//	// Getting Certification Manager for Server.
//	cert_manager := security.SecureHTTPS(server)
//
//	// The http server is listening to port 8080 for http request and will send an invalid response.
//	go http.ListenAndServe(":8080", cert_manager.HTTPHandler(nil))
//
//	// Will by default use the TLSConfig defined in 'SecureHTTPS'.
//	server.ListenAndServeTLS("", "")
//}
