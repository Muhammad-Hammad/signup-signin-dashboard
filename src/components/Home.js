import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../redux/actions";

function Home() {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const state = useSelector((state) => state.auth);
  const { isLoggingOut, logoutError, logout, users } = state;
  //   console.log(user);
  return (
    <div>
      {console.log(users)}
      <h1>This is your app's protected area.🚀🚀🚀</h1>
      <h3>email:{users.user.email} 🚀🚀🚀</h3>
      <h3>uid:{users.user.uid} 🚀🚀🚀🚀🚀 </h3>
      <h3>ROle: {users.user.role}</h3>
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
