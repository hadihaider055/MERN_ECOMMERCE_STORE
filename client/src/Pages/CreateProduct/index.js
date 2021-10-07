import React, { useState } from "react";
import Layout from "../../Utils/Layout";
import { Container } from "react-bootstrap";
import "./style.css";
import FileBase64 from "react-file-base64";
import { createProduct } from "../../Global State/Actions/ProductAction";
import { useDispatch } from "react-redux";

const CreateProduct = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    product_id: "",
    title: "",
    price: "",
    description: "",
    category: "",
    images: {},
  });
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createProduct(user));
    setUser({
      product_id: "",
      title: "",
      price: "",
      description: "",
      category: "",
      images: {},
    });
  };

  return (
    <Layout>
      <Container>
        <div className="createProduct__main">
          <div className="createProduct__div">
            <h1 className="createProduct__h1">Create Product</h1>
            <form onSubmit={handleSubmit}>
              <div className="form__group">
                <input
                  placeholder="Product ID"
                  name="product_id"
                  className="w-10"
                  onChange={handleChange}
                  value={user.product_id}
                  required
                />
                <input
                  placeholder="Product Category"
                  name="category"
                  className="w-10 ml-10"
                  onChange={handleChange}
                  required
                  value={user.category}
                />
              </div>
              <div className="form__group">
                <input
                  placeholder="Price"
                  name="price"
                  className="w-100"
                  onChange={handleChange}
                  value={user.price}
                  required
                />
              </div>
              <div className="createProduct__form">
                <input
                  placeholder="Product Title"
                  name="title"
                  onChange={handleChange}
                  required
                  value={user.title}
                />
                <textarea
                  placeholder="Product Description"
                  name="description"
                  onChange={handleChange}
                  required
                  value={user.description}
                ></textarea>
                <FileBase64
                  multiple={false}
                  onDone={(base64) => {
                    setUser({ ...user, images: base64 });
                  }}
                  required="true"
                />
              </div>
              <button className="button w-40">Create Product</button>
            </form>
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default CreateProduct;
