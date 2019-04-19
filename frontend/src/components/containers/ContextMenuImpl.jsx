import React from "react";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import { Button } from 'react-bootstrap';
import File from "./File.jsx";

import '../../layouts/ContextMenuImpl.css';

export default class ContextMenuImpl extends React.Component {

    constructor(props){
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e, data) {
        console.log(data.foo);
    }

    render(){
        return (
            <div>
                <ContextMenuTrigger id={this.props.contextId}>
                    <div>
                        <File imageUrl={this.props.imageUrl}/>
                    </div>
                </ContextMenuTrigger>

                <ContextMenu id={this.props.contextId} className="context-menu-container">
                    <MenuItem data={{foo: 'bar'}} onClick={this.handleClick}>
                        <Button className="context-button">Cut</Button>
                    </MenuItem>
                    <MenuItem data={{foo: 'bar'}} onClick={this.handleClick}>
                        <Button className="context-button">Copy</Button>
                    </MenuItem>
                    <MenuItem divider />
                    <MenuItem data={{foo: 'bar'}} onClick={this.handleClick}>
                        <Button className="context-button">Edit</Button>
                    </MenuItem>
                    <MenuItem data={{foo: 'bar'}} onClick={this.handleClick}>
                        <Button className="context-button">Rename</Button>
                    </MenuItem>
                </ContextMenu>
            </div>
        )
    }

}