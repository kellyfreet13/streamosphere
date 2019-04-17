import { Router, Route, browserHistory } from 'react-router'
import React from 'react';
import LandingPage from './components/containers/LandingPage.jsx'
import SignInPage from './components/containers/SignIn.jsx'
import HomePage from './components/containers/HomePage.jsx'
import Navigation from './components/containers/Navigation.jsx'
import VideoPlayerComp from './components/containers/VideoPlayer.jsx'
import * as ROUTES from './routes.jsx';

class App extends React.Component {
    render() {
        return (
            <Router history={browserHistory}>
                <div>
                    <Navigation />
                    <Route exact path={ROUTES.LANDING} component={LandingPage} />
                    <Route path={ROUTES.HOME} component={HomePage} />
                    <Route path={ROUTES.SIGN_IN} component={SignInPage} />
                </div>
            </Router>

        );
    }
}

export default App;