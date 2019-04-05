import React, { Component } from 'react';
import Modal from 'react-awesome-modal';

export default class Move extends Component {
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
        return (
            <div>
                <input type="button" value="Move" onClick={() => this.openModal()} />
                <Modal visible={this.state.visible} width="400" height="300" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                    <div>
                        <form>
                            <input type="text" />
                        </form>
                        <a href="javascript:void(0);" onClick={() => this.closeModal()}>Confirm</a>
                    </div>
                </Modal>
            </div >
        );
    }
}