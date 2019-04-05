import React, { Component } from 'react';

export default class Upload extends Component {
    openDialog() {
        document.getElementById('fileid').click();
    }
    render() {
        const styles = {
            fileInput: {
                opacity: '0',
            },
            button: {
                borderRadius: '10px',
                backgroundColor: 'white'
            }
        }
        return (
            <div>
                <button id='buttonid' style={styles.button} type='button' value='Upload' onClick={this.openDialog}>Upload</button>
                <input id='fileid' type='file' style={styles.fileInput} />
            </div>
        );
    }
}