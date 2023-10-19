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
  const { currentUser, handleSignout } = useAuth();

  const { firstname, photoUrl, lastname } = currentUser;

  const [isMenuBarVisible, setMenuBarVisibility] = useState(false);

  const openMenuBar = () => {
    setMenuBarVisibility(true);
  };

  const closeMenuBar = () => {
    setMenuBarVisibility(false);
  };

  const [profileMenu, setProfileMenu] = useState(false);

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
                onClick={() => setProfileMenu(!profileMenu)}
                onMouseEnter={() => setProfileMenu(!profileMenu)}
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
            {profileMenu && (
              <ul
                className={styles.profile_ul_container}
                onMouseLeave={() => setProfileMenu(!profileMenu)}
              >
                <li>{firstname}</li>
                <li>
                  <span>
                    <Avatar
                      src={photoUrl}
                      sx={{
                        height: 20,
                        width: 20,
                        mt: "20px",
                        mr: "15px",
                        border: "1px solid currentColor",
                        borderColor: "divider",
                        img: {
                          m: 0
                        }
                      }}
                    />
                  </span>
                  <span>
                    <p>
                      <Link to="/profile/Profile">My Profile</Link>
                    </p>
                    <p>Account Information and security</p>
                  </span>
                </li>
                <li style={{ display: "none" }}>
                  <span>
                    <img src={wallet} height={16} width={16} alt="wallet" />
                  </span>
                  <span>
                    <p>My wallet</p>
                    <p>Finances and Password Management</p>
                  </span>
                </li>
                <li>
                  <Link to={HOME_ORIGIN} onClick={handleSignout}>
                    <button type="button">Sign Out</button>
                  </Link>
                </li>
              </ul>
            )}
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
