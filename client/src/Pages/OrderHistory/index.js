import React, { useEffect } from "react";
import Layout from "../../Utils/Layout";
import { useDispatch, useSelector } from "react-redux";
import { checkoutHistory } from "../../Global State/Actions/checkoutActions";
import "./style.css";
import { Container } from "react-bootstrap";
import moment from "moment";
import { useHistory } from "react-router-dom";

const OrderHistory = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.checkoutReducer.checkoutHistory);
  useEffect(() => {
    dispatch(checkoutHistory());
  }, [dispatch]);
  const history = useHistory();

  if (orders.length === 0) {
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
          <Container>
            <h1>Whoops, No order history found!😥</h1>
            <p>Please buy some products to continue!</p>
            <button
              className="button view w-50 cart__btn__home"
              onClick={() => history.push("/")}
            >
              Continue Shopping
            </button>
          </Container>
        </div>
      </Layout>
    );
  }
  return (
    <Layout>
      <div className="checkoutHistory__div">
        <Container>
          <h1>Order History</h1>
          <div style={{ overflowX: "auto" }}>
            <table>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Date</th>
                  <th>Products</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => {
                  return (
                    <tr key={order._id}>
                      <td>{order._id}</td>
                      <td>
                        {moment(order.createdAt).format("DD - MMM - YYYY")}
                      </td>
                      <td>
                        <ul>
                          {order.cart.map((item) => {
                            return <li key={item[0]._id}>{item[0].title}</li>;
                          })}
                        </ul>
                      </td>
                      <td>
                        <ul>
                          {order.cart.map((item) => {
                            return (
                              <li
                                key={item[0]._id}
                                style={{ textAlign: "center" }}
                              >
                                {item.quantity}
                              </li>
                            );
                          })}
                        </ul>
                      </td>
                      <td>
                        <ul>
                          {order.cart.map((item) => {
                            return (
                              <li
                                key={item[0]._id}
                                style={{ textAlign: "center" }}
                              >
                                {(
                                  item[0].price * item.quantity
                                ).toLocaleString()}
                              </li>
                            );
                          })}
                        </ul>
                      </td>
                      <td>{order.orderStatus}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Container>
      </div>
    </Layout>
  );
};

export default OrderHistory;
