// file_handler.go

package api

import (
    // built ins
    "context"
    "net/http"
    "log"
    "io"
    "bytes"
    "strings"
    "strconv"

    // mongo db
    "go.mongodb.org/mongo-driver/bson"
    "go.mongodb.org/mongo-driver/bson/primitive"

    // gin for routing
    "github.com/gin-gonic/gin"

    // aws interfacing
    "github.com/aws/aws-sdk-go/aws"
    "github.com/aws/aws-sdk-go/aws/awsutil"
    "github.com/aws/aws-sdk-go/service/s3"
    "github.com/aws/aws-sdk-go/aws/session"
)

// since Content can have dynamic json, we'll use a map
type File struct {
    ID              primitive.ObjectID `bson:"_id,omitempty" json:"id"`
    UserID          string             `bson:"UserID,omitempty"`
    ImageUrl        string             `bson:"ImageUrl,omitempty"`
    ResourceUrl     string             `bson:"ResourceUrl,omitempty"`
    Type            string             `bson:"Type,omitempty"`
    Size            string             `bson:"Size,omitempty"`
    Content         interface{}        `bson:"Content,omitempty"`
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

// possible to-do: implement Content as a generic struct that
// can contain an AlbumContent, SongContent, or VideoContent struct
type AlbumContent struct {
    // generic and unique album
    Title       string          `bson:"Title,omitempty"`
    Artist      string          `bson:"Artist,omitempty"`
    Genre       []string        `bson:"Genre,omitempty"`
    Label       string          `bson:"Label,omitemtpy"`
    ReleaseDate string          `bson:"ReleaseDate,omitempty"`
    Length      string          `bson:"Length,omitempty"`
    TrackCount  int             `bson:"TrackCount,omitempty"`
    Tracklist   []SongContent   `bson:"Tracklist,omitempty"`
}

// different from a song in that it's a track on an album
//type Track struct {
//    Number      int     `bson:"Number,omitempty"`
//    Title       string  `bson:"Title,omitempty"`
//    Length      string  `bson:"Length,omitempty"`
//    ImageUrl    string  `bson:"ImageUrl,omitempty"`
//}

type SongContent struct {
    Number      int         `bson:"Number,omitempty"        json:"Number,omitempty"`
    Title       string      `bson:"Title,omitempty"         json:"Title,omitempty"`
    Album       string      `bson:"Album,omitempty"         json:"Album,omitempty"`
    Artist      string      `bson:"Artist,omitempty"        json:"Artist,omitempty"`
    Genre       []string    `bson:"Genre,omitempty"         json:"Genre,omitempty"`
    ReleaseDate string      `bson:"ReleaseDate,omitempty"   json:"ReleaseDate,omitempty"`
    PerformedBy string      `bson:"PerformedBy,omitempty"   json:"PerformedBy,omitempty"`
    Label       string      `bson:"Label,omitempty"         json:"Label,omitempty"`
    Length      string      `bson:"Length"                  json:"Length,omitempty"`
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
    file_id := c.Param("FileID")
    bson_id, _ := primitive.ObjectIDFromHex(file_id)
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

    // get the file type requested from the url
    file_type := c.Param("FileType")
    file_type = file_type[0:len(file_type)-1]
    filter := bson.M{"UserID": c.Param("UserId"), "Type": file_type}
    cur, err := file_coll.Find(context.Background(), filter)
    if err != nil { c.AbortWithError(404, err) }

    var files[]*File
    defer cur.Close(context.Background())
    for cur.Next(context.Background()) {
        var file_json File
        if err := cur.Decode(&file_json); err != nil { c.AbortWithError(500, err) }

        // hit the db
        result := file_coll.FindOne(context.Background(), bson.M{"_id": file_json.ID})

        switch file_type {
            case "song":
                var doc4song FileForSong
                err = result.Decode(&doc4song)
                if err != nil { c.AbortWithError(500, err) }
                file_json.Content = doc4song.SongContent
            case "album":
                var doc4album FileForAlbum
                err = result.Decode(&doc4album)
                if err != nil { c.AbortWithError(500, err) }
                file_json.Content = doc4album.AlbumContent
            case "video":
                var doc4video FileForVideo
                err = result.Decode(&doc4video);
                if err != nil { c.AbortWithError(500, err) }
                file_json.Content = doc4video.VideoContent
        }
        files = append(files, &file_json)
    }

    c.Header("Content-Type", "application/json")
    c.JSON(http.StatusOK, files)
}

func GetAllFiles(c *gin.Context) {
    client := GetMongoClient()
    file_coll := client.Database("streamosphere").Collection("files")

    cursor, err := file_coll.Find(context.Background(), bson.M{"UserID": c.Param("UserID")})
    if err != nil { c.AbortWithError(404, err) }

    // kind of hacky impl. go go
    var files []*File
    defer cursor.Close(context.Background())
    for cursor.Next(context.Background()) {
        var file_json File
        if err := cursor.Decode(&file_json)
         err != nil { c.AbortWithError(500, err) }

        // get the file type and conditionally decode
        filter := bson.M{"_id": file_json.ID}
        result := file_coll.FindOne(context.Background(), filter)
        switch file_json.Type {
            case "album":
                var doc4album FileForAlbum
                err = result.Decode(&doc4album)
                if err != nil { c.AbortWithError(500, err) }

                file_json.Content = doc4album.AlbumContent
            case "song":
                var doc4song FileForSong
                err = result.Decode(&doc4song)
                if err != nil { c.AbortWithError(500, err) }

                file_json.Content = doc4song.SongContent
            case "video":
                var doc4video FileForVideo
                err = result.Decode(&doc4video)
                if err != nil { c.AbortWithError(500, err) }

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
    bson_id, _ := primitive.ObjectIDFromHex(c.Param("FileID"))
    filter := bson.M{"_id": bson_id}
    result := file_coll.FindOne(context.Background(), filter)

    file_json := &File{}
    file_err := result.Decode(file_json)
    if file_err != nil { c.AbortWithError(500, file_err) }

    c.Header("Content-Type", "application/json")
    c.JSON(http.StatusOK, file_json)
}

func UploadFile(c *gin.Context) {
    // add the file info to the db
    client := GetMongoClient()
    file_coll := client.Database("streamosphere").Collection("files")

    // securely create a session, you can't see the secrets. github ready baby
    // loads from aws credentials and config file
    sess := session.Must(session.NewSessionWithOptions(session.Options{
        SharedConfigState: session.SharedConfigEnable,
    }))
    s3_cli := s3.New(sess)

    // get the form data from the POST request
    file, header, _ := c.Request.FormFile("file")
    defer file.Close()

    file_name := header.Filename
    size := header.Size

    // create a buffer to copy the file into
    buf := bytes.NewBuffer(nil)
    if _, err := io.Copy(buf, file); err != nil { log.Println(err) }

    // NewReader(b []byte) *Reader
    fileBytes := bytes.NewReader(buf.Bytes())
    fileType := http.DetectContentType(buf.Bytes())

    // put into the users folder by id
    user_id_folder := c.Param("UserID")
    path := "/" + user_id_folder + "/" + file_name

    // create params to put into s3. give public read access
    params := &s3.PutObjectInput{
        Bucket: aws.String("ec2-54-215-161-219.media"),
        Key: aws.String(path),
        Body: fileBytes,
        ContentLength: aws.Int64(size),
        ContentType: aws.String(fileType),
        ACL: aws.String("public-read"),
    }

    // put the file into s3!
    resp, err := s3_cli.PutObject(params)
    if err != nil { log.Fatal(err) }

    // finally, update the db to contain this file
    // get the user id and get the file type

    // just creating the freakin url
    user_id := c.Param("UserID")
    dirty := "https:/"
    s3_bucket_url := dirty + "/s3-us-west-1.amazonaws.com/ec2-54-215-161-219.media/"
    s3_file_conv := strings.Replace(file_name, " ", "+", -1)
    resource_url := s3_bucket_url + user_id + "/" + s3_file_conv

    fn_split := strings.Split(file_name, ".")  // eventually map this to video, music
    file_type := fn_split[len(fn_split)-1]
    file_size := strconv.FormatInt(size, 10)
    file_struct := File{
        UserID: user_id,
        ResourceUrl: resource_url,
        Type: file_type,
        Size: file_size,
    }

    // insert into mongo
    _, err = file_coll.InsertOne(context.TODO(), file_struct)
    if err != nil { log.Println(err) }

    // print reponse e-tag (just to see non-failure)
    log.Printf("response %s", awsutil.StringValue(resp))
}
