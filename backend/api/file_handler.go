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
//    "go.mongodb.org/mongo-driver/mongo"
//    "github.com/mongodb/mongo-go-driver/mongo"
    "go.mongodb.org/mongo-driver/bson/primitive"

    "github.com/gin-gonic/gin"
)

// since Content can have dynamic json, we'll use a map
type File struct {
    ID       primitive.ObjectID `bson:"_id,omitempty" json:"id"`
    UserID   string             `bson:"user_id,omitempty"`
    ImageUrl string             `bson:"ImageUrl,omitempty"`
    Type     string             `bson:"Type,omitempty"`
    Size     string             `bson:"Size,omitempty"`
    Content  interface{}        `bson:"Content,omitempty"`
}

type FileForAlbum struct {
    AlbumContent    `bson:"Content"`
}
type FileForSong struct {
    SongContent     `bson:"Content"`
}
type FileForVideo struct {
    VideoContent    `bson:"Content"`
}

// to-do: get rid of all null's and make sure all attributes are present

// possible to-do: implement Content as a generic struct that
// can contain an AlbumContent, SongContent, or VideoContent struct
type AlbumContent struct {
    // generic and unique album
    Title       string      `bson:"Title,omitempty"`
    Artist      string      `bson:"Artist,omitempty"`
    Genre       []string    `bson:"Genre,omitempty"`
    Label       string      `bson:"Label,omitemtpy"`
    ReleaseDate string      `bson:"ReleaseDate,omitempty"`
    Length      string      `bson:"Length,omitempty"`
    TrackCount  int         `bson:"TrackCount,omitempty"`
    Tracklist   []Track     `bson:"Content.Tracklist,omitempty"`

    // unique song
    //Album       string      `bson:"Album,omitempty"`
    //PerformedBy string      `bson:"PerformedBy,omitempty"`

    // unique video
    //Director    []string    `bson:"Director,omitempty"`
    //Writers     []string    `bson:"Writers,omitempty"`
    //Actors      []string    `bson:"Actors,omitempty"`
    //imdbRating  string      `bson:"imdbRating,omitempty"`

}

// different from a song in that it's a track on an album
type Track struct {
    Number  int     `bson:"Number,omitempty"`
    Title   string  `bson:"Title,omitempty"`
    Length  string  `bson:"Length,omitempty"`
}

type SongContent struct {
    Title       string      `bson:"Title,omitempty"`
    Album       string      `bson:"Album,omitempty"`
    Artist      string      `bson:"Artist,omitempty"`
    Genre       []string    `bson:"Genre,omitempty"`
    ReleaseDate string      `bson:"ReleaseDate,omitempty"`
    PerformedBy string      `bson:"PerformedBy,omitempty"`
    Label       string      `bson:"Label,omitempty"`
    Length      string      `bson:"Length"`
}

type VideoContent struct {
    Title       string      `bson:"Title,omitempty"`
    Length      string      `bson:"Length,omitempty"`
    Description string      `bson:"Description,omitempty"`
    Genre       []string    `bson:"Genre,omitempty"         json:"Genre,omitempty"`
    Director    []string    `bson:"Director,omitempty"      json:"Director,omitempty"`
    Writers     []string    `bson:"Writers,omitempty"       json:"Writers,omitempty"`
    Actors      []string    `bson:"Actors,omitempty"        json:"Actors,omitempty"`
    imdbRating  string      `bson:"imdbRating,omitempty"    json:"imdbRating,omitempty"`
}

type Update struct {
    OP      string      `json:"op"`
    Path    string      `json:"path"`
    Value   string      `json:"value"`
}

