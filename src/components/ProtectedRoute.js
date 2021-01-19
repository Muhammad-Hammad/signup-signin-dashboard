import { Route, Redirect } from "react-router-dom";
import Loader from "./loader";
const ProtectedRoute = ({
  component: Component,
  isAuthenticated,
  isVerifying,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      isVerifying ? (
        <Loader />
      ) : isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location },
          }}
        />
      )
    }
  />
);
export default ProtectedRoute;
