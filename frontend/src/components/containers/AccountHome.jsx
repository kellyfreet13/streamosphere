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


export default class AccountHome extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isCustomMenuOpen: false,
            isModalOpen: false,
            handleShow: false,
            showMediaPlayer: false,
            fromChild: '',
            files: [
                { fileName: "File 1", description: "an mp3 file"},
                { fileName: "File 2", description: "an audio file"},
                { fileName: "File 3", description: "an mp4 file"},
                { fileName: "File 4", description: "a powerpoint"},
                { fileName: "File 5", description: "a PDF file" },
            ],
            clickedFile: {
                fileName: '',
                description: ''
            },
            resourceToViewUrl: '',
            refreshAfterUpload: false
        };

        this.addCopy = this.addCopy.bind(this);
        this.removeFile = this.removeFile.bind(this);
        this.handleClickIndex = this.handleClickIndex.bind(this);
        this.getFileName = this.getFileName.bind(this);

        this.setClickedText = this.setClickedText.bind(this);
        this.boundItemClick = this.boundItemClick.bind(this);
        this.handleChildClick = this.handleChildClick.bind(this);
        this.editFileDescript = this.editFileDescript.bind(this);

        // toggle whether to display files or library view
        this.toggleMediaPlayerView = this.toggleMediaPlayerView.bind(this);
        this.setResourceToViewUrl = this.setResourceToViewUrl.bind(this);

        // simply to refresh state
        this.refreshAfterUpload = this.refreshAfterUpload.bind(this);
    }
    editFileDescript = (description) => {
        let curList = this.state.files;
        for (var i = 0; i < curList.length; i++) {
            if (this.state.clickedFile.fileName == curList[i].fileName) {
                curList[i].description = description;
            }
        }
        this.setState({
            files: curList
        });
    }
    handleChildClick = (event) => {
        event.preventDefault();
        let fileSelected = this.state.clickedFile;
        fileSelected.fileName = event.target.attributes.getNamedItem("data-fileName").value;
        fileSelected.description = event.target.attributes.getNamedItem("data-attr2").value;
        this.setState({
            clickedFile: fileSelected
        });
    }
    addNewFolder = (folder) => {
        let curList = this.state.files;
        let newFile = { fileName: '', description: '' }
        newFile.fileName = folder;
        curList.unshift(newFile);
        this.setState({
            files: curList
        });
    }
    addCopy(e) {
        let curList = this.state.files;
        const newObj = {
            fileName: '',
            description: ''
        };
        for (var i = 0; i < curList.length; i++) {
            if (this.state.clickedFile.fileName == curList[i].fileName) {
                var curName = curList[i].fileName;
                curName += " - Copy";
                newObj.fileName = curName
                newObj.description = curList[i].description;
            }
        }
        curList.unshift(newObj);
        this.setState({
            files: curList
        });
    }
    getFileName = (data,event) => {
        let fileList = this.state.files;
        //let clickedFile = event.currentTarget.innerText;
        //console.log(clickedFile);
        //console.log(data);
        console.log(this.state.clickedFile);
        for (var i = 0; i < fileList.length; i++) {
            console.log(fileList[i]);
            if (this.state.clickedFile.fileName == fileList[i].fileName) {
                fileList[i].fileName = data;
            }
        }
        this.setState({
            files: fileList
        });
    }

    setClickedText = (fileName) => {
        console.log("get text function called");
        this.setState({ clickedFile: fileName });
    }
    boundItemClick = (ev) => {
        this.setState({
            clickedFile: ev.currentTarget.dataset.value
        });
    }

    toggleMediaPlayerView() {
        console.log('[AccountHome.toggleMediaPlayerView] callback bubbled all the way up!');
        let cur = this.state.showMediaPlayer;
        this.setState({ showMediaPlayer: !cur });
    }

    setResourceToViewUrl(url) {
        console.log("[AccountHome.setResourceToView] resource url: "+ url);
        this.setState({ resourceToViewUrl: url })
    }

    // this is not working as expected. not refreshing
    refreshAfterUpload() {
        console.log("[AccountHome.refreshAfterUpload] called: ");
        let cur = this.state.refreshAfterUpload;
        this.setState({refreshAfterUpload: !cur});
    }

    render() {
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
                                setResourceToViewUrl={this.setResourceToViewUrl}
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
    removeFile() {
        let curList = this.state.files;
        for (var i = 0; i < curList.length; i++) {
            if (this.state.clickedFile.fileName == curList[i].fileName) {
                curList.splice(i, 1);
            }
        }
        this.setState({
            files: curList
        });
    }
    handleClickIndex(index, event) {
        eval(this[event.target.name]).bind(this)(index, event)
    }
}