// ex: { "op": "replace", "path": "user_id", "value": "updated user id" }
// ex: { "op": "replace", "path": "Content.Title", "value": "updated title" }
// ex: { "op": "replace", "path": "Content.NewAttribute", "value": "A sexy new attribute" }
func UpdateFile(c *gin.Context) {

    // get a managed client connection, and connect to db and collection
    client := GetMongoClient()
    file_coll := client.Database("streamosphere").Collection("files")

    // get json from PATCH request body and read into File struct
    var json_req Update
    c.BindJSON(&json_req)

    // filter by document id
    file_id := c.Param("file_id")
    bson_id, _ := primitive.ObjectIDFromHex(file_id) // ==== LEFT OF HERE =====
    filter := bson.M{"_id": bson_id}

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

func GetAllFilesByType(c *gin.Context) {
    client := GetMongoClient()
    file_coll := client.Database("streamosphere").Collection("files")

    // to-do: implement switch so string is plural (i.e. videos, songs)
    file_type := c.Param("file_type")
    file_type = file_type[0:len(file_type)-1]
    filter := bson.M{"user_id": c.Param("user_id"), "Type": file_type}
    cur, err := file_coll.Find(context.Background(), filter)
    if err != nil { c.AbortWithError(400, err) }

    var files[]*File
    defer cur.Close(context.Background())
    for cur.Next(context.Background()) {
        var file_json File
        if err := cur.Decode(&file_json); err != nil { log.Fatal(err) }

        result := file_coll.FindOne(context.Background(), bson.M{"_id": file_json.ID})

        switch file_type {
            case "song":
                var doc4song FileForSong
                err = result.Decode(&doc4song)
                file_json.Content = doc4song.SongContent
            case "album":
                var doc4album FileForAlbum
                err = result.Decode(&doc4album)
                file_json.Content = doc4album.AlbumContent
            case "video":
                var doc4video FileForVideo
                err = result.Decode(&doc4video)
                file_json.Content = doc4video.VideoContent
        }
        if err != nil { log.Fatal(err) }
        files = append(files, &file_json)
    }

    c.Header("Content-Type", "application/json")
    c.JSON(http.StatusOK, files)
}

//func GetAllAlbums(c *gin.Context) {
//    client := GetMongoClient()
//    file_coll := client.Database("streamosphere").Collection("files")
//}

//func GetAllVideos(c *gin.Context) {
//    client := GetMongoClient()
//    file_coll := client.Database("streamosphere").Collection("files")
//}

func GetAllFiles(c *gin.Context) {
    client := GetMongoClient()
    file_coll := client.Database("streamosphere").Collection("files")

    cursor, err := file_coll.Find(context.Background(), bson.M{"user_id": c.Param("user_id")})
    if err != nil { c.AbortWithError(400, err) }

    // kind of hacky impl. go go
    var files []*File
    defer cursor.Close(context.Background())
    for cursor.Next(context.Background()) {
        var file_json File
        if err := cursor.Decode(&file_json); err != nil {
            log.Fatal(err)
        }

        // get the file type and conditionally decode
        filter := bson.M{"_id": file_json.ID}
        result := file_coll.FindOne(context.Background(), filter)
        switch file_json.Type {
            case "album":
                var doc4album FileForAlbum
                err = result.Decode(&doc4album)
                if err != nil { log.Fatal(err); }

                file_json.Content = doc4album.AlbumContent
            case "song":
                var doc4song FileForSong
                err = result.Decode(&doc4song)
                if err != nil { log.Fatal(err); }

                file_json.Content = doc4song.SongContent
            case "video":
                var doc4video FileForVideo
                err = result.Decode(&doc4video)
                if err != nil { log.Fatal(err); }

                file_json.Content = doc4video.VideoContent
        }

        files = append(files, &file_json)
    }

    c.Header("Content-Type", "application/json")
    c.JSON(http.StatusOK, files)
}

func GetSingleFile(c *gin.Context) {
    client := GetMongoClient()
    file_coll := client.Database("streamosphere").Collection("files")

    // create a bson id from request url
    bson_id, _ := primitive.ObjectIDFromHex(c.Param("file_id"))
    filter := bson.M{"_id": bson_id}
    result := file_coll.FindOne(context.Background(), filter)

    file_json := &File{}
    file_err := result.Decode(file_json)
    if file_err != nil { log.Fatal(file_err); log.Fatal("[GetSingleFile] could not decode") }

    c.Header("Content-Type", "application/json")
    c.JSON(http.StatusOK, file_json)
}

