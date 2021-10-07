import React, { useState, useEffect, useRef } from "react";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Divider from "@mui/material/Divider";
import * as HiIcons from "react-icons/hi";
import {
  AssignmentOutlined,
  AccountBalanceWalletOutlined,
  HelpOutlineOutlined,
  SettingsOutlined,
  ExitToAppOutlined,
  PersonOutlineOutlined,
} from "@mui/icons-material";
import ProfileImage from "../../Assets/dummy.png";
import "./style.css";
import { useHistory } from "react-router-dom";

const Dropdown = ({ Logout, isAdmin }) => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const history = useHistory();

  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    setUserEmail(localStorage.getItem("userName"));
  }, []);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <>
      <div
        className="account__dropdown"
        ref={anchorRef}
        id="composition-button"
        aria-controls={open ? "composition-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <img src={ProfileImage} alt="Profile" className="dropdown__image" />
        <HiIcons.HiOutlineChevronDown className="navbar__chevron__icon" />
      </div>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
        className="card__paper"
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom-start" ? "left top" : "left bottom",
            }}
          >
            <Paper className="card__paper" elevation={7}>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="composition-menu"
                  aria-labelledby="composition-button"
                  onKeyDown={handleListKeyDown}
                  style={{
                    width: "300px",
                    marginTop: "10px",
                  }}
                >
                  <div className="dropdown__welcomeUser">
                    <div className="dropdown__user__imageDiv">
                      <img src={ProfileImage} alt="Profile" />
                    </div>
                    <div className="dropdown__user__details">
                      <p>Hello,</p>
                      <h3>{userEmail}</h3>
                    </div>
                  </div>
                  <Divider />
                  {isAdmin ? (
                    <MenuItem
                      className="menu__item"
                      onClick={() => history.push("/admin/create-product")}
                    >
                      <AssignmentOutlined className="menu__item__icon" />
                      <p>Create Product</p>
                    </MenuItem>
                  ) : (
                    <MenuItem className="menu__item">
                      <PersonOutlineOutlined className="menu__item__icon" />
                      <p>Profile</p>
                    </MenuItem>
                  )}

                  {isAdmin ? (
                    <MenuItem
                      className="menu__item"
                      onClick={() => history.push("/admin/order-history")}
                    >
                      <AccountBalanceWalletOutlined className="menu__item__icon" />
                      <p>Order History</p>
                    </MenuItem>
                  ) : (
                    <MenuItem
                      className="menu__item"
                      onClick={() => history.push("/client/history/orders")}
                    >
                      <AssignmentOutlined className="menu__item__icon" />
                      <p>Order History</p>
                    </MenuItem>
                  )}
                  <Divider />
                  <MenuItem className="menu__item">
                    <HelpOutlineOutlined className="menu__item__icon" />
                    <p>Help</p>
                  </MenuItem>
                  <MenuItem className="menu__item">
                    <SettingsOutlined className="menu__item__icon" />
                    <p>Settings</p>
                  </MenuItem>
                  <Divider />
                  <MenuItem className="menu__item" onClick={Logout}>
                    <ExitToAppOutlined className="menu__item__icon" />
                    <p>Logout</p>
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
};

export default Dropdown;
