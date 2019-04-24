import React from "react";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import S3 from 'aws-sdk/clients/s3';
import { Button } from 'react-bootstrap';

import File from "./File.jsx";
import * as consts from '../../Constants.js';
import * as secret from '../../totally_not_secret.js';

import '../../layouts/ContextMenuImpl.css';

export default class ContextMenuImpl extends React.Component {

    constructor(props){
        super(props);

        this.handleClick = this.handleClick.bind(this);
        this.handleDownload = this.handleDownload.bind(this);
        this.saveData = this.saveData.bind(this);
        this.convertResource = this.convertResource.bind(this);
    }

    handleClick(e, data) {
        console.log(data.foo);
    }

    saveData(data, fileName){
        let a = document.createElement("a");
        document.body.appendChild(a);
        a.style = "display: none";

        let blob = new Blob([data], {type: data.ContentType});
        let url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(url);

    }

    convertResource(url, userId){
        let _split = url.split('/');
        let fileName = _split[_split.length-1].split('+').join(' ');
        let resourceKey =  userId + '/' + fileName;

        return {fileName: fileName, resourceKey: resourceKey};
    }

    handleDownload() {
        let s3 = new S3({
            accessKeyId: secret.S3_ACCESS_KEY_ID,
            secretAccessKey: secret.S3_SECRET_KEY,
            region: consts.S3_REGION
        });

        // eventually should be props
        let userId = consts.TEST_USER_ID;
        let resources = this.convertResource(this.props.resourceUrl, userId);
        let fileName = resources.fileName;
        let resourceKey = resources.resourceKey;
        let params = {
            Bucket: consts.BUCKET_NAME,
            Key: resourceKey
        };

        // get request to the s3 instance
        s3.getObject(params, (err, data) => {
          if (err){
              console.log('resource key name error: '+resourceKey);
              console.log(err);
          }
          else {
              this.saveData(data.Body, fileName);
          }
        });
    }

    render(){
        return (
            <div>
                <ContextMenuTrigger id={this.props.contextId}>
                    <div>
                        <File
                            imageUrl={this.props.imageUrl}
                            resourceUrl={this.props.resourceUrl}
                            resourceSize={this.props.resourceSize}
                            toggleMediaPlayerView={this.props.toggleMediaPlayerView}
                            setResourceToViewUrl={this.props.setResourceToViewUrl}
                        />
                    </div>
                </ContextMenuTrigger>

                <ContextMenu id={this.props.contextId} className="context-menu-container">
                    <MenuItem data={{foo: 'bar'}} onClick={this.handleClick}>
                        <Button className="context-button">Cut</Button>
                    </MenuItem>
                    <MenuItem data={{foo: 'bar'}} onClick={this.handleClick}>
                        <Button className="context-button">Copy</Button>
                    </MenuItem>
                    <MenuItem divider />
                    <MenuItem data={{foo: 'bar'}} onClick={this.handleClick}>
                        <Button className="context-button">Edit</Button>
                    </MenuItem>
                    <MenuItem data={{foo: 'bar'}} onClick={this.handleClick}>
                        <Button className="context-button">Rename</Button>
                    </MenuItem>
                    <MenuItem data={{foo: 'bar'}} onClick={this.handleDownload}>
                        <Button className="context-button">Download</Button>
                    </MenuItem>
                </ContextMenu>
            </div>
        )
    }

}