import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import Firebase from "firebase";
import Form from "./App.test";
import App from "./App";
import Loader from "./components/loader";
// import Signup from "./components/Signup"
import { firebaseConfig } from "./firebase/firebase";
import configureStore from "./redux/configureStore";

Firebase.initializeApp(firebaseConfig);

const store = configureStore();

function Root() {
  return (
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  );
}
export default Root;
