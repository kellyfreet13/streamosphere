import React, { Component } from 'react';
import PreviewFile from './PreviewFile.jsx';

export default class File extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imageUrl: '',
            filename: this.props.filename,
            description: this.props.description,
            dataFileName: this.props.datafilename,
            dataAttr2: this.props.dataattr2,
            modal: false
        };

        this.onContextMenuClick = this.onContextMenuClick.bind(this);
    }

    onContextMenuClick(e) {
        this.props.onContextMenuClick(e)
    }

    render() {
        // for some reason this makes it work
        let imgUrl = this.props.imageUrl;
        let altUrl = 'url:'+imgUrl
        return (
            <div>
                {/*<p>Filename: {this.state.filename}, Description: {this.state.description}</p>*/}
                {/*<img src={imgUrl} alt={altUrl} />*/}
                <PreviewFile
                    imageUrl={this.props.imageUrl}
                    toggleMediaPlayerView={this.props.toggleMediaPlayerView}
                />
            </div>
        );
    }
}