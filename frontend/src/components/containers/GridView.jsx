import React, { Component } from 'react';
import GridRow from './GridRow.jsx';
import * as consts from '../../Constants.js';
import '../../layouts/GridStyles.css';

export default class Grid extends Component {

    constructor(props){
        super(props);

        this.state = {
            numCols: 4
        }

        this.getUrlRowSize = this.getUrlRowSize.bind(this);

        // get width of component for conditional column rendering in grid
        this.componentWidth = React.createRef();
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
        let numCols = this.state.numCols;
        let numFiles = this.props.filesJson.length;
        let locJson = this.props.filesJson;
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
                        setResourceViewedThumbnailImage={this.props.setResourceViewedThumbnailImage}
                        setResourceToViewUrl={this.props.setResourceToViewUrl}
                    />)
            }
        }

        return (
            <div ref={this.componentWidth}>
                {rowItems}
            </div>
        );
    }
}