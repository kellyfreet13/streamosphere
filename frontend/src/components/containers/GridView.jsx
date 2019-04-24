import React, { Component } from 'react';
import GridRow from './GridRow.jsx';
import * as consts from '../../Constants.js';
import '../../layouts/GridStyles.css';

export default class Grid extends Component {

    constructor(props){
        super(props);

        this.state = {
            filesJson: []
        }

        this.getUrlRowSize = this.getUrlRowSize.bind(this);
    }

    componentDidMount() {
        // eventually user ID will be passed down, get all files for user
        let userId = '5c9acddba0f0b4e94109c632'
        let allFilesUrl = consts.API_URL + '/users/'+userId+'/files';
        let that = this;

        fetch(allFilesUrl)
            .then( res => {
                if (res.status >= 400) { throw new Error("Bad response from server")}
                return res.json();
            })
            .then( data => {
                for (let i = 0; i < data.length; i++){
                    console.log(data[i]);
                }
                console.log('GridView.WillMount: '+data);
                that.setState( { filesJson: data})
            })
    }

    getUrlRowSize(i, len) {
        let cols = len - i;

        // we're on the last row
        if (i > len - 4) {
            return cols;
        } else {
            return 4;
        }
    }

    render() {
        let numCols = 4;
        let numFiles = this.state.filesJson.length;
        let locJson = this.state.filesJson;
        let rowItems = [];

        // TODO: implement constructor so that this if is unnecessary
        if (locJson.length > 0) {
            for (let i = 0; i < numFiles; i += numCols){
                let imageUrlsRow = [];
                let resourceUrlsRow = [];
                let resourceSizesRow = [];
                let rowIndexMax = this.getUrlRowSize(i, numFiles)+i;
                for (let j = i; j < rowIndexMax; j++){
                    imageUrlsRow.push(locJson[j].ImageUrl);
                    resourceUrlsRow.push(locJson[j].ResourceUrl);
                    resourceSizesRow.push(locJson[j].Size);
                }

                let numCols = rowIndexMax-i;

                rowItems.push(
                    <GridRow
                        imageUrlsRow={imageUrlsRow}
                        resourceUrlsRow={resourceUrlsRow}
                        resourceSizesRow={resourceSizesRow}
                        rowIndex={i}
                        numCols={numCols}
                        toggleMediaPlayerView={this.props.toggleMediaPlayerView}
                        setResourceToViewUrl={this.props.setResourceToViewUrl}
                    />)
            }
        }

        return (
            <div>
                {rowItems}
            </div>
        );
    }
}