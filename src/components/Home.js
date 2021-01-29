import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../redux/actions";

function Home() {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const state = useSelector((state) => state.auth);
  const { isLoggingOut, logoutError, roles, logout, user } = state;
  return (
    <div>
      <h1>This is your app's protected area.🚀🚀🚀</h1>
      <h3>email:{user?.email} 🚀🚀🚀</h3>
      <h3>uid:{user?.uid} 🚀🚀🚀🚀🚀 </h3>
      {/* <h3>ROle: {roles.role}</h3> */}
      <p>Any routes here will also be protected</p>
      <button onClick={handleLogout}>Logout</button>
      {logout.loading && <p>Logging Out....</p>}
      {logout.error && <p>Error logging out</p>}
    </div>
  );
}
// function mapStateToProps(state) {
//     return {
//       isLoggingOut: state.auth.isLoggingOut,
//       logoutError: state.auth.logoutError
//     };
//   }

export default Home;
