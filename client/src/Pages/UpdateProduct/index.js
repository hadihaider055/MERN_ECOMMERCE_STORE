import React, { useState, useEffect } from "react";
import Layout from "../../Utils/Layout";
import { Container } from "react-bootstrap";
import FileBase64 from "react-file-base64";
import { updateProduct } from "../../Global State/Actions/ProductAction";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../Components/Loading";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateProduct = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const product = useSelector((state) => state.productReducer.product.product);
  const [user, setUser] = useState({
    product_id: "",
    title: "",
    price: "",
    description: "",
    category: "",
    images: {},
  });

  useEffect(() => {
    if (product) {
      setUser({
        product_id: product.product_id,
        title: product.title,
        price: product.price,
        description: product.description,
        category: product.category,
        images: product.images,
      });
    }
  }, [product]);
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProduct(id, user));
    setUser({
      product_id: "",
      title: "",
      price: "",
      description: "",
      category: "",
      quantity: "",
      images: {},
    });
    toast.success("Product updated Successfully!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
    });
    setTimeout(() => {
      history.push("/");
    }, 3000);
  };

  if (product === undefined) return <Loading />;

  return (
    <Layout>
      <Container>
        <ToastContainer />
        <div className="createProduct__main">
          <div className="createProduct__div">
            <h1 className="createProduct__h1">Update Product</h1>
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
                  required
                  onDone={(base64) => {
                    setUser({ ...user, images: base64 });
                  }}
                />
              </div>
              <button className="button w-40">Update Product</button>
            </form>
            <button
              className="view button mt-3 mb-3 w-40"
              onClick={() => history.push("/")}
            >
              Back
            </button>
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default UpdateProduct;
