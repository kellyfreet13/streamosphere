import React from 'react';
import Firebase, { FirebaseContext } from './components/firebase';
import ReactDOM from 'react-dom';
import App from './App.jsx';

ReactDOM.render(
<FirebaseContext.Provider value={new Firebase()}>
    <App />
    </FirebaseContext.Provider>,
document.getElementById('root'));