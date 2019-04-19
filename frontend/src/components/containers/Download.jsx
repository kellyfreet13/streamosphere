import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import '../../layouts/ButtonStyles.css';

export default class Download extends Component {
    render() {
        return (
            <div>
                <Button className="file-button" type="submit" onClick="window.open('file.doc')">Download</Button>
            </div>
        );
    }
}