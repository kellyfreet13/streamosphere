import React, { Component } from 'react';

// creating a file component
// <File filename="file1" description="description1" onContextMenu={this.handleChildClick}  data-fileName={file.fileName} data-attr2={file.description} >/>

export default class File extends Component {
    constructor(props) {
        super(props);
        this.state = {
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

    render() {
        return (
            <div className="well" data-filename={this.state.dataFileName} data-attr2={this.state.dataAttr2} >
                <p>Filename: {this.state.filename}, Description: {this.state.description}</p>
            </div>
        );
    }
}