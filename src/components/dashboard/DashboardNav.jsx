import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "react-redux";
// import Cookies from "js-cookie";
import "./dashboard.css";
import { Link } from "react-router-dom";
import wallet from "../../../src/svgs/profile-wallet.svg";
import profile from "../../../src/svgs/profile-profile.svg";
import http from "../../api/http";
import styles from './Sidebar.module.scss';
import MenuBar from "./MenuBar";
import { updateUser } from "../../context/reducers/userReducer";

const DashboardNav = () => {
 const { currentUser } = useSelector((state) => state.user); // Access user data from Redux state
 const dispatch = useDispatch();
  const { firstname, photoUrl, lastname, id } = currentUser;

  useEffect(() => {

    const fetchUserData = async () => {
      try {
        const response = await http.get(
          `https://caltex-api.onrender.com/api/users/${id}`,
          {
            withCredentials: true,
          }
        );

        if (response.status === 200) {
          // Assuming the response.data contains the updated user data
           const updatedUserData = response.data;
         dispatch(updateUser(updatedUserData));
        } else {
          console.error("Error fetching user data:", response.data.error);
        }
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };

    fetchUserData();
  }, [id, dispatch]);

  function openNav() {
    document.getElementById("sidenav").style.width = "70%";
  }

  function closeNav() {
    document.getElementById("sidenav").style.width = "0";
  }

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
              <img
                src={photoUrl ? photoUrl : profile}
                height={50}
                width={50}
                alt="user-avatar"
                onClick={() => setProfileMenu(!profileMenu)}
                onMouseEnter={() => setProfileMenu(!profileMenu)}
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
                    <img src={wallet} height={16} width={8} alt="wallet" />
                  </span>
                  <span>
                    <p>My Profile</p>
                    <p>Account Information and security</p>
                  </span>
                </li>
                <li>
                  <span>
                    <img src={profile} height={16} width={16} alt="profile" />
                  </span>
                  <span>
                    <p>My wallet</p>
                    <p>Finances and Password Management</p>
                  </span>
                </li>
                <li>
                  <Link to="https://www.caltextrader.com">
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
            <span class="bell-notification" id=" " onclick=" ">
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
