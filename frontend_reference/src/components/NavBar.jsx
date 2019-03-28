import React, { Component } from 'react';
import Folder from './Folder';
import Upload from './Upload';
import Download from './Download';
import '../layouts/NavBar.css';
export default class NavBar extends Component {
    render() {
        return (
            <nav className="Nav">
                <ul className="UL">
                    <li> <Folder> </Folder> </li>
                    <li className="Button"> <Upload> </Upload></li>
                    <li className="Button"> <Download> </Download></li>
                </ul>
            </nav>
        );
    }

}