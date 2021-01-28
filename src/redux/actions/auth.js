import Firebase from "firebase";
import {
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGIN_REQUEST,
  LOGOUT_REQUEST,
  LOGOUT_FAILURE,
  LOGOUT_SUCCESS,
  VERIFY_REQUEST,
  VERIFY_SUCCESS,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  FORGOT_REQUEST,
  FORGOT_SUCCESS,
  FORGOT_FAILURE,
  GETDATA_REQUEST,
  GETDATA_SUCCESS,
  GETDATA_FAILURE,
  ADDJOB_REQUEST,
  ADDJOB_SUCCESS,
  ADDJOB_FAILURE,
} from "../Constants";
const requestLogin = () => {
  return {
    type: LOGIN_REQUEST,
  };
};

const receiveLogin = (user) => {
  return {
    type: LOGIN_SUCCESS,
    payload: { user },
  };
};

const loginError = (error) => {
  return {
    type: LOGIN_FAILURE,
    payload: { error },
  };
};

const requestLogout = () => {
  return {
    type: LOGOUT_REQUEST,
  };
};

const receiveLogout = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};

const logoutError = (error) => {
  return {
    type: LOGOUT_FAILURE,
    payload: { error },
  };
};

const verifyRequest = () => {
  return {
    type: VERIFY_REQUEST,
  };
};

const verifySuccess = () => {
  return {
    type: VERIFY_SUCCESS,
  };
};
const requestSignup = () => {
  return {
    type: SIGNUP_REQUEST,
  };
};
const receiveSignup = (user) => {
  return {
    type: SIGNUP_SUCCESS,
    payload: { user },
  };
};
const signupError = (error) => {
  // console.log(error);
  return {
    type: SIGNUP_FAILURE,
    payload: { error },
  };
};
const requestForgot = () => {
  return {
    type: FORGOT_REQUEST,
  };
};
const receiveForgot = () => {
  return {
    type: FORGOT_SUCCESS,
  };
};
const forgotError = (error) => {
  return {
    type: FORGOT_FAILURE,
    payload: { error },
  };
};
const requestgetData = () => {
  return {
    type: GETDATA_REQUEST,
  };
};
const receivegetData = (role, userName) => {
  return {
    type: GETDATA_SUCCESS,
    payload: { role, userName },
  };
};
const getDataError = () => {
  return {
    type: GETDATA_FAILURE,
  };
};
const requestAddJob = () => {
  return {
    type: ADDJOB_REQUEST,
  };
};
const receiveAddJob = () => {
  return {
    type: ADDJOB_SUCCESS,
    payload: {},
  };
};
const AddJobError = () => {
  return {
    type: ADDJOB_FAILURE,
  };
};

const err = "user doesn't exist on this role!";
export const loginUser = (email, password, role) => (dispatch) => {
  dispatch(requestLogin());
  Firebase.database()
    .ref(`/Users/`)
    .get()
    .then((snapshot) => {
      const data = snapshot.val();
      console.log(data);

      const newArray = Object.entries(data);
      console.log("newArray", newArray);
      if (!newArray.length) {
        console.log("new array", err);
        return dispatch(loginError(err));
      }
      const filtered = newArray.filter((val) => email === val[1]?.email);
      console.log("filtered", filtered);
      if (!filtered.length) {
        console.log(err);
        return dispatch(loginError(err));
      }
      const newEmail = filtered[0][1]?.email;
      const newRole = filtered[0][1]?.role;
      console.log(newEmail);
      console.log(newRole);

      if (newEmail === email && newRole === role) {
        Firebase.auth()
          .signInWithEmailAndPassword(email, password)
          .then((user) => {
            console.log(user, "user");
            dispatch(receiveLogin(user));
          })
          .catch((error) => {
            console.log("error 1st catch ", error);
            dispatch(loginError(error.message));
          });
      } else {
        console.log("error inside catch", err);
        dispatch(loginError(err));
      }
    })
    .catch((error) => {
      console.log("error 2nd catch", err);
      dispatch(loginError(err));
    });
};

export const logoutUser = () => (dispatch) => {
  dispatch(requestLogout());
  Firebase.auth()
    .signOut()
    .then(() => {
      dispatch(receiveLogout());
    })
    .catch((error) => {
      dispatch(logoutError());
    });
};

export const signupUser = (userName, email, password, role) => (dispatch) => {
  dispatch(requestSignup());
  Firebase.auth()
    .createUserWithEmailAndPassword(email, password)
    .then((user) => {
      let UID = Firebase.auth().currentUser?.uid;

      Firebase.database().ref(`/Users/${UID}`).set({
        uid: UID,
        userName: userName,
        email: email,
        password: password,
        role: role,
      });
      dispatch(receiveSignup(user));
    })

    .catch((error) => {
      // console.log(error.message);
      dispatch(signupError(error.message));
    });
};

export const verifyAuth = () => (dispatch) => {
  dispatch(verifyRequest());
  Firebase.auth().onAuthStateChanged((user) => {
    if (user !== null) {
      console.log("verfiyAuth", user);
      dispatch(receiveLogin(user));
    }
    dispatch(verifySuccess());
  });
};

export const sendResetEmail = (email) => (dispatch) => {
  dispatch(requestForgot());
  Firebase.auth()
    .sendPasswordResetEmail(email)
    .then(() => {
      dispatch(receiveForgot());
      // console.log("Success", success);
    })
    .catch((error) => {
      console.log("Error", error.message);
      dispatch(forgotError(error.message));
    });
};

/*            INCOMPLETE WORK                     */
export const detectRole = (UID) => (dispatch) => {
  dispatch(requestgetData());
  // const UID = Firebase.auth().currentUser?.uid;
  console.log(UID);
  Firebase.database()
    .ref(`/Users/${UID}`)
    .get()
    .then((snapshot) => {
      const data = snapshot.val();

      console.log(data);
      const userName = data?.userName;
      console.log("userName", userName);
      const role = data?.role;
      console.log(role);
      dispatch(receivegetData(role, userName));
    })
    .catch((error) => {
      console.log("error", error);
      dispatch(getDataError(error));
    });
};
export const addJob = () => (dispatch) => {};
