import React, { Component } from 'react';


export default class Download extends Component {
    render() {
        const styles = {
            button: {
                borderRadius: '10px',
                backgroundColor: 'white',
                marginRight: '170px'
            }
        }
        return (
            <div>
                <button type="submit" style={styles.button} onClick="window.open('file.doc')">Download</button>
            </div>
        );
    }
}