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

const loginError = () => {
  return {
    type: LOGIN_FAILURE,
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

const logoutError = () => {
  return {
    type: LOGOUT_FAILURE,
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
const forgotError = () => {
  return {
    type: FORGOT_SUCCESS,
  };
};
// const requestLogin = () => {
//   return {
//     type: LOGIN_REQUEST,
//   };
// };

// const receiveLogin = (user) => {
//   return {
//     type: LOGIN_SUCCESS,
//     user,
//   };
// };

// const loginError = () => {
//   return {
//     type: LOGIN_FAILURE,
//   };
// };

// const requestLogout = () => {
//   return {
//     type: LOGOUT_REQUEST,
//   };
// };

// const receiveLogout = () => {
//   return {
//     type: LOGOUT_SUCCESS,
//   };
// };

// const logoutError = () => {
//   return {
//     type: LOGOUT_FAILURE,
//   };
// };

// const verifyRequest = () => {
//   return {
//     type: VERIFY_REQUEST,
//   };
// };

// const verifySuccess = () => {
//   return {
//     type: VERIFY_SUCCESS,
//   };
// };
// const requestSignup = () => {
//   return {
//     type: SIGNUP_REQUEST,
//   };
// };
// const receiveSignup = (user) => {
//   return {
//     type: SIGNUP_SUCCESS,
//     user,
//   };
// };
// const signupError = (error) => {
//   // console.log(error);
//   return {
//     type: SIGNUP_FAILURE,
//     signUpError: error.message,
//   };
// };

export const loginUser = (email, password, role) => (dispatch) => {
  dispatch(requestLogin());
  // let UID = Firebase.auth().currentUser?.uid;
  Firebase.database()
    .ref(`/Users/${role}`)
    .get()
    .then((snapshot) => {
      const data = snapshot.val();
      const newArray = Object.entries(data);
      const filtered = newArray.filter((val) => email === val[1].email);
      const newEmail = filtered[0][1].email;
      console.log(newEmail);
      if (newEmail === email) {
        Firebase.auth()
          .signInWithEmailAndPassword(email, password)
          .then((user) => {
            console.log(user, "user");
            dispatch(receiveLogin(user));
          })
          .catch((error) => {
            dispatch(loginError());
          });
      }
    })
    .catch((error) => {
      dispatch(loginError());
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

export const signupUser = (fname, lname, email, password, role) => (
  dispatch
) => {
  dispatch(requestSignup());
  Firebase.auth()
    .createUserWithEmailAndPassword(email, password)
    .then((user) => {
      dispatch(receiveSignup(user));
      let UID = Firebase.auth().currentUser?.uid;

      Firebase.database().ref(`/Users/${role}/${UID}`).set({
        uid: UID,
        fname: fname,
        lname: lname,
        email: email,
        password: password,
        role: role,
      });
    })
    .catch((error) => {
      dispatch(signupError(error));
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
      console.log("Success");
    })
    .catch(() => {
      console.log("Error", Error);
    });
};

/*            INCOMPLETE WORK                     */
// export const detectRole = (uid) => (dispatch) => {
//   Firebase.database()
//     .ref(`/Users/`)
//     .get()
//     .then((snapshot) => {
//       const data = snapshot.val();
//       const newArray = Object.entries(data);
//       console.log("data in obj", data);
//       console.log("data", newArray);
//       const filtered = newArray.filter((val, ind, arr) => uid === val[1].email);
//       console.log(filtered);
//     });
// };
