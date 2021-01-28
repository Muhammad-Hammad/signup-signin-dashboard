import { Route, Redirect } from "react-router-dom";
import Appbar from "./Appbar";
import Loader from "./loader";
const ProtectedRoute = ({
  component: Component,
  isAuthenticated,
  isVerifying,
  routeName,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      isVerifying ? (
        <Loader />
      ) : isAuthenticated ? (
        <Appbar routeName={routeName}>
          <Component {...props} />
        </Appbar>
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            // state: { from: props.location },
          }}
        />
      )
    }
  />
);
export default ProtectedRoute;
