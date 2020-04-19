import React, { Component } from "react";
import firebase from "firebase";
import StyledFirebaseUi from "react-firebaseui/StyledFirebaseAuth";
import "whatwg-fetch";
import axios from "axios";

const firebaseConfig = {
  apiKey: "AIzaSyDqzt3_Ugr5LAWvY5XZ7Apa9tGjpwZMQvE",
  authDomain: "simcoder-example.firebaseapp.com",
  databaseURL: "https://simcoder-example.firebaseio.com",
  projectId: "simcoder-example",
  storageBucket: "simcoder-example.appspot.com",
  messagingSenderId: "482558215006",
  appId: "1:482558215006:web:d14ddf8058617d4c5005cf",
  measurementId: "G-19HZHFG9LR"
};

firebase.initializeApp(firebaseConfig);

var uiConfig = {
  callbacks: {
    //After user signs in this function is called
    signInSuccessWithAuthResult: function(authResult, redirectUrl) {
      axios
        .post("/api/user/check", null, {
          params: { user: firebase.auth().currentUser }
        })
        .then(res => {
          console.log(res);
        });
      return true;
    }
  },
  signInFlow: "popup",
  signInSuccessUrl: "/",
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID]
};

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false
    };
  }

  componentDidMount() {
    //Auth State Listener, called any time the user logs in or out
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ isAuthenticated: !this.state.isAuthenticated });
    });
  }

  render() {
    return (
      <>
        <h3>Login</h3>
        <StyledFirebaseUi uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
      </>
    );
  }
}

export default Login;
