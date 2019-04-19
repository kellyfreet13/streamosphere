import React, { Component } from 'react';

// creating a file component
// <File filename="file1" description="description1" onContextMenu={this.handleChildClick}  data-fileName={file.fileName} data-attr2={file.description} >/>

export default class File extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imageUrl: '',
            filename: this.props.filename,
            description: this.props.description,
            dataFileName: this.props.datafilename,
            dataAttr2: this.props.dataattr2
        };

        this.onContextMenuClick = this.onContextMenuClick.bind(this);
    }

    onContextMenuClick(e) {
        this.props.onContextMenuClick(e)
    }

    // componentDidMount()
    // {
    //     let that = this;
    //     let url = 'http://streamosphere.net:8080/api/files/5c9b28dfad150710c0e9afb7';
    //
    //     fetch(url)
    //     .then(function(response) {
    //         if (response.status >= 400) {
    //             throw new Error("Bad response from server");
    //         }
    //         return response.json();
    //     })
    //     .then(function(data) {
    //         that.setState({ imageUrl: data.ImageUrl });
    //     });
    // }

    render() {
        // for some reason this makes it work
        let imgUrl = this.props.imageUrl;
        let altUrl = 'url:'+imgUrl
        return (
            <div data-filename={this.state.dataFileName} data-attr2={this.state.dataAttr2}>
                {/*<p>Filename: {this.state.filename}, Description: {this.state.description}</p>*/}
                <img src={imgUrl} alt={altUrl} />
            </div>
        );
    }
}