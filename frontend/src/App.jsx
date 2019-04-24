import { BrowserRouter, Route, browserHistory } from 'react-router-dom'
import React from 'react';
import SignUpFormBase from './components/containers/LandingPage.jsx'
import SignInFormBase from './components/containers/SignIn.jsx'
import AccountHome from './components/containers/AccountHome.jsx'
//import Navigation from './components/containers/Navigation.jsx'
// Anthony will add this later
// import VideoPlayerComp from './components/containers/VideoPlayer.jsx'
import * as ROUTES from './routes.jsx';
import './layouts/App.css';

class App extends React.Component {
    render() {
        return (
            <BrowserRouter history={browserHistory}>
                <div className="landingBackground">
                    <Route exact path={ROUTES.LANDING} component={SignUpFormBase} />
                    <Route path={ROUTES.HOME} component={AccountHome} />
                    <Route path={ROUTES.SIGN_IN} component={SignInFormBase} />
                </div>
            </BrowserRouter>
        );
    }
}

export default App;