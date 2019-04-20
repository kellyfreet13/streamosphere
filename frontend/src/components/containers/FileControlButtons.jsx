import React, { Component } from 'react';
import Folder from './Folder.jsx';
import UploadModalImpl from './UploadModalImpl.jsx';
import Download from './Download.jsx';
import '../../layouts/FileControlButtons.css';

export default class FileControlButtons extends Component {
    constructor(props) {
        super(props);
        this.addToList = this.addToList.bind(this);
    }
    addToList = (folder) => {
        this.props.newFolder(folder);
    }
    render() {
        return (
            <div id="navigation-container">
                <nav>
                    <ul>
                        <li> <Folder addFolderToFileList={this.addToList}> </Folder> </li>
                        <li> <UploadModalImpl> </UploadModalImpl></li>
                        <li> <Download> </Download></li>
                    </ul>
                </nav>
            </div>
        );
    }

}