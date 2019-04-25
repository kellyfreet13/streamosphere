// libraries
import React, { Component } from 'react';
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import ReactPlayer from 'react-player';
import { Button, ButtonGroup } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// custom components
import Rename from './RenameFile.jsx';
import FileControlButtons from './FileControlButtons.jsx';
import GridView from './GridView.jsx';
import MediaPlayerView from './MediaPlayerView.jsx';
import File from './File.jsx';
import EditDescription from './EditDescription.jsx';

// styling
import '../../layouts/AccountHome.css';
import * as consts from "../../Constants";


export default class AccountHome extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            isCustomMenuOpen: false,
            isModalOpen: false,
            handleShow: false,
            showMediaPlayer: false,
            resourceViewedThumbnailImage: '',
            resourceToViewUrl: '',
            userId: localStorage.getItem('userid'),
            filesJson: []
        };

        // toggle whether to display files or library view
        this.toggleMediaPlayerView = this.toggleMediaPlayerView.bind(this);
        this.setResourceViewedThumbnailImage = this.setResourceViewedThumbnailImage.bind(this);
        this.setResourceToViewUrl = this.setResourceToViewUrl.bind(this);

        // simply to refresh state
        this.refreshAfterUpload = this.refreshAfterUpload.bind(this);
    }

    toggleMediaPlayerView() {
        console.log('[AccountHome.toggleMediaPlayerView] callback bubbled all the way up!');
        let cur = this.state.showMediaPlayer;
        this.setState({ showMediaPlayer: !cur });
    }

    setResourceViewedThumbnailImage(url){
        console.log("[AccountHome.setResourceThumbnailImage] resource url: "+ url);
        this.setState({resourceViewedThumbnailImage: url});
    }

    setResourceToViewUrl(url) {
        console.log("[AccountHome.setResourceToView] resource url: "+ url);
        this.setState({ resourceToViewUrl: url })
    }

    // this is not working as expected. not refreshing
    refreshAfterUpload() {
        console.log("[AccountHome.refreshAfterUpload] called: ");

        let userId = localStorage.getItem("userid");
        let allFilesUrl = consts.API_URL + '/users/'+userId+'/files';
        let that = this;

        fetch(allFilesUrl)
            .then( res => {
                if (res.status >= 400) { throw new Error("Bad response from server")}
                return res.json();
            })
            .then( data => {
                for (let i = 0; i < data.length; i++){
                    console.log(data[i]);
                }
                console.log('GridView.WillMount: '+data);
                that.setState( { filesJson: data})
            });
    }

    componentDidMount() {
        let userId = localStorage.getItem("userid");
        let allFilesUrl = consts.API_URL + '/users/'+userId+'/files';
        let that = this;

        fetch(allFilesUrl)
            .then( res => {
                if (res.status >= 400) { throw new Error("Bad response from server")}
                return res.json();
            })
            .then( data => {
                for (let i = 0; i < data.length; i++){
                    console.log(data[i]);
                }
                console.log('GridView.WillMount: '+data);
                that.setState( { filesJson: data})
            })
    }

    render() {
        // let userId = '5c9acddba0f0b4e94109c632';
        // let userId = localStorage.getItem('userid');
        console.log('state user id logged in: '+this.state.userId);
        return (
            <div>
                <div id="streamosphere-banner">Streamosphere</div>
                <div id="page-container">
                    <div id="left-content">
                        <FileControlButtons
                            newFolder={this.addNewFolder}
                            refreshAfterUpload={this.refreshAfterUpload}
                        />
                    </div>
                    <div id="right-content">
                        {/*<Link to="/" style={styles.link}><Button>Logout</Button></Link> <br />*/}

                        {/* conditionally render account home or media viewer.*/}
                        {/* this callback is going to get passed waaayy down. */}
                        {!this.state.showMediaPlayer &&
                            <GridView
                                toggleMediaPlayerView={this.toggleMediaPlayerView}
                                setResourceViewedThumbnailImage={this.setResourceViewedThumbnailImage}
                                setResourceToViewUrl={this.setResourceToViewUrl}
                                filesJson={this.state.filesJson}
                            />}
                        {this.state.showMediaPlayer &&
                            <MediaPlayerView
                                toggleMediaPlayerView={this.toggleMediaPlayerView}
                                resourceToViewUrl={this.state.resourceToViewUrl}
                            />}
                    </div>
                </div>
            </div>
        );
    }

}