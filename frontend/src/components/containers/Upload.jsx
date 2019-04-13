import React, { Component } from 'react';
import UploadFile from './UploadFile';
import { Link } from 'react-router-dom';
import Modal from 'react-awesome-modal';
export default class Upload extends Component {
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
        this.setState({
            visible: false
        });
    }
    
    render() {
        const styles = {
            button: {
                borderRadius: '10px',
                backgroundColor: 'white',
                marginRight: '190px'
            }
        }
        return (
            <div>
                <button onClick={() => this.openModal()} style={styles.button}>Upload</button>
                <Modal visible={this.state.visible} width="1000" height="400" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                    <UploadFile />
                </Modal>
            </div>
        );
    }
}