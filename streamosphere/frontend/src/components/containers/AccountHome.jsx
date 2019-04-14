import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import 'react-contexify/dist/ReactContexify.min.css';
import sig from '.././images/accImage.jpg';
import Modal from 'react-awesome-modal';
import ReactPlayer from 'react-player';
import { accHome } from '.././layouts/AccountHome.css';
import { Player } from 'video-react';
import EditDescription from './EditDescription';
import Rename from './RenameFile';
import NavBar from './NavBar';
import { Button, ButtonGroup } from 'react-bootstrap';
import ProgressBarExample from './ProgressBarTemp';
import SearchBarS from './SearchBar';
import Move from './MoveFile';
import File from './File';
import music from '../media/Imagine Dragons - Radioactive (AUDIO).mp3';
import video from '../media/video.mp4';

export class AccountHome extends Component {
    
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
        const styles = {
            body: {
                backgroundColor: 'lightgreen',
            },
            contextMenuTrigger: {
                backgroundColor: 'white',
            },
            link: {
                float: 'right',
            },
            img: {
                float: 'right'
            },
            nav: {
                float: 'left',
                width: '160px',
                padding: '20px',
                fontWeight: 'bold',
            },
            ul: {
                listStyleType: 'none',
                margin: '0px',
                paddingLeft: '0px',
                fontSize: ' 1.2em',
            },

            a: {
                textDecoration: 'none',
                backgroundColor: 'white',
            },
            h1: {
                textAlign: 'left'
            }
           
        };

        // temporary file names, will be read in from json
        let tempFileName1 = "file 1";
        let tempDescr1 = "file 1 description";

        return (                        
            <div>
                <NavBar newFolder={this.addNewFolder} />
                <Link to="/" style={styles.link}><button>Logout</button></Link> <br />
                <img src={sig} alt="super smash bros character" width="50" height="50" style={styles.img} />
                <h1 style={styles.h1}> Account Home Page</h1>                    
                <ProgressBarExample> </ProgressBarExample>
                <br />

                <ContextMenuTrigger id="2">
                    // left off here
                    <File filename="file1"
                        description="description1"
                        onContextMenu={this.handleChildClick}
                        datafileName={tempFileName1}
                        dataattr2={tempDescr1} />

                    {fileList.map(file =>
                        <div className="well" onContextMenu={this.handleChildClick} data-fileName={file.fileName} data-attr2={file.description} >
                            {file.fileName} <br />
                            {file.description}
                        </div>)
                    }
                    Imagine Dragons - Radioactive <audio id="audio" src={music}
                        preload="auto" controls muted loop autoplay>
                    </audio> <br />
                    <video width="320" height="240" controls>
                        <source src={video} type="audio/mp4" />
                    </video>
                    <ReactPlayer url='https://www.youtube.com/watch?v=ysz5S6PUM-U' playing loop controls />
                </ContextMenuTrigger>

                <ContextMenu id="2">
                    <ButtonGroup vertical>
                        <Button onClick={this.removeFile}>Cut</Button>
                        <Button onClick={this.addCopy}> Copy</Button>
                        <EditDescription editDescription={this.editFileDescript} />
                        <Rename getFileName={this.getFileName} />
                    </ButtonGroup>
                </ContextMenu>             
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

export default class Subscribe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        };
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal() {
        this.setState({
            visible: true
        });
    }

    closeModal() {
        alert("Your subscription is now confirmed.")
        this.setState({
            visible: false
        });
    }

    render() {
        const styles = {
            input: {
                float: 'right',
            }
        }
        return (
            <div>
                <input type="button" value="Subscribe" onClick={() => this.openModal()} style={styles.input} />
                <Modal visible={this.state.visible} width="400" height="300" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                    <div>
                        <h1>Confirm subscription</h1>
                        <p>Confirmation data</p>
                        <a href="javascript:void(0);" onClick={() => this.closeModal()}>Confirm</a>
                    </div>
                </Modal>
            </div>
        );
    }
}