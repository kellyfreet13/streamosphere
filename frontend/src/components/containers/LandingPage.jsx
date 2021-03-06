import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../routes.jsx';
import { withFirebase } from '../firebase';
// import SignIn from './SignIn.jsx';
import '../../layouts/LandingPage.css'
import * as consts from '../../Constants.js';

/*const LandingPage = () => (
    <div>
    <Button className="signInButton" variant="light"><Link to={ROUTES.SIGN_IN}>Sign In</Link></Button>
      <h1 className="landingBanner" >Streamosphere</h1>
      <SignUpForm />
    </div>
);*/


const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignUpFormBase extends React.Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE };
        this.createGist = this.createGist.bind(this);
        this.userId = -1
    }

    async createGist(email) {
        let url = consts.API_URL + '/user';
        let userId = await fetch(url, {
            method: 'post',
            body: JSON.stringify({"Email": email})
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            return data.UserID;
        });
        return userId
    }

    onSubmit = event => {
        let that = this;
        const { history } = this.props;
        const { email, password } = this.state;
        this.props.firebase
            .doCreateUserWithEmailAndPassword(email, password)
            .then(async function(authUser){
              that.setState({ ...INITIAL_STATE });
              let userId = await that.createGist(email);
              localStorage.setItem('userid', userId);
              that.props.history.push(ROUTES.HOME);
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
      const {
            email,
            password,
            error,
        } = this.state;
        const isInvalid = password === '' || email === '';

        return (
            <div className="landingBackground">
                <Button className="signInButton" variant="light"><Link to={ROUTES.SIGN_IN}>Sign In</Link></Button>
                <h1 className="landingBanner" >Welcome to Streamosphere</h1>
                <Form className="signUpForm"
                      onSubmit={this.onSubmit}>
                    <h1 className="signUpBanner">
                        Sign Up
                    </h1>
                    <Form.Group controlId="formSignUpEmail">
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
                    <Form.Group controlId="formSignUpPassword">
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
                        Sign Up
                    </Button>
                    {error && <p>{error.message}</p>}
                </Form>
            </div>
        );
    }
  }


const SignUpLink = () => (
    <p>
      Already have an account? <Link to={ROUTES.SIGN_IN}>Sign In</Link>
    </p>
);

//const SignUpForm = SignUpFormBase;


export default withFirebase(SignUpFormBase);

//export { SignUpForm, SignUpLink };
