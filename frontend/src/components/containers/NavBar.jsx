import React, { Component } from 'react';
import Folder from './Folder.jsx';
import Upload from './Upload.jsx';
import Download from './Download.jsx';
import '../../layouts/NavBar.css';
export default class NavBar extends Component {
    constructor(props) {
        super(props);
        this.addToList = this.addToList.bind(this);
    }
    addToList = (folder) => {
        this.props.newFolder(folder);
    }
    render() {
        return (
            <nav className="Nav">
                <ul className="UL">
                    <li className="Button"> <Folder addFolderToFileList={this.addToList}> </Folder> </li>
                    <li className="Button"> <Upload> </Upload></li>
                    <li className="Button"> <Download> </Download></li>
                </ul>
            </nav>
        );
    }

}