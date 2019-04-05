import React from 'react';
import Modal from 'react-awesome-modal';

export default class File extends React.Component {
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
                backgroundColor: 'white'
            }
        }
        return (

            <div>
                <input type="button" value="New" style={styles.button} onClick={() => this.openModal()} />
                <Modal visible={this.state.visible} width="400" height="300" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                    <div>
                        <form>
                            <label>Name</label>
                            <input type="text" /> <br />
                            <label>Description</label>
                            <textarea rows="5" cols="45"> </textarea> <br />
                            <label> Type </label>
                            <select>
                                <option value="doc"> Document </option>
                                <option value="pdf"> PDF </option>
                                <option value="pptx"> Powerpoint </option>
                                <option value="excel"> Excel </option>
                            </select> <br />
                        </form>
                        <a href="javascript:void(0);" onClick={() => this.closeModal()}>Confirm</a>
                    </div>
                </Modal>
            </div>
        );
    }
}