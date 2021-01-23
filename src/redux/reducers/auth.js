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
  FORGOT_REQUEST,
  FORGOT_SUCCESS,
  FORGOT_FAILURE,
  GETROLE_REQUEST,
  GETROLE_SUCCESS,
  GETROLE_FAILURE,
} from "../Constants";

const initState = {
  login: {
    loading: false,
    error: false,
    success: false,
    errorMsg: "",
  },
  logout: {
    loading: false,
    error: false,
    success: false,
  },
  signup: {
    loading: false,
    error: false,
    success: false,
    errorMsg: "",
  },
  verify: {
    verifying: false,
    error: false,
  },
  forgot: {
    loading: false,
    error: false,
    success: false,
    errorMsg: "",
  },
  getRole: {
    loading: false,
    error: false,
    success: false,
    errorMsg: "",
  },
  users: {
    user: {},
  },
};
export default function Auth(state = initState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        login: {
          loading: true,
          error: false,
          success: false,
        },
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        login: {
          loading: false,
          error: false,
          success: true,
        },
        users: {
          user: action?.payload?.user,
        },
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        login: {
          loading: false,
          error: true,
          success: false,
          errorMsg: action?.payload?.error,
        },
      };
    case LOGOUT_REQUEST:
      return {
        ...state,
        logout: {
          loading: true,
          error: false,
          success: false,
        },
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        login: {
          success: false,
        },
        logout: {
          loading: false,
          error: false,
        },
        signup: {
          success: false,
        },
        users: {
          user: {},
        },
      };
    case LOGOUT_FAILURE:
      return {
        ...state,
        logout: {
          loading: false,
          error: true,
          success: false,
        },
      };
    case VERIFY_REQUEST:
      return {
        ...state,
        verify: {
          verifying: true,
          error: false,
        },
      };
    case VERIFY_SUCCESS:
      return {
        ...state,
        verify: {
          verifying: false,
          error: false,
        },
      };
    case SIGNUP_REQUEST:
      return {
        ...state,
        signup: {
          loading: true,
          error: false,
          success: false,
        },
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        signup: {
          loading: false,
          error: false,
          success: true,
        },
        users: {
          user: action?.payload?.user,
        },
      };
    case SIGNUP_FAILURE:
      return {
        ...state,
        signup: {
          loading: false,
          error: true,
          success: false,
          errorMsg: action?.payload?.error,
        },
      };
    case FORGOT_REQUEST:
      return {
        ...state,
        forgot: {
          loading: true,
          error: false,
          success: false,
        },
      };
    case FORGOT_SUCCESS:
      return {
        ...state,
        forgot: {
          loading: false,
          error: false,
          success: true,
        },
      };
    case FORGOT_FAILURE:
      return {
        ...state,
        forgot: {
          loading: false,
          error: true,
          success: false,
          errorMsg: action?.payload?.error,
        },
      };
    case GETROLE_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
        success: false,
        errorMsg: "",
      };
    case GETROLE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        success: true,
        errorMsg: "",
      };
    case GETROLE_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        success: false,
        errorMsg: action?.payload?.error,
      };
    default:
      return state;
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
// export default (
//   state = {
//     isLoggingIn: false,
//     isLoggingOut: false,
//     isVerifying: false,
//     loginError: false,
//     logoutError: false,
//     isAuthenticated: false,
//     is_Signup: false,
//     signUpError: "",
//     signUpErrorMsg: false,
//     user: {},
//   },
//   action
// ) => {
//   switch (action.type) {
//     case LOGIN_REQUEST:
//       return {
//         ...state,
//         isLoggingIn: true,
//         loginError: false,
//       };
//     case LOGIN_SUCCESS:
//       return {
//         ...state,
//         isLoggingIn: false,
//         isAuthenticated: true,
//         user: action.user,
//       };
//     case LOGIN_FAILURE:
//       return {
//         ...state,
//         isLoggingIn: false,
//         isAuthenticated: false,
//         loginError: true,
//       };
//     case LOGOUT_REQUEST:
//       return {
//         ...state,
//         isLoggingOut: true,
//         logoutError: false,
//       };
//     case LOGOUT_SUCCESS:
//       return {
//         ...state,
//         isLoggingOut: false,
//         isAuthenticated: false,
//         user: {},
//       };
//     case LOGOUT_FAILURE:
//       return {
//         ...state,
//         isLoggingOut: false,
//         logoutError: true,
//       };
//     case VERIFY_REQUEST:
//       return {
//         ...state,
//         isVerifying: true,
//         verifyingError: false,
//       };
//     case VERIFY_SUCCESS:
//       return {
//         ...state,
//         isVerifying: false,
//       };
//     case SIGNUP_REQUEST:
//       return {
//         ...state,
//         is_Signup: true,
//         // signUpError: false,
//       };
//     case SIGNUP_SUCCESS:
//       return {
//         ...state,
//         // signupError: false,
//         user: action.user,
//       };
//     case SIGNUP_FAILURE:
//       return {
//         ...state,
//         signUpError: action.signUpError,
//         signUpErrorMsg: true,
//       };

//     default:
//       return state;
//   }
// };
