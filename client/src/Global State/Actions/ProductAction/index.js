import axios from "axios";

export const getAllProducts = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/api/products/getProducts");
    dispatch({ type: "GET_ALL_PRODUCTS", payload: data.products });
  } catch (error) {
    console.log(error);
  }
};

export const getProductById = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/products/getProductById/${id}`);
    dispatch({ type: "GET_PRODUCT_BY_ID", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const createProduct = (user) => async (dispatch) => {
  try {
    const data = await axios.post("/api/products/createProduct", user, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("token")}`,
      },
    });
    dispatch({ type: "CREATE_PRODUCT", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/products/deleteProduct/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("token")}`,
      },
    });
    dispatch({ type: "DELETE_PRODUCT", payload: id });
  } catch (error) {
    console.log(error);
  }
};

export const updateProduct = (id, user) => async (dispatch) => {
  try {
    const data = await axios.put(`/api/products/updateProduct/${id}`, user, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("token")}`,
      },
    });
    dispatch({ type: "UPDATE_PRODUCT", payload: data });
  } catch (error) {
    console.log(error);
  }
};
