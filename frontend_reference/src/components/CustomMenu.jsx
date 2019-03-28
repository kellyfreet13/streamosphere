import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import { Menu, Item, Separator, Submenu, MenuProvider } from 'react-contexify';

import { Button } from 'react-bootstrap';
import EditDescription from './EditDescription';
import Rename from './RenameFile';
import Move from './MoveFile';
import Modal from './CustomModal';

export default class CustomMenu extends Component {
    constructor(props) {
        super(props);

        this.state = { isOpen: false };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }
    toggleModal = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    handleShow() {
        this.setState({
            isOpen: true
        });
    }
    onClick(event, props) {
        console.log(event, props);
    }
    closeModal() {
        this.setState({
            isOpen: false
        });
    }
    render() {
        return (
            <div>
                <Menu id='menu_id'>
                    <Item onClick={this.handleShow}>Cut</Item>
                    <Item onClick={this.handleShow}>Copy</Item>
                    <Item onClick={this.handleShow}>Move</Item>
                    <input type="button" value="Edit Description" onClick={() => this.handleShow()} />
                    <Item onClick={this.handleShow}>Rename</Item>
                </Menu>
                <Modal visible={this.state.isOpen} width="400" height="300" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                    <div>
                        <form>
                            <label>Description</label> <br />
                            <textarea rows="5" cols="45"> </textarea> <br />
                            <a href="javascript:void(0);" onClick={() => this.closeModal()}>Confirm</a>
                        </form>
                    </div>
                </Modal>
            </div>
        );
    }
}