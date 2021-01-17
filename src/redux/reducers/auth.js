import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  VERIFY_REQUEST,
  VERIFY_SUCCESS,
  SIGNUP_FAILURE,
  SIGNUP_SUCCESS,
  SIGNUP_REQUEST,
} from "../Constants";

// eslint-disable-next-line import/no-anonymous-default-export

// const initState = {
//   login:{
//     loading:false,
//     error:'',
//     success:'',
//   },
//   logout:{
//     loading:false,
//     error:'',
//     success:''
//   },
//   signup:{
//     loading: '',
//     error:'',
//     success:''
//   }
// }
// export default function Auth(state = initState,action){
//   switch (action.type) {
//     case value:

//       break;

//     default:
//       break;
//   }
// }

// eslint-disable-next-line import/no-anonymous-default-export
export default (
  state = {
    isLoggingIn: false,
    isLoggingOut: false,
    isVerifying: false,
    loginError: false,
    logoutError: false,
    isAuthenticated: false,
    is_Signup: false,
    signUpError: "",
    signUpErrorMsg: false,
    user: {},
  },
  action
) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isLoggingIn: true,
        loginError: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggingIn: false,
        isAuthenticated: true,
        user: action.user,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isLoggingIn: false,
        isAuthenticated: false,
        loginError: true,
      };
    case LOGOUT_REQUEST:
      return {
        ...state,
        isLoggingOut: true,
        logoutError: false,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isLoggingOut: false,
        isAuthenticated: false,
        user: {},
      };
    case LOGOUT_FAILURE:
      return {
        ...state,
        isLoggingOut: false,
        logoutError: true,
      };
    case VERIFY_REQUEST:
      return {
        ...state,
        isVerifying: true,
        verifyingError: false,
      };
    case VERIFY_SUCCESS:
      return {
        ...state,
        isVerifying: false,
      };
    case SIGNUP_REQUEST:
      return {
        ...state,
        is_Signup: true,
        // signUpError: false,
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        // signupError: false,
        user: action.user,
      };
    case SIGNUP_FAILURE:
      return {
        ...state,
        signUpError: action.signUpError,
        signUpErrorMsg: true,
      };

    default:
      return state;
  }
};
