const initialState = {
  user: [],
  error: null,
  isAuthenticated: false,
  role: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "USER_SIGNIN":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        role: action.payload.data.role,
      };
    case "USER_SIGNIN_ERROR":
      return {
        ...state,
        error: action.payload,
        isAuthenticated: false,
      };
    case "USER_SIGNUP":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: false,
      };
    case "USER_SIGNUP_ERROR":
      return {
        ...state,
        error: action.payload,
        isAuthenticated: false,
      };
    case "USER_SIGNOUT":
      return {
        ...state,
        user: [],
        isAuthenticated: false,
        role: null,
      };
    default:
      return state;
  }
};

export default authReducer;
