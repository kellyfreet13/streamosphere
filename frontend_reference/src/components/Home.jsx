import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import '../layouts/MainLayout.css';
import sph from '../images/sphere.jpg';
import sph1 from '../images/csSphere.jpg';

export class Home extends Component {
  displayName = Home.name

    render() {
        return (
            <body>
                <div>
                    <Link to="/login"><button>Login</button></Link> <br /> 
                    <h1>Welcome to Streamosphere!</h1>
                    <img src={sph} alt="a gray sphere" width="400" height="400" />
                    <img src={sph1} alt="a sphere of binary digits" width="400" height="400" />
                </div>                                                                                                          
            </body>
            );
  }
}
