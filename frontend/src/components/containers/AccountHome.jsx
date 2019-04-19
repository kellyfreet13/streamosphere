// libraries
import React, { Component } from 'react';
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import ReactPlayer from 'react-player';
import { Button, ButtonGroup } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// custom components
import Rename from './RenameFile.jsx';
import NavBar from './NavBar.jsx';
import GridView from './GridView.jsx';
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
            }
        };

        this.addCopy = this.addCopy.bind(this);
        this.removeFile = this.removeFile.bind(this);
        this.handleClickIndex = this.handleClickIndex.bind(this);
        this.getFileName = this.getFileName.bind(this);

        this.setClickedText = this.setClickedText.bind(this);
        this.boundItemClick = this.boundItemClick.bind(this);
        this.handleChildClick = this.handleChildClick.bind(this);
        this.editFileDescript = this.editFileDescript.bind(this);
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
    render() {
        let fileList = this.state.files;

        // temporary file names, will be read in from json
        let tempFileName1 = "file 1";
        let tempDescr1 = "file 1 description";

        console.log('AccountHome rendered');
        // let music =  '../media/test_audio.mp3';
        // let video = '../media/test_video.mp4';

        return (
            <div>
                <div id="streamosphere-banner">Streamosphere</div>
                <div id="page-container">
                    <div id="left-content">
                        <NavBar newFolder={this.addNewFolder} />
                    </div>
                    <div id="right-content">
                        {/*<Link to="/" style={styles.link}><Button>Logout</Button></Link> <br />*/}

                        <GridView />

                        {/* ----------------------------------------------*/}
                        {/* keeping this code to reference TODO: remove and integrate */}
                        {/*<ContextMenuTrigger id="2">*/}
                        {/*    <File filename="file1"*/}
                        {/*          description="description1"*/}
                        {/*          onContextMenu={this.handleChildClick}*/}
                        {/*          datafileName={tempFileName1}*/}
                        {/*          dataattr2={tempDescr1} />*/}

                        {/*    {fileList.map(file =>*/}
                        {/*        <div className="well" onContextMenu={this.handleChildClick} data-fileName={file.fileName} data-attr2={file.description} >*/}
                        {/*            {file.fileName} <br />*/}
                        {/*            {file.description}*/}
                        {/*        </div>)*/}
                        {/*    }*/}
                        {/*    Imagine Dragons - Radioactive <audio id="audio" src={music}*/}
                        {/*                                         preload="auto" controls muted loop autoPlay>*/}
                        {/*</audio> <br />*/}
                        {/*    <video width="320" height="240" controls>*/}
                        {/*        <source src={video} type="audio/mp4" />*/}
                        {/*    </video>*/}
                        {/*    <ReactPlayer url='https://www.youtube.com/watch?v=ysz5S6PUM-U' playing loop controls />*/}
                        {/*</ContextMenuTrigger>*/}

                        {/*<ContextMenu id="2">*/}
                        {/*    <ButtonGroup vertical>*/}
                        {/*        <Button onClick={this.removeFile}>Cut</Button>*/}
                        {/*        <Button onClick={this.addCopy}> Copy</Button>*/}
                        {/*        <EditDescription editDescription={this.editFileDescript} />*/}
                        {/*        <Rename getFileName={this.getFileName} />*/}
                        {/*    </ButtonGroup>*/}
                        {/*</ContextMenu>*/}
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