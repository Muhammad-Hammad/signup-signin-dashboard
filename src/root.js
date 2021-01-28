import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import Firebase from "firebase";
import Form from "./App.test";
import App from "./App";
import Loader from "./components/loader";
import ForgotPassword from "./components/forgotPassword";
// import Signup from "./components/Signup"
import { firebaseConfig } from "./firebase/firebase";
import configureStore from "./redux/configureStore";
import JobCard from "./components/JobCard";
import CompanyHome from "./components/company/CompanyHome";
import Signup from "./components/Signup";
import AddJob from "./components/company/AddJob";

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
