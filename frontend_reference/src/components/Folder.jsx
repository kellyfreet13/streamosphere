import React from 'react';
//import Modal from 'react-awesome-modal';
import { Modal, Button } from 'react-bootstrap';

export default class Folder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,

        };
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.addToList = this.addToList.bind(this);
    }
    addToList(value) {
        let list = this.props.props.files;
        
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
                backgroundColor: 'white'
            }
        }
        return (
            <div>
                <input type="button" value="New" onClick={() => this.openModal()} style={styles.button} />

                <Modal show={this.state.visible} onHide={this.closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Folder</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <form>
                                <label>New Folder Name</label>
                                <input type="text" />
                            </form>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.closeModal}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.closeModal}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}