﻿import React, { Component } from 'react';
import UploadFile from './UploadFile.jsx';
import { Link } from 'react-router-dom';
import Modal from 'react-awesome-modal';
import Button from 'react-bootstrap/Button';
import '../../layouts/ButtonStyles.css';

export default class UploadModalImpl extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,

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
        this.props.refreshAfterUpload();
        console.log('[UploadModalImpl] closing modal');
        this.setState({
            visible: false
        });
    }
    
    render() {
        return (
            <div>
                <Button className="file-button" onClick={() => this.openModal()}>Upload</Button>
                <Modal visible={this.state.visible} effect="fadeInUp" width="1000" height="300" onClickAway={() => this.closeModal()}>
                    <UploadFile/>
                </Modal>
            </div>
        );
    }
}