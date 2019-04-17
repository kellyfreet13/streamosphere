import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, withRouter } from 'react-router';
import * as ROUTES from '../../routes.jsx';
import { withFirebase } from '../firebase';
import './LandingPage.css'

const LandingPage = () => (
    <div>
    <Button className="signInButton" variant="light"><Link to={ROUTES.SIGN_IN}>Sign In</Link></Button>
      <h1 className="landingBanner" >Streamosphere</h1>
      <SignUpForm />
    </div>


);


const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignUpFormBase extends React.Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE };
    }
    onSubmit = event => {
        console.log("Props");
        console.log(this.props);
        const { history } = this.props;
        const { email, password } = this.state;
        this.props.firebase
            .doCreateUserWithEmailAndPassword(email, password)
            .then(authUser => {
              this.setState({ ...INITIAL_STATE });
              history.push(ROUTES.HOME);
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
        );
    }
  }


const SignUpLink = () => (
    <p>
      Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
    </p>
);

const SignUpForm = withRouter(withFirebase(SignUpFormBase));


export default LandingPage;

export { SignUpForm, SignUpLink };
