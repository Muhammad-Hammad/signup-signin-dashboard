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
      const newArray = Object.entries(data);
      if (!newArray.length) {
        return dispatch(loginError(err));
      }
      const filtered = newArray.filter((val) => email === val[1]?.email);
      if (!filtered.length) {
        return dispatch(loginError(err));
      }
      const newEmail = filtered[0][1]?.email;
      const newRole = filtered[0][1]?.role;

      if (newEmail === email && newRole === role) {
        Firebase.auth()
          .signInWithEmailAndPassword(email, password)
          .then((user) => {
            dispatch(receiveLogin(user));
          })
          .catch((error) => {
            dispatch(loginError(error.message));
          });
      } else {
        dispatch(loginError(err));
      }
    })
    .catch((error) => {
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
      dispatch(signupError(error.message));
    });
};

export const verifyAuth = () => (dispatch) => {
  dispatch(verifyRequest());
  Firebase.auth().onAuthStateChanged((user) => {
    if (user !== null) {
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
    })
    .catch((error) => {
      dispatch(forgotError(error.message));
    });
};

/*            INCOMPLETE WORK                     */
export const detectRole = (UID) => (dispatch) => {
  dispatch(requestgetData());
  // const UID = Firebase.auth().currentUser?.uid
  Firebase.database()
    .ref(`/Users/${UID}`)
    .get()
    .then((snapshot) => {
      const data = snapshot.val();
      const userName = data?.userName;
      const role = data?.role;
      dispatch(receivegetData(role, userName));
    })
    .catch((error) => {
      dispatch(getDataError(error));
    });
};
export const addJob = () => (dispatch) => {};
