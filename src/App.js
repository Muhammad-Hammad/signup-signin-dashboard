import { Redirect, Route, Switch } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Firebase from "firebase";
import ProtectedRoute from "./components/ProtectedRoute";
// import Home from "./components/Home";
import StudentHome from "./components/student/StudentHome";
import CompanyHome from "./components/company/CompanyHome";
import Login from "./components/Login";
import SignUp from "./components/Signup";
import forgotPassword from "./components/forgotPassword";
import { detectRole } from "./redux/actions";
import Loading from "./components/loader";

function App() {
  const state = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { signup, login, verify, user, getRole, roles } = state;
  useEffect(() => {
    dispatch(detectRole(user?.uid));
  }, [user]);
  if (roles.role === "Student") {
    return (
      <Switch>
        <ProtectedRoute
          exact
          path="/"
          component={StudentHome}
          isAuthenticated={login.success || signup.success}
          isVerifying={verify.verifying}
        />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        <Route path="/forgotPassword" component={forgotPassword} />
      </Switch>
    );
  } else if (roles.role === "Company") {
    return (
      <Switch>
        <ProtectedRoute
          exact
          path="/"
          component={CompanyHome}
          isAuthenticated={login.success || signup.success}
          isVerifying={verify.verifying}
        />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        <Route path="/forgotPassword" component={forgotPassword} />
      </Switch>
    );
  } else {
    return (
      <Switch>
        <ProtectedRoute
          exact
          path="/"
          component={Login}
          isAuthenticated={login.success || signup.success}
          isVerifying={verify.verifying}
        />

        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        <Route path="/forgotPassword" component={forgotPassword} />
      </Switch>
    );
  }

  //   } else if (company){

  //   }
}

// function mapStateToProps(state) {
//   return {
//     isAuthenticated: state.auth.isAuthenticated,
//     isVerifying: state.auth.isVerifying
//   };
// }

export default App;
