import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            pass: ''
        };

        this.GetInput = this.GetInput.bind(this);
    }

    GetInput(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }
    render() {
        return (
            <div>
                <form>
                    <label> New username: <input type="text" name="username" /> <br />
                        <label> New password: <input type="password" name="pass" /> <br />
                            <Link to="/AccountHome"><button type="Submit">Submit</button></Link>
                        </label>
                    </label>
                </form>
            </div>
        );
    }
}
