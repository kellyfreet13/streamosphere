import React from 'react';
import Modal from 'react-awesome-modal';
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import { Button } from 'react-bootstrap';

export default class EditDescription extends React.Component {
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
            a: {
                textDecoration: 'none',
                backgroundColor: 'white',
            }
        }
        return (            
            <div>
                <form>
                    <label>Description</label> <br />
                    <textarea rows="5" cols="45"> </textarea> <br />
                    <a href="javascript:void(0);" onClick={() => this.closeModal()}>Confirm</a>
                </form>
            </div>
        );
    }
}