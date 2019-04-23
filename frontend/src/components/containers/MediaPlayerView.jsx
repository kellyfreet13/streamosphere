import React from 'react';
import { Button } from 'react-bootstrap';
import VideoPlayer from './VideoPlayer.jsx';

export default class MediaPlayerView extends React.Component {

    render() {
        return (
            <div>
                <Button onClick={this.props.toggleMediaPlayerView}>Take me back to the Library View!</Button>
                <VideoPlayer resourceToViewUrl={this.props.resourceToViewUrl} />
            </div>
        )
    }

}