import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import { Menu, Item, Separator, Submenu, MenuProvider } from 'react-contexify';
import Modal from 'react-awesome-modal';
import { Button } from 'react-bootstrap';
import EditDescription from './EditDescription';
import Rename from './RenameFile';
import Move from './MoveFile';

export default class CustomMenu extends Component {
    constructor(props) {
        super(props);

    }
    onClick(event) {
        alert(event);
    }

    render() {
        return (
            <div>
                <Menu id='menu_id'>
                    <Item onClick={this.handleModalClick}>Cut</Item>
                    <Item onClick={this.onClick}>Copy</Item>
                    <Item onClick={this.handleModalClick}>Move</Item>
                    <Item onClick={this.handleModalClick}>Edit Description</Item>
                    <Item onClick={this.handleModalClick}>Rename</Item>                    
                </Menu>
            </div>
        );
    }
}