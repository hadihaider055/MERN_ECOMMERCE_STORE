import React, { useState, useEffect } from "react";
import { Container, Nav } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { userSignout } from "../../Global State/Actions/AuthAction";
import Sidebar from "../Sidebar";
import Dropdown from "../Dropdown";
import { ShoppingBasket } from "@mui/icons-material";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState();
  const [isAdmin, setIsAdmin] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const { cart } = useSelector((state) => state.productReducer);
  const handleSignout = () => {
    dispatch(userSignout());
    setIsLoggedIn();
    window.location.href = "/";
    setIsAdmin(false);
  };

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("token"));
    if (localStorage.getItem("role") === "admin") {
      setIsAdmin(true);
    }
  }, []);

  return (
    <div className="navbar">
      <Container>
        <Nav>
          <Sidebar isLoggedIn={isLoggedIn} Logout={handleSignout} />
          <Link to="/" className="navbar__brand ">
            {isAdmin ? <>Ecommerce_Store.pk(Admin)</> : <>Ecommerce_Store.pk</>}
          </Link>
        </Nav>
        <Nav
          className="mr-auto my-2 my-lg-0"
          style={{ maxHeight: "100px" }}
          navbarScroll
        >
          {isLoggedIn ? (
            <div className="header__loginDiv">
              {!isAdmin && (
                <div
                  className="header__basket mt-2"
                  onClick={() => history.push("/cart")}
                >
                  <span>{cart.length}</span>
                  <ShoppingBasket className="shopping__basket" />
                </div>
              )}
              <Dropdown Logout={handleSignout} isAdmin={isAdmin} />
            </div>
          ) : (
            <>
              <Link to="/signup" className="link__btn">
                Signup
              </Link>
              <Link to="/login" className="header__login">
                <button className="button">Login</button>
              </Link>
            </>
          )}
        </Nav>
      </Container>
    </div>
  );
};

export default Header;
