import axios from "axios";

export const userSignin = (user) => async (dispatch) => {
  try {
    const data = await axios.post("/api/users/signin", user);
    dispatch({ type: "USER_SIGNIN", payload: data });
    localStorage.setItem("token", data.data.token);
    localStorage.setItem("role", data.data.role);
    localStorage.setItem("userName", data.data.name);
    localStorage.setItem("user", data);
  } catch (error) {
    const data = error.response.data.message;
    dispatch({ type: "USER_SIGNIN_ERROR", payload: data });
  }
};

export const userSignup = (user) => async (dispatch) => {
  try {
    const data = await axios.post("/api/users/signup", user);
    dispatch({ type: "USER_SIGNUP", payload: data });
  } catch (error) {
    const data = error.response.data.message;
    dispatch({ type: "USER_SIGNUP_ERROR", payload: data });
  }
};

export const userSignout = () => async (dispatch) => {
  try {
    localStorage.clear();
    dispatch({ type: "USER_SIGNOUT" });
  } catch (error) {
    console.log(error);
  }
};
