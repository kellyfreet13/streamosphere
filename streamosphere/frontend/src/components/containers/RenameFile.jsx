import React from 'react';
//import Modal from 'react-awesome-modal';
import { Modal, Button } from 'react-bootstrap';

export default class Rename extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            show: false,
            inputField: '',
            name: ''
        };
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.openRename = this.openRename.bind(this);
        this.closeRename = this.closeRename.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        this.renameFile = this.renameFile.bind(this);
    }
    renameFile = (event) => {
        console.log(event.target);
        this.props.getFileName(this.state.inputField);
        this.setState({
            show: false
        });
    }
    submitHandler(event) {
        event.preventDefault();
        // pass the input field value to the event handler passed
        // as a prop by the parent (App)
        this.props.newName(this.state.inputField);

        this.setState({
            inputField: event.target.value
        });
    }
    handleChange(event) {
        this.setState({
            inputField: event.target.value
        });
    }
    openRename() {
        this.setState({ show: true })
    }
    closeRename() {
        this.setState({ show: false })
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
        return (
            <div>
                <Button onClick={this.openRename}>Rename</Button>
                <Modal show={this.state.show} onHide={this.closeRename}>
                    <Modal.Header>
                        <Modal.Title>Rename File</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <form onSubmit={this.submitHandler}>
                                <label>New File Name</label>
                                <input type="text" id="theInput"
                                    value={this.state.inputField}
                                    onChange={this.handleChange} />
                            </form>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.closeRename}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.renameFile}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
                
            </div>
        );
    }
}