import React from 'react';
//import Modal from 'react-awesome-modal';
import { Modal, Button } from 'react-bootstrap';

export default class Folder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            folderInput: ''

        };
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.addToList = this.addToList.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.addFolder = this.addFolder.bind(this);
    }
    addFolder = () => {
        this.props.addFolderToFileList(this.state.folderInput);
        this.setState({
            visible: false
        })
    }
    handleChange(event) {
        this.setState({
            folderInput: event.target.value
        });
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
                backgroundColor: 'white',
                marginRight: '210px'
            }
        }
        return (
            <div>
                <button onClick={() => this.openModal()} style={styles.button}>New</button>

                <Modal show={this.state.visible} onHide={this.closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Folder</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <form>
                                <label>New Folder Name</label>
                                <input type="text" id="folder"
                                    value={this.state.folderInput}
                                    onChange={this.handleChange} />
                            </form>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.closeModal}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.addFolder}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}