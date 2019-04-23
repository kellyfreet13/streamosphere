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
        return (
            <div>
                {/* a wrapper for the modal handler */}
                <PreviewFile
                    imageUrl={this.props.imageUrl}
                    resourceUrl={this.props.resourceUrl}
                    toggleMediaPlayerView={this.props.toggleMediaPlayerView}
                    setResourceToViewUrl={this.props.setResourceToViewUrl}
                />
            </div>
        );
    }
}