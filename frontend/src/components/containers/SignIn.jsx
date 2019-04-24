import React, { Component } from 'react';
// import { withRouter } from 'react-router-dom';
// import SignUpLink from './LandingPage.jsx'
// import { withFirebase } from '../firebase';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../routes.jsx';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import '../../layouts/LandingPage.css'

/*const SignInPage = () => (
    <div>
        <h1 className="landingBanner" >Streamosphere</h1>
        <SignInFormBase/>
        <SignUpLink />
    </div>
);*/

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
};

class SignInFormBase extends Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE };
    }

    onSubmit = event => {
        const { email, password } = this.state;
        this.props.history.push(ROUTES.HOME);
        this.props.firebase
            .doSignInWithEmailAndPassword(email, password)
            .then(() => {
                // may need to change this with auth
                this.setState({ ...ROUTES.HOME });
                this.props.history.push(ROUTES.LANDING);
            })
            .catch(error => {
                this.setState({ error });
            });

        event.preventDefault();
    };

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        const { email, password, error } = this.state;

        const isInvalid = password === '' || email === '';

        return (
            <Form className="signUpForm"
                  onSubmit={this.onSubmit}>
                <h1 className="signUpBanner">
                    Sign In
                </h1>
                <Form.Group controlId="formSignInEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control name="email"
                                  value={email}
                                  onChange={this.onChange}
                                  type="email"
                                  placeholder="Enter email" />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>
                <Form.Group controlId="formSignInPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control name="password"
                                  value={password}
                                  onChange={this.onChange}
                                  type="password"
                                  placeholder="Password" />
                </Form.Group>
                <Button type="submit"
                        disabled={isInvalid}
                        className="signUpButton"
                        variant="light" >
                    <Link to={ROUTES.HOME}>Sign In</Link>
                </Button>
                {error && <p>{error.message}</p>}
            </Form>
        );
    }
}

//const SignInForm = withRouter(SignInFormBase);

export default SignInFormBase;

//export { SignInForm };