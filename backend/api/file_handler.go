// file_handler.go

package api

import (
    "log"
    "context"
    "net/http"
//    "strings"
//    "encoding/json"
//    "bytes"

    "go.mongodb.org/mongo-driver/bson"
    "go.mongodb.org/mongo-driver/mongo"
//    "github.com/mongodb/mongo-go-driver/mongo"
//    "github.com/mongodb/mongo-go-driver/bson/primitive"

    "github.com/gin-gonic/gin"
)

// since Content can have dynamic json, we'll use a map
type File struct {
    ID       string             `bson:"id,omitempty"`
    UserID   string             `bson:"user_id,omitempty"`
    ImageUrl string             `bson:"ImageUrl,omitempty"`
    Type     string             `bson:"Type,omitempty"`
    Size     string             `bson:"Size,omitempty"`
    Content  map[string]string  `bson:"Content,omitempty"`
}

// possible to-do: implement Content as a generic struct that
// can contain an AlbumContent, SongContent, or VideoContent struct
type AlbumContent struct {
    Title       string      `json:"Title"`
    Artist      string      `json:"Artist"`
    Genre       string      `json:"Genre"`
    Label       string      `json:"Label"`
    ReleaseDate string      `json:"ReleaseDate"`
    Length      string      `json:"Length"`
    TrackCount  int         `json:"TrackCount"`
    TrackList   []string    `json:"TrackList"`
    // should really be an array of SongContent if implemented
}

type Update struct {
    OP      string      `json:"op"`
    Path    string      `json:"path"`
    Value   string      `json:"value"`
}

var file_coll *mongo.Collection

// ex: { "op": "replace", "path": "user_id", "value": "updated user id" }
// ex: { "op": "replace", "path": "Content.Title", "value": "updated title" }
// ex: { "op": "replace", "path": "Content.NewAttribute", "value": "A sexy new attribute" }
func UpdateFile(c *gin.Context) {

    client := GetMongoClient()
    file_coll = client.Database("streamosphere").Collection("files")

    // get json from PATCH request body and read into File struct
    var json_req Update
    c.BindJSON(&json_req)

    // filter by document id
    filter := bson.M{ "id": c.Param("file_id")}

    // create the update based on operation through switch
    // implement other operations later
    update := bson.D{}
    switch json_req.OP {
        case "replace":
            update = bson.D{{"$set", bson.M {json_req.Path: json_req.Value} }}
    }

    // update in the db
    _, update_err := file_coll.UpdateOne(context.Background(), filter, update)
    if update_err != nil { c.AbortWithError(400, update_err) }

    // return a nice response
    c.Header("Content-Type", "application/json")
    c.JSON(http.StatusOK, gin.H {
        "message": "File successfully updated",
    })
}

func GetSingleFile(c *gin.Context) {
    client := GetMongoClient()
    file_coll = client.Database("streamosphere").Collection("files")

    filter := bson.M{"id": c.Param("file_id")}
    result := file_coll.FindOne(context.Background(), filter)

    file_json := &File{}
    file_err := result.Decode(file_json)
    if file_err != nil { log.Fatal(file_err); log.Fatal("[GetSingleFile] could not decode") }

    c.Header("Content-Type", "application/json")
    c.JSON(http.StatusOK, file_json)
}

