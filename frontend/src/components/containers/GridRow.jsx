import React, { Component } from 'react';
import GridCol from './GridCol.jsx';
import '../../layouts/GridStyles.css';

export default class GridRow extends Component {
    render() {
        let colItems = [];
        for (let i = 0; i < this.props.numCols; i++){
            console.log('[GridRow.render]: image url '+this.props.imageUrlsRow[i]);
            console.log('[GridRow.render]: resource url '+this.props.resourceUrlsRow[i]);
            colItems.push(
                <GridCol
                    imageUrl={this.props.imageUrlsRow[i]}
                    resourceUrl={this.props.resourceUrlsRow[i]}
                    resourceSize={this.props.resourceSizesRow[i]}
                    rowIndex={this.props.rowIndex}
                    colIndex={i}
                    toggleMediaPlayerView={this.props.toggleMediaPlayerView}
                    setResourceToViewUrl={this.props.setResourceToViewUrl}
                />
                );
        }

        return (
            <div className="grid-row">
                {colItems}
            </div>
        );
    }
}