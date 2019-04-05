import React, { Component } from 'react';
//import Modal from 'react-awesome-modal';
import { Modal, Button } from 'react-bootstrap';


export default class Move extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false

        };
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    openModal() {
        this.setState({
            show: true
        });
    }

    closeModal() {
        this.setState({
            show: false
        });
    }
    handleShow() {
        this.setState({ show: true })
    }
    handleClose() {
        this.setState({ show: false })
    }
    render() {
        return (
            <div>
                <Button onClick={this.openModal}>Move</Button>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header>
                        <Modal.Title>Move File</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <h1> Move File </h1>
                            <form>
                                <label>Directory Name</label>
                                <input type="text" />
                            </form>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.handleClose}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}