package api

import (
    "context"
    "net/http"

    "go.mongodb.org/mongo-driver/bson"
    "go.mongodb.org/mongo-driver/bson/primitive"

    "github.com/gin-gonic/gin"
)

type Folder struct {
    ID          primitive.ObjectID  `bson:"_id,omitempty" json:"id"`
    UserID      string              `bson:"UserID,omitempty"`
    FileIDs     []string            `bson:"FileIDs,omitempty"`
    Name        string              `bson:"Name,omitempty"`
    ImageUrl    string              `bson:"ImageUrl"`
}

// get all the folders for a particular user
func GetAllFolders(c *gin.Context) {
    // get db and collection refs
    client := GetMongoClient()
    file_coll := client.Database("streamosphere").Collection("folders")

    // hit the db
    cursor, err := file_coll.Find(context.Background(), bson.M{"UserID": c.Param("UserID")})
    if err != nil { c.AbortWithError(404, err) }

    // decode all the folders from mongo into go structs
    var folders []*Folder
    defer cursor.Close(context.Background())
    for cursor.Next(context.Background()) {
        var folder_json Folder
        err := cursor.Decode(&folder_json)
        if err != nil { c.AbortWithError(500, err) }

        folders = append(folders, &folder_json)
    }

    c.Header("Content-Type", "application/json")
    c.JSON(http.StatusOK, folders)
}
