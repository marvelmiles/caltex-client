import React from "react";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import "./dashboard.css";
import { Link } from "react-router-dom";
import wallet from "../../../src/svgs/profile-wallet.svg";
import styles from "./Sidebar.module.scss";
import MenuBar from "./MenuBar";
import Avatar from "@mui/material/Avatar";
import { HOME_ORIGIN } from "../../config/constants";

const DashboardNav = () => {
  const { currentUser } = useAuth();

  const { firstname, photoUrl, lastname } = currentUser;

  const [isMenuBarVisible, setMenuBarVisibility] = useState(false);

  const openMenuBar = () => {
    setMenuBarVisibility(true);
  };

  const closeMenuBar = () => {
    setMenuBarVisibility(false);
  };

  return (
    <div>
      <MenuBar isVisible={isMenuBarVisible} onClose={closeMenuBar} />
      <div class="welcome-user">
        <div class="welcome">
          <div class="welcome-text">
            <p>Welcome back, {firstname}</p>
          </div>
          <div class="welcome-asset">
            <span>
              <Avatar
                src={photoUrl}
                height={50}
                width={50}
                sx={{
                  position: "relative",
                  mt: "26px",
                  mx: "15px",
                  border: "1px solid currentColor",
                  borderColor: "divider",
                  img: {
                    m: 0
                  }
                }}
              />
            </span>

            <span class="john">
              <p>
                {firstname} {lastname}
              </p>
            </span>
            <span
              class="bell-notification"
              id=" "
              onclick=" "
              style={{ display: "none" }}
            >
              <i class="fa fa-bell" style={{ fontSize: "22px" }}></i>
            </span>
          </div>
          <div class="menu-button" onClick={openMenuBar}>
            &#9776;
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardNav;
