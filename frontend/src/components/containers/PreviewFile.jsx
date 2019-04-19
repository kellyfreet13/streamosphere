import {MDBBtn, MDBContainer, MDBModal, MDBModalBody, MDBModalFooter, MDBModalHeader} from "mdbreact";
import React from "react";


export default class PreviewFile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            modal: false
        }
    }


    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    render(){
        return (
            <MDBContainer>
                <div onClick={this.toggle}>
                    <img src={this.props.imageUrl} alt={this.props.imageUrl} />
                </div>


                <MDBModal isOpen={this.state.modal} toggle={this.toggle} backdrop={true}>
                    <MDBModalHeader toggle={this.toggle}>Title</MDBModalHeader>
                    <MDBModalBody>
                        <p>Do you want to view this file?</p>
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color="secondary" onClick={this.toggle}>Close</MDBBtn>
                        <MDBBtn color="primary" onClick={this.props.toggleMediaPlayerView}>View File</MDBBtn>
                    </MDBModalFooter>
                </MDBModal>
            </MDBContainer>
        );
    }
}