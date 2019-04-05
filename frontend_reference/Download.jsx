import React, { Component } from 'react';


export default class Download extends Component {
    render() {
        const styles = {
            button: {
                borderRadius: '10px',
                backgroundColor: 'white'
            }
        }
        return (
            <button type="submit" style={styles.button} onClick="window.open('file.doc')">Download</button>
        );
    }
}