import { Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";

import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/Signup";
import forgotPassword from "./components/forgotPassword";
function App() {
  const state = useSelector((state) => state.auth);

  const { signup, login, verify } = state;
  return (
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
  );
}

// function mapStateToProps(state) {
//   return {
//     isAuthenticated: state.auth.isAuthenticated,
//     isVerifying: state.auth.isVerifying
//   };
// }

export default App;
