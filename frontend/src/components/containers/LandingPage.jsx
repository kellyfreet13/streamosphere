import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './LandingPage.css';

export default class LandingPage extends React.Component {
    render() {
      return (
        <div>
          <Link to="/register"><Button className="signUpButton" variant="light">Sign Up</Button></Link>
          <h1 className="landingBanner">Streamosphere</h1>
          <Form className="signInForm" >
            <h1 className="signInBanner"> 
              Sign In
            </h1>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Button className="signInButton" variant="light" type="submit">
              Submit
            </Button>
        </Form>
      </div>
      );
    }
  }
