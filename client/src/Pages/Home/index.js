import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import Layout from "../../Utils/Layout";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../Global State/Actions/ProductAction";
import Loading from "../../Components/Loading";
import Card from "../../Components/Card";
import Banner from "../../Assets/banner.jpg";
import "./style.css";

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProducts());
    dispatch({ type: "REMOVE_PRODUCT_DETAILS" });
  }, [dispatch]);
  const products = useSelector((state) => state.productReducer.allProducts);
  if (products === undefined || products === null || products.length === 0)
    return <Loading />;
  return (
    <Layout>
      <Container>
        <img src={Banner} alt="Website Banner" className="banner" />
        <div className="home__products">
          {products.map((product) => (
            <Card
              key={product._id}
              _id={product._id}
              images={product.images.base64}
              title={product.title}
              price={product.price}
              description={product.description}
              product_id={product.product_id}
            />
          ))}
        </div>
      </Container>
    </Layout>
  );
};

export default Home;
