import { Redirect, Route, Switch } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Firebase from "firebase";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./components/Home";
import StudentHome from "./components/student/StudentHome";
import CompanyHome from "./components/company/CompanyHome";
import Login from "./components/Login";
import SignUp from "./components/Signup";
import forgotPassword from "./components/forgotPassword";
import { detectRole } from "./redux/actions";
import Loading from "./components/loader";
import AddJob from "./components/company/AddJob";

function App() {
  const state = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { signup, login, verify, user, getData, role, userName } = state;

  useEffect(() => {
    dispatch(detectRole(user?.uid));
  }, [user]);
  let str = userName?.replace(/\s+/g, "-").toLowerCase();
  let routeName = userName?.toUpperCase();
  if (getData.loading) {
    <Loading />;
  }

  if (role === "Student") {
    return (
      <Switch>
        <ProtectedRoute
          exact
          path={`/${str}`}
          component={StudentHome}
          isAuthenticated={login.success || signup.success}
          isVerifying={verify.verifying}
          routeName={routeName}
        />

        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        <Route path="/forgotPassword" component={forgotPassword} />
      </Switch>
    );
  } else if (role === "Company") {
    return (
      <Switch>
        <ProtectedRoute
          exact
          path={`/${str}`}
          component={CompanyHome}
          isAuthenticated={login.success || signup.success}
          isVerifying={verify.verifying}
          routeName={routeName}
        />
        if (role === "company" && (login.success || signup success)) else {}
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        <Route path="/forgotPassword" component={forgotPassword} />
      </Switch>
    );
  } else {
    return (
      <>
        {/* <Redirect to="/login" /> */}
        <Switch>
          <ProtectedRoute
            exact
            path="/"
            component={Home}
            isAuthenticated={login.success || signup.success}
            isVerifying={verify.verifying}
          />

          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
          <Route path="/forgotPassword" component={forgotPassword} />
        </Switch>
      </>
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
