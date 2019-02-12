import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export class Login extends Component {
    render() {
        return (
            <div>
                <form>
                    <label> Username: <input type="text" /> <br />
                        <label> Password: <input type="password" /> <br />
                            <button type="submit"> Login </button>
                            <Link to="/register"><button>Register</button></Link>
                            <a href="forgot.js">Forgot Password?</a>
                        </label>
                    </label>
                </form>
            </div>
        );
    }
}
