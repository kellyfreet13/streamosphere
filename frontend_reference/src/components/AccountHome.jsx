import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import { Menu, Item, Separator, Submenu, MenuProvider } from 'react-contexify';
import 'react-contexify/dist/ReactContexify.min.css';
import sig from '.././images/accImage.jpg';
import Modal from 'react-awesome-modal';
import { accHome } from '.././layouts/AccountHome.css';
import EditDescription from './EditDescription';
import Rename from './RenameFile';
import NavBar from './NavBar';
import { Button, ButtonGroup } from 'react-bootstrap';
import ProgressBarExample from './ProgressBarTemp';
import SearchBarS from './SearchBar';
import Move from './MoveFile';
import CustomMenu from './CustomMenu';
import CustomModal from './CustomModal';
import Upload from './Upload';

export class AccountHome extends Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            isCustomMenuOpen: false,
            isModalOpen: false,
            handleShow: false,
            fromChild: '',
            files: ["File 1", "File 2", "File 3", "File 4", "File 5"],
            clickedFile: 'init'
        };

        this.addCopy = this.addCopy.bind(this);
        this.removeFile = this.removeFile.bind(this);
        this.handleClickIndex = this.handleClickIndex.bind(this);
        this.getFileName = this.getFileName.bind(this);
        this.openRenameModal = this.openRenameModal.bind(this);
        this.openEditModal = this.openEditModal.bind(this);
        this.openMoveModal = this.openMoveModal.bind(this);
        this.newMoveModal = this.newMoveModal.bind(this);
        this.setClickedText = this.setClickedText.bind(this);
    }

    getFileName = (data,event) => {
        let fileList = this.state.files;
        //let clickedFile = event.currentTarget.innerText;
        //console.log(clickedFile);
        console.log(data);
        console.log(this.state.clickedFile);
        for (var i = 0; i < fileList.length; i++) {
            console.log(this.state.clickedFile == fileList[i])
            if (this.state.clickedFile == fileList[i]) {
                fileList[i] = data;
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

    render() {
        let fileList = this.state.files;
        let tempGetText = this.getText;
        var displayFileList = fileList.map(function (file) {
            return <div className="well" id={file} onClick={() => this.setClickedText({ file })}> {file} </div>;
        });
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
                marginLeft: 'auto',
                marginRight: 'auto'
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
            Subscribe: {
                marginLeft: '45px'
            }

        };
        return (                        
            <div>  
                <Link to="/" style={styles.link}><button>Logout</button></Link> <br />
                <Subscribe style={styles.Subscribe}> </Subscribe>
                <h1>Account Home Page</h1>
                <img src={sig} alt="super smash bros character" width="300" height="300" style={styles.img} /> <br />
                    
                <ProgressBarExample> </ProgressBarExample>
                <br />

                <ContextMenuTrigger id="2">
                    {displayFileList}
                </ContextMenuTrigger>

                <ContextMenu id="2">
                    <ButtonGroup vertical>
                        <Button onClick={this.removeFile}>Cut</Button>
                        <Button onClick={this.addCopy}> Copy</Button>
                        <Move />
                        <EditDescription />
                        <Rename getFileName={this.getFileName} />
                    </ButtonGroup>
                </ContextMenu>             
            </div>
        );
    }
    removeFile(index) {
        this.setState({
            files: this.state.files.filter((x, i) => i != index)
        });
    }
    handleClickIndex(index, event) {
        eval(this[event.target.name]).bind(this)(index, event)
    }
    addCopy(e) {
        e.preventDefault();
        let fileName = e.currentTarget.innerText;
        fileName += " - Copy";
        let curList = this.state.files;
        curList.push(fileName);
        this.setState({
            files: curList
        });
    }
    newEditModal = ({ handleShow }) => {
        this.showModal = handleShow;
    }
    openEditModal = () => {
        this.showModal();
    }
    newRenameModal = ({ openRename }) => {
        this.showModal1 = openRename;
    }
    openRenameModal = () => {
        this.showModal1();
    }
    newMoveModal = ({ handleShow }) => {
        this.showModal2 = handleShow;
    }
    openMoveModal = () => {
        this.showModal2();
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
                float:'right'
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