import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import sph from '../images/accImage.jpg';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';

export class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            pass: ''
        };
	this.handleChange = this.handleChange.bind(this);
    	this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    handleSubmit(e) {
	  e.preventDefault();
	  const itemsRef = firebase.database().ref('items');
	  const item = {
	    title: this.state.currentItem,
	    user: this.state.username
	  }
	  itemsRef.push(item);
	  this.setState({
	    currentItem: '',
	    username: ''
	  });
    }
    
    
    render() {
        return (
            <div>
                <img src={sph} alt="a sphere" wdith="300" height="300" />
				<Form onSubmit={this.handleSubmit}>
					<Form.Group controlId="exampleForm.ControlInput1">
						<Form.Label>Email address </Form.Label>
						<Form.Control type="email" placeholder="name@example.com" onChange={this.handleChange} value={this.state.email} />
						<Form.Label>Password</Form.Label>
						<Form.Control type="password" placeholder="Password" onChange={this.handleChange} value={this.state.pass}  />
					</Form.Group>
				</Form>
				<Link to="/AccountHome"><Button type="Submit">Submit</Button></Link>
            </div>
        );
    }
}
