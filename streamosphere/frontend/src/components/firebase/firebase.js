import app from 'firebase/app';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAlqlNe020ugOyQxuZBsRTQIlln7NUSzNk",
    authDomain: "streamosphere-362b7.firebaseapp.com",
    databaseURL: "https://streamosphere-362b7.firebaseio.com",
    projectId: "streamosphere-362b7",
    storageBucket: "",
    messagingSenderId: "350335292140"
};

class Firebase {
    constructor() {
        app.initializeApp(config);

        this.auth = app.auth();

    }

    // *** Auth API ***
    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

    doPasswordUpdate = password =>
        this.auth.currentUser.updatePassword(password);
}

export default Firebase;
