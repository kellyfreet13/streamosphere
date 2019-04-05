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

    // ------------------------- FILES -------------------------
    router.GET("api/files/:file_id", GetSingleFile)
    router.GET("api/users/:user_id/files", GetAllFiles)
    router.GET("api/users/:user_id/files/:file_type", GetAllFilesByType)

    // Hanlde PATCH to edit any file attribute(s) (except arrays at the moment)
    router.PATCH("api/files/:file_id", UpdateFile)

    // ------------------------- USERS -------------------------
    router.GET("api/users", GetUsers)


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
