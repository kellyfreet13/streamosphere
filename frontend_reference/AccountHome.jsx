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
import ProgressBarExample from './ProgressBarTemp';
import SearchBarS from './SearchBar';
import Move from './MoveFile';
import CustomMenu from './CustomMenu';

export class AccountHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isCustomMenuOpen: false,
            isModalOpen: false
        };

        this.handleContextMenuClick = this.handleContextMenuClick.bind(this);
        this.handleCustomMenuClick = this.handleCustomMenuClick.bind(this);
        this.handleModalClick = this.handleModalClick.bind(this);
    }

    handleClick(e, data) {
        console.log(data.foo);
    }

    handleContextMenuClick(e) {
        console.log('[context menu click] '+this.state.isCustomMenuOpen);

        this.setState(prevState => ({
            isCustomMenuOpen: !prevState.isCustomMenuOpen
        }));
        console.log('[context menu click] '+this.state.isCustomMenuOpen);
        console.log('[context menu click] ' + e.target);
    }

    handleCustomMenuClick(e) {
        console.log('[custom menu click] '+e.target);
    }

    handleModalClick(e) {
        let _isModalOpen = this.state.isModalOpen;
        this.setState({ isModalOpen: !_isModalOpen });
        console.log(e.target);
    }

    render() {
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
                    <NavBar style={styles.nav}> </NavBar> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />
                <ProgressBarExample> </ProgressBarExample>

                    <MenuProvider id="menu_id" >
                        <p>File 1</p>
                    </MenuProvider>

                    <MenuProvider id="menu_id">
                        <p>File 2</p>
                    </MenuProvider>

                    <MenuProvider id="menu_id">
                        <p>File 3</p>
                    </MenuProvider>

                    <MenuProvider id="menu_id">
                        <p>File 4</p>
                    </MenuProvider>

                    <MenuProvider id="menu_id">
                        <p>File 5</p>
                    </MenuProvider>
                
                <CustomMenu />
                </div>         
        );
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