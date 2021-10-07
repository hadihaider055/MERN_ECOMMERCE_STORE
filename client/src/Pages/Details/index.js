import React, { useEffect } from "react";
import Layout from "../../Utils/Layout";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductById } from "../../Global State/Actions/ProductAction";
import Loading from "../../Components/Loading";
import { Container } from "react-bootstrap";
import "./style.css";

const Details = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  const { id } = params;
  const { product } = useSelector((state) => state.productReducer.product);
  useEffect(() => {
    dispatch(getProductById(id));
  }, [id, dispatch]);

  if (product === undefined || product.length === 0) return <Loading />;

  const handleBack = () => {
    history.push("/");
    dispatch({ type: "REMOVE_PRODUCT_DETAILS" });
  };

  return (
    <Layout>
      <div className="description__main">
        <Container>
          <div className="description__page__div">
            <div className="description__image">
              <img src={product.images.base64} alt={product.title} />
            </div>
            <div className="description__content">
              <div className="description__header d-flex a-center j-space-between ">
                <h1>{product.title}</h1>
                <h6>#{product.product_id}</h6>
              </div>
              <p>{product.description}</p>
              <div className="description__footer w-100">
                <h5>Category: {product.category}</h5>
                <h4>Rs {product.price.toLocaleString()}</h4>
                <div className="d-flex a-center j-space-between w-100">
                  <button className="btn btn-success detail__btn">
                    Add to wishlist
                  </button>
                  <button
                    className="btn btn-danger detail__btn"
                    onClick={handleBack}
                  >
                    Back
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </Layout>
  );
};

export default Details;
