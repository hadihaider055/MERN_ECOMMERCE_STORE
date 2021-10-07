import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Details from "./Pages/Details";
import Signup from "./Pages/Signup";
import CreateProduct from "./Pages/CreateProduct";
import UpdateProduct from "./Pages/UpdateProduct";
import Cart from "./Pages/Cart";
import Checkout from "./Pages/Checkout";
import OrderHistory from "./Pages/OrderHistory";
import AdminOrderHistory from "./Pages/AdminOrderHistory";
import { useSelector } from "react-redux";

function App() {
  const userRoleRedux = useSelector((state) => state.authReducer.role);
  const [isAdmin, setIsAdmin] = useState(false);

  const userRoleLocal = localStorage.getItem("role");

  useEffect(() => {
    if (userRoleLocal === "admin" || userRoleRedux === "admin") {
      setIsAdmin(true);
    }
  }, [userRoleRedux, userRoleLocal, isAdmin]);

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/products/:id" component={Details} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/cart/checkout" component={Checkout} />
        <Route exact path="/client/history/orders" component={OrderHistory} />
        {isAdmin ? (
          <>
            <Route
              exact
              path="/admin/create-product"
              component={CreateProduct}
            />
            <Route
              exact
              path="/admin/update-product/:id"
              component={UpdateProduct}
            />
            <Route
              exact
              path="/admin/order-history"
              component={AdminOrderHistory}
            />
          </>
        ) : null}
        <Route path="*">Not Found</Route>
      </Switch>
    </Router>
  );
}

export default App;
