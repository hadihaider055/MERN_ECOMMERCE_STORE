import axios from "axios";

export const checkoutUser = (data) => async (dipatch) => {
  try {
    const res = await axios.post("/api/cart/checkoutUser", data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("token")}`,
      },
    });
    dipatch({
      type: "CHECKOUT_USER",
      payload: res.data,
    });
    console.log(res);
  } catch (err) {
    console.log(err);
  }
};

export const storeCart = (cart) => async (dispatch) => {
  try {
    const res = await axios.patch(
      "/api/users/addCart",
      { cart },
      {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      }
    );
    dispatch({
      type: "STORE_CART",
      payload: res.data.cart,
    });
  } catch (error) {
    console.log(error);
  }
};

export const userCheckout = (user) => async (dispatch) => {
  try {
    const { data } = await axios.post("/api/cart/checkoutUser", user, {
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
      },
    });
    dispatch({
      type: "USER_CHECKOUT",
      payload: data.data,
    });
  } catch (error) {
    console.log(error.response);
  }
};

export const checkoutHistory = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/api/cart/checkoutHistory", {
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
      },
    });
    dispatch({
      type: "CHECKOUT_HISTORY",
      payload: data.data,
    });
  } catch (error) {
    console.log(error.response);
  }
};

export const adminCheckoutHistory = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/api/cart/admin/checkoutHistory", {
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
      },
    });
    dispatch({
      type: "CHECKOUT_HISTORY",
      payload: data.data,
    });
  } catch (error) {
    console.log(error.response);
  }
};

// export const adminOrderDelete = (id) => async (dispatch) => {
//   try {
//     const { data } = await axios.delete("/api/cart/admin/order-delete", id, {
//       headers: {
//         Authorization: `${localStorage.getItem("token")}`,
//       },
//     });
//     dispatch({
//       type: "DELETE_ORDER",
//       payload: data.data,
//     });
//     console.log(data);
//   } catch (error) {
//     console.log(error);
//   }
// };
