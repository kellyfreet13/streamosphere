import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import sph from '../images/accImage.jpg';
/*import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';*/

export class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            pass: ''
        };        
    }
    handleChange(event) {
        this.setState({
            username: event.target.value,
            pass: event.target.value
        })
    }
    handleSubmit(data) {
        this.username = data.input.username,
        this.pass = data.input.pass
    }
    
    
    render() {
        return (
            <div>
                <img src={sph} alt="a sphere" wdith="300" height="300" />
                <form onSubmit={this.handleSubmit}>
                    <label> New username: <input type="text" name="username" value={this.state.username.value} onChange={event => this.handleChange(event)} /> <br />
                        <label> New password: <input type="password" name="pass" value={this.state.pass.value} onChange={event => this.handleChange(event)} /> <br />
                            <Link to="/AccountHome"><button type="Submit">Submit</button></Link>
                        </label>
                    </label>
                </form>
            </div>
        );
    }
}