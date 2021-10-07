import React, { useEffect } from "react";
import Layout from "../../Utils/Layout";
import { useDispatch, useSelector } from "react-redux";
import { adminCheckoutHistory } from "../../Global State/Actions/checkoutActions";
import "./style.css";
import { Container } from "react-bootstrap";
import moment from "moment";
import ModalComp from "../../Components/Modal";
import Loading from "../../Components/Loading";

const AdminOrderHistory = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.checkoutReducer.checkoutHistory);
  useEffect(() => {
    dispatch(adminCheckoutHistory());
  }, [dispatch]);

  if (orders.length === 0) return <Loading />;

  return (
    <Layout>
      <div className="checkoutHistory__div">
        <Container>
          <ModalComp />
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
                  <th>Details</th>
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
                      <td>
                        <button
                          className="btn btn-primary"
                          style={{ margin: "0 auto", textAlign: "center" }}
                          onClick={() =>
                            dispatch({
                              type: "CHECKOUT_MODAL_STATE",
                              payload: { isOpen: true, userId: order._id },
                            })
                          }
                        >
                          View Details
                        </button>
                      </td>
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

export default AdminOrderHistory;
