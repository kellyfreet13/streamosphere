import React from 'react';
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
//import Modal from 'react-awesome-modal';
import { Modal, Button } from 'react-bootstrap';
import { Menu, Item, Separator, Submenu, MenuProvider } from 'react-contexify';

export default class EditDescription extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            show: false,
            description: ''
        };
        this.showModal = this.showModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.getNewDescription = this.getNewDescription.bind(this);
    }
    getNewDescription(event) {
        this.setState({
            description: event.target.value
        });
    }
    showModal() {
        this.setState({
            visible: true
        });
    }

    closeModal() {
        this.setState({
            visible: false
        });
    }
    handleShow() {
        console.log(this.state)
        this.setState({ show: true })
    }
    handleClose() {
        this.setState({ show: false })
    }
    updateDesc = () => {
        this.props.editDescription(this.state.description);
        this.setState({ show: false })
    }
    render() {
        const styles = {
            a: {
                textDecoration: 'none',
                backgroundColor: 'white',
            }
        }
        return (            
            <div>
                <Button onClick={this.handleShow}>Edit Description</Button>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Update File Description</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <form>
                                <label>New Description</label> <br />
                                <textarea rows="5" cols="45" value={this.state.description}
                                    onChange={this.getNewDescription}> </textarea> <br />
                            </form>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>           
                        <Button variant="primary" onClick={this.updateDesc}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal> 
            </div>
        );
    }
}