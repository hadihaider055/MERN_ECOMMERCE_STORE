import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const TotalPrice = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleRemoveAll = () => {
    dispatch({ type: "REMOVE_ALL" });
  };

  return (
    <div
      className="total__price__main"
      style={{
        border: "1px solid #ccc",
        padding: "30px 10px",
        width: "300px",
        height: "210px",
        marginTop: "10px",
      }}
    >
      <h2 style={{ fontFamily: "Georama,sans-serif", textAlign: "center" }}>
        Checkout
      </h2>
      <p
        style={{
          fontFamily: "Lato,sans-serif",
          fontSize: "21px",
          margin: "20px 0",
          textAlign: "center",
        }}
      >
        Total: Rs {props.total.toLocaleString()}
      </p>
      <div style={{ margin: "0 auto", textAlign: "center" }}>
        <button
          className="btn btn-success mr-10"
          onClick={() => history.push("/cart/checkout")}
        >
          Checkout
        </button>
        <button className="btn btn-danger ml-10" onClick={handleRemoveAll}>
          Clear Cart
        </button>
      </div>
    </div>
  );
};

export default TotalPrice;
