import React, { useState, useEffect } from "react";
import "./style.css";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import ProfileImage from "../../Assets/dummy.png";
import { Divider } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import {
  AssignmentOutlined,
  AccountBalanceWalletOutlined,
  HelpOutlineOutlined,
  SettingsOutlined,
  PersonOutlineOutlined,
} from "@mui/icons-material";

function Sidebar({ isLoggedIn, Logout }) {
  const [sidebar, setSidebar] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  const history = useHistory();

  useEffect(() => {
    setUserEmail(localStorage.getItem("userName"));
    if (localStorage.getItem("role") === "admin") {
      setIsAdmin(true);
    }
  }, []);

  return (
    <div className="sidebar">
      <div className="menu-bars-div">
        <Link to="#" className="menu-bars">
          <FaIcons.FaBars onClick={showSidebar} className="menu__bar__ico"/>
        </Link>
      </div>
      <div className={sidebar ? "sidebar-menu active" : "sidebar-menu"}>
        <ul className="sidebar-menu-items">
          <li className="sidebar-toggle">
            <Link to="#" className="menu-bars-close" onClick={showSidebar}>
              <AiIcons.AiOutlineClose />
              <span>Close</span>
            </Link>
          </li>
          {isLoggedIn ? (
            <>
              <li>
                <div className="sidebar__user">
                  <div className="sidebar__user__imageDiv">
                    <img src={ProfileImage} alt="Profile" />
                  </div>
                  <div className="sidebar__user__details">
                    <p>Hello,</p>
                    <h3>{userEmail}</h3>
                  </div>
                </div>
              </li>

              <Divider className="divider" />
              {isAdmin ? (
                <div
                  className="sidebar__item"
                  onClick={() => history.push("/admin/create-product")}
                >
                  <AssignmentOutlined className="menu__item__icon" />
                  <p>Create Product</p>
                </div>
              ) : (
                <div className="sidebar__item">
                  <PersonOutlineOutlined className="menu__item__icon" />
                  <p>Profile</p>
                </div>
              )}
              {isAdmin ? (
                <div
                  className="sidebar__item"
                  onClick={() => history.push("/admin/order-history")}
                >
                  <AccountBalanceWalletOutlined className="menu__item__icon" />
                  <p>Order History</p>
                </div>
              ) : (
                <div
                  className="sidebar__item"
                  onClick={() => history.push("/client/history/orders")}
                >
                  <AccountBalanceWalletOutlined className="menu__item__icon" />
                  <p>Order History</p>
                </div>
              )}
              <Divider className="divider" />
              <div className="sidebar__item">
                <HelpOutlineOutlined className="menu__item__icon" />
                <p>Help</p>
              </div>
              <div className="sidebar__item">
                <SettingsOutlined className="menu__item__icon" />
                <p>Settings</p>
              </div>
              <Divider className="divider" />
              <button className="sidebar__loginBtn" onClick={Logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <li>
                <div
                  className="sidebar__user"
                  onClick={() => history.push("/login")}
                >
                  <div className="sidebar__user__imageDiv">
                    <img src={ProfileImage} alt="Profile" />
                  </div>
                  <div className="sidebar__user__notLogin">
                    <p>Enter to your account</p>
                    <p style={{ textDecoration: "underline" }}>
                      Login to your account
                    </p>
                  </div>
                </div>
              </li>
              <Divider className="divider" />
              <div className="sidebar__item">
                <AssignmentOutlined className="menu__item__icon" />
                <p>Buy business packages</p>
              </div>
              <div className="sidebar__item">
                <AccountBalanceWalletOutlined className="menu__item__icon" />
                <p>Bought Packages & Billing</p>
              </div>
              <Divider className="divider" />
              <div className="sidebar__item">
                <HelpOutlineOutlined className="menu__item__icon" />
                <p>Help</p>
              </div>
              <div className="sidebar__item">
                <SettingsOutlined className="menu__item__icon" />
                <p>Settings</p>
              </div>
              <Divider className="divider" />
              <button
                className="sidebar__loginBtn"
                onClick={() => history.push("/login")}
              >
                Login
              </button>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
