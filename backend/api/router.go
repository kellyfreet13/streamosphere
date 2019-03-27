package api

import (
//	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
)

var router *gin.Engine

func InitApiHandler() *gin.Engine {
     router = gin.Default()
     initRoutes()
     router.Run()

     return router
}

func initRoutes(){
	// Handle GET requests for all albums, calls getAllAlbums in handlers.albums.go
	router.GET("/album/view/all", func(c *gin.Context) {
		c.JSON(200, gin.H {
		        "albums": getAllAlbums(),
		})
	})

    // list all of a users files
    router.GET("api/users", GetUsers)

    // list single file info
    router.GET("api/files/:file_id", GetSingleFile)

	// Handle POST request to edit any attribute(s). UpdateFile. in handlers.go
	router.PATCH("api/files/:file_id", UpdateFile)

	// Set route for default landing page.
	router.GET("/tester", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "Hello secure world",
		})
	})

	// Set route for default landing page.
	router.GET("/", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "Hello secure world",
		})
	})
	// Set route for login page.
	router.GET("/login", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "secure login",
		})
	})
}

func middleWareHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		// t := time.Now()
		// Add base headers
		// addCORS(c)
		// Run next function
		c.Next()
		// // Log request
		// log.Infof("%v %v %v %s", c.Request.RemoteAddr, c.Request.Method, c.Request.URL, time.Since(t))
	}
}
