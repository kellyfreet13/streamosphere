import React, { Component } from 'react';
import GridCol from './GridCol.jsx';
import '../../layouts/GridStyles.css';

export default class GridRow extends Component {
    render() {
        let colItems = [];
        for (let i = 0; i < 4; i++){
            console.log('[GridRow.render]: image url '+this.props.imageUrlsRow[i]);
            colItems.push(
                <GridCol
                    imageUrl={this.props.imageUrlsRow[i]}
                    resourceUrl={this.props.resourceUrlsRow[i]}
                    rowIndex={this.props.rowIndex}
                    colIndex={i}
                    toggleMediaPlayerView={this.props.toggleMediaPlayerView}
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