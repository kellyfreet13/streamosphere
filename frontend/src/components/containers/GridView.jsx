import React, { Component } from 'react';
import GridRow from './GridRow.jsx';
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
        let allFilesUrl = 'http://streamosphere.net:8080/api/users/'+userId+'/files'
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
        let cols = len - i

        // we're on the last row
        if (i > len - 4) {
            return cols;
        } else {
            return 4;
        }
    }

    render() {

        console.log('[GridView.render]: filesJson '+this.state.filesJson);
        console.log(this.state.filesJson.length);

        let numCols = 4;
        let numFiles = this.state.filesJson.length;
        let numRows = Math.ceil(numFiles / numCols);
        let locJson = this.state.filesJson;
        let rowItems = [];
        console.log('[GridView.render]: num rows '+numRows);

        // TODO: implement constructor so that this if is unecessary
        if (locJson.length > 0) {
            for (let i = 0; i < numFiles; i += numCols){
                console.log('row start index i: '+i);
                let imageUrlsRow = [];
                let resourceUrlsRow = [];
                let rowIndexMax = this.getUrlRowSize(i, numFiles)+i;
                for (let j = i; j < rowIndexMax; j++){
                    console.log('j: '+j);
                    imageUrlsRow.push(locJson[j].ImageUrl)
                    resourceUrlsRow.push(locJson[i].ResourceUrl)
                }
                console.log('[GridView.render]: image url row \n\t'+imageUrlsRow);
                rowItems.push(
                    <GridRow
                        imageUrlsRow={imageUrlsRow}
                        resourceUrlsRow={resourceUrlsRow}
                        rowIndex={i}
                        toggleMediaPlayerView={this.props.toggleMediaPlayerView}
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