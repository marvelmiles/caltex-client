import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import "./dashboard.css";
import MenuBar from "./MenuBar";
import verifiedIcon from "../../../src/images/verified.png";
import Avatar from "@mui/material/Avatar";

const DashboardNav = () => {
  const { currentUser } = useAuth();
  const { firstname, photoUrl, fullname, kycDocs, kycIds } = currentUser;
  const [isMenuBarVisible, setMenuBarVisibility] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const openMenuBar = () => {
    setMenuBarVisibility(true);
  };

  const closeMenuBar = () => {
    setMenuBarVisibility(false);
  };

  useEffect(() => {
    setIsVerified(
      !!(Object.keys(kycDocs).length || Object.keys(kycIds).length)
    );
  }, [kycDocs, kycIds]);

  return (
    <div>
      <MenuBar isVisible={isMenuBarVisible} onClose={closeMenuBar} />
      <div className="welcome-user">
        <div className="welcome">
          <div className="welcome-text">
            <p>Welcome back, {firstname}</p>
            {isVerified && (
              <img
                src={verifiedIcon}
                height={24}
                width={24}
                alt="verified icon"
              />
            )}
          </div>
          <div className="welcome-asset">
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
                    m: 0,
                  },
                }}
              />
            </span>

            <span className="john">
              <p>{fullname}</p>
            </span>
            <span
              className="bell-notification"
              id=" "
              onClick=" "
              style={{ display: "none" }}
            >
              <i className="fa fa-bell" style={{ fontSize: "22px" }}></i>
            </span>
          </div>
          <div className="menu-button" onClick={openMenuBar}>
            &#9776;
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardNav;
