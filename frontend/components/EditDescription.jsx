﻿import React from 'react';
import Modal from 'react-awesome-modal';

export default class Edit extends React.Component {
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
                    <input type="button" value="Edit" onClick={() => this.openModal()} />
                    <Modal visible={this.state.visible} width="400" height="300" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                        <div>
                            <form>
                                <label>Description</label> <br />
                                <textarea rows="5" cols="45"> </textarea>
                            </form>
                            <a href="javascript:void(0);" onClick={() => this.closeModal()}>Confirm</a>
                        </div>
                    </Modal>
                </div>
            
        );
    }
}