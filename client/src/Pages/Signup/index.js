import React, { useState, useEffect } from "react";
import { userSignup } from "../../Global State/Actions/AuthAction";
import Layout from "../../Utils/Layout";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import Loading from "../../Components/Loading";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Signup = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeVisibility = () => {
    setShowPassword(!showPassword);
  };

  const dispatch = useDispatch();
  const history = useHistory();
  const userState = useSelector((state) => state.authReducer);
  useEffect(() => {
    setError(userState.error);
    if (userState.error !== null) {
      setIsLoading(false);
    }
  }, [userState]);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    dispatch(userSignup(user));
    setIsLoading(true);
  };
  if (userState.user.status === 201) history.push("/login");
  if (isLoading) return <Loading />;

  return (
    <Layout>
      <div className="login__main">
        <h1>Signup</h1>
        {error && (
          <Alert variant="danger" className="w-20">
            {error}
          </Alert>
        )}
        <form onSubmit={handleLoginSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            className="d-block"
            required
            name="name"
            value={user.name}
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="Email"
            className="d-block"
            required
            name="email"
            value={user.email}
            onChange={handleChange}
          />
          {showPassword ? (
            <div style={{ display: "flex" }}>
              <input
                type="text"
                placeholder="Password"
                className="d-block"
                required
                name="password"
                onChange={handleChange}
                value={user.password}
                minLength="8"
              />
              <Visibility
                onClick={handleChangeVisibility}
                title="Hide Password"
                style={{
                  cursor: "pointer",
                  marginLeft: "-35px",
                  marginTop: "25px",
                  fontSize: "18px",
                  color: "#bababa",
                }}
              />
            </div>
          ) : (
            <div style={{ display: "flex" }}>
              <input
                type="password"
                placeholder="Password"
                className="d-block"
                required
                name="password"
                onChange={handleChange}
                value={user.password}
                minLength="8"
              />
              <VisibilityOff
                onClick={handleChangeVisibility}
                title="Show Password"
                style={{
                  cursor: "pointer",
                  marginLeft: "-35px",
                  marginTop: "25px",
                  fontSize: "18px",
                  color: "#bababa",
                }}
              />
            </div>
          )}
          <button className="button login__btn">Signup</button>
        </form>
        <h6 className="mt-3">
          Already have an account? <Link to="/login">Login</Link>
        </h6>
      </div>
    </Layout>
  );
};

export default Signup;
