import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  getProductById,
} from "../../Global State/Actions/ProductAction";
import Loading from "../Loading";
import { useHistory } from "react-router-dom";
import { storeCart } from "../../Global State/Actions/checkoutActions";

const Card = (props) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const { cart } = useSelector((state) => state.productReducer);

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  useEffect(() => {
    if (localStorage.getItem("role") === "admin") {
      setIsAdmin(true);
    }
  }, [cart]);

  const handleFind = () => {
    const user = localStorage.getItem("token");
    if (user) {
      const cartData = cart.map((item) => item[0]._id);
      if (cartData.find((item) => item === props._id)) {
        alert("Product has already added to the cart!");
      } else {
        dispatch({ type: "ADD_TO_CART", payload: props });
        dispatch(storeCart(cart));
      }
    } else {
      alert("Please login first!");
    }
  };

  const handleEditProduct = () => {
    dispatch(getProductById(props._id));
    history.push(`/admin/update-product/${props._id}`);
  };

  if (isLoading) return <Loading />;
  return (
    <div className="product__card">
      <div className="card__header">
        <img src={props.images} alt={props.title} title={props.title} />
      </div>
      <div className="card__body">
        <div className="d-flex a-center j-space-between">
          <h2>Rs {props.price.toLocaleString()}</h2>
          <h6>#{props.product_id}</h6>
        </div>
        <p>{props.description}</p>
      </div>
      <div className="card__footer w-100">
        {isAdmin ? (
          <>
            <button
              className="add_to_basket"
              onClick={() => handleDelete(props._id)}
            >
              Delete
            </button>
            <button className="view" onClick={handleEditProduct}>
              Edit
            </button>
          </>
        ) : (
          <>
            <button className="add_to_basket" onClick={handleFind}>
              Add to Basket
            </button>
            <Link to={`products/${props._id}`}>
              <button className="view">View</button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Card;
