import React, { useState, useEffect } from "react";
import Layout from "../../Utils/Layout";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { userCheckout } from "../../Global State/Actions/checkoutActions";
import Swal from "sweetalert2";

const Checkout = () => {
  const [userOrder, setUserOrder] = useState({
    userName: "",
    userAddress: "",
    userPhone: "",
    userEmail: "",
    userCity: "",
    userState: "",
    userZip: "",
    cart: [],
  });
  const history = useHistory();
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.productReducer);
  useEffect(() => {
    setUserOrder({ ...userOrder, cart });
  }, [cart]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserOrder({ ...userOrder, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "We accept cash on delivery for now!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, place order!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(userCheckout(userOrder));
        Swal.fire("Your order has been placed successfully!", "", "success");
        setUserOrder({
          userName: "",
          userAddress: "",
          userPhone: "",
          userEmail: "",
          userCity: "",
          userState: "",
          userZip: "",
          cart: [],
        });
        history.push("/");
        dispatch({ type: "REMOVE_ALL" });
      }
    });
  };

  if (cart.length === 0) {
    return (
      <Layout>
        <div
          style={{
            margin: "0 auto",
            textAlign: "center",
            position: "absolute",
            top: "30%",
            left: 0,
            right: 0,
          }}
        >
          <h1>Whoops, Cart is Empty!😥</h1>
          <p>Please buy some products to continue!</p>
          <button
            className="button view w-50 cart__btn__home"
            onClick={() => history.push("/")}
          >
            Continue Shopping
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div
        style={{
          margin: "0 auto",
          textAlign: "center",
          maxWidth: "350px",
          width: "100%",
          position: "absolute",
          left: 0,
          right: 0,
          top: "20%",
          bottom: "0",
        }}
      >
        <h1>Checkout Form</h1>
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            className="d-block"
            required
            name="userName"
            value={userOrder.userName}
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="Email"
            className="d-block"
            required
            name="userEmail"
            value={userOrder.userEmail}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Phone Number"
            className="d-block"
            required
            name="userPhone"
            value={userOrder.userPhone}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Address"
            className="d-block"
            required
            name="userAddress"
            value={userOrder.userAddress}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="City"
            className="d-block"
            required
            name="userCity"
            value={userOrder.userCity}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="State"
            className="d-block"
            required
            name="userState"
            value={userOrder.userState}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Zip Code"
            className="d-block"
            required
            name="userZip"
            value={userOrder.userZip}
            onChange={handleChange}
          />
          <button className="button login__btn">Submit</button>
        </form>
      </div>
    </Layout>
  );
};

export default Checkout;
