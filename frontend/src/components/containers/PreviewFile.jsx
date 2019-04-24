import {MDBBtn, MDBContainer, MDBModal, MDBModalBody, MDBModalFooter, MDBModalHeader} from "mdbreact";
import React from "react";
import DefaultImage from "../../images/play-316.png";
import '../../layouts/ContextMenuImpl.css';

export default class PreviewFile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            modal: false
        };

        this.handleResourceView = this.handleResourceView.bind(this);
        this.getImageComponent = this.getImageComponent.bind(this);
        this.urlToFileName = this.urlToFileName.bind(this);
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    handleResourceView() {
        this.props.setResourceToViewUrl(this.props.resourceUrl);
        this.props.setResourceViewedThumbnailImage(this.props.imageUrl);
        this.props.toggleMediaPlayerView();
    }

    getImageComponent(){
        let imgUrl = this.props.imageUrl;
        if (imgUrl != undefined) {
            if (imgUrl.length == 0) {
                return (<img src={DefaultImage} alt="we royally fucked up" />);
            }
        }
        return (<img src={this.props.imageUrl} alt={this.props.resourceUrl} />);
    }

    urlToFileName(url){
        let _split = url.split('/');
        return _split[_split.length-1].split('+').join(' ');
    }

    render(){
        let fileName = this.urlToFileName(this.props.resourceUrl);
        return (
            <MDBContainer>
                <div onClick={this.toggle}>
                    {this.getImageComponent()}
                </div>

                <MDBModal isOpen={this.state.modal} toggle={this.toggle} backdrop={true}>
                    <MDBModalHeader toggle={this.toggle}>View Confirmation</MDBModalHeader>
                    <MDBModalBody>
                        <p>Are you sure you want to view <span className="bold">{fileName}</span>?</p>
                        <p>File size: {this.props.resourceSize}</p>
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color="secondary" onClick={this.toggle}>Close</MDBBtn>
                        <MDBBtn color="primary" onClick={this.handleResourceView}>View File</MDBBtn>
                    </MDBModalFooter>
                </MDBModal>
            </MDBContainer>
        );
    }
}