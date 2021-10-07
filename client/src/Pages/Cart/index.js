import React, { useState, useEffect } from "react";
import Layout from "../../Utils/Layout";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "react-bootstrap";
import "./style.css";
import TotalPrice from "../../Components/TotalPrice";
import { useHistory } from "react-router-dom";
import { storeCart } from "../../Global State/Actions/checkoutActions";

const Cart = () => {
  const { cart } = useSelector((state) => state.productReducer);
  const dispatch = useDispatch();
  const history = useHistory();
  const [total, setTotal] = useState(0);

  const handleRemove = (id) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
    dispatch(storeCart(cart));
  };
  const handleIncrease = (id) => {
    dispatch({ type: "PRODUCT_INCREMENT", payload: id });
    dispatch(storeCart(cart));
  };

  const handleDecrement = (id) => {
    dispatch({ type: "PRODUCT_DECREMENT", payload: id });
    dispatch(storeCart(cart));
  };

  useEffect(() => {
    const getTotal = () => {
      const total = cart.reduce((prev, item) => {
        return prev + item[0].price * item.quantity;
      }, 0);
      setTotal(total);
    };
    getTotal();
  }, [cart]);

  return (
    <Layout>
      <Container>
        <div className="cart__container">
          {cart.length !== 0 ? (
            <>
              <h1>Cart</h1>
              <div className="cart__main">
                <div className="cart__items">
                  {cart.map((item) => {
                    return (
                      <div className="cart__div" key={item[0]._id}>
                        <img src={item[0].images.base64} alt={item[0].title} />
                        <div className="cart__div__info">
                          <div className="cart__title">
                            <h2>{item[0].title}</h2>
                            <p>#{item[0].product_id}</p>
                          </div>
                          <div className="cart__price">
                            <h4>
                              Rs{" "}
                              {(item[0].price * item.quantity).toLocaleString()}
                            </h4>
                          </div>
                          <div className="cart__quantity">
                            <button
                              className="btn btn-success"
                              onClick={() => handleDecrement(item)}
                            >
                              -
                            </button>
                            <p>{item.quantity}</p>
                            <button
                              className="btn btn-success"
                              onClick={() => handleIncrease(item)}
                            >
                              +
                            </button>
                            <button
                              onClick={() => handleRemove(item[0]._id)}
                              className="btn btn-danger"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="cart__total__div">
                  <TotalPrice total={total} />
                </div>
              </div>
            </>
          ) : (
            <div style={{ margin: "0 auto", textAlign: "center" }}>
              <h1>Whoops, Cart is Empty!😥</h1>
              <button
                className="button view w-50 cart__btn__home"
                onClick={() => history.push("/")}
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>
      </Container>
    </Layout>
  );
};

export default Cart;
