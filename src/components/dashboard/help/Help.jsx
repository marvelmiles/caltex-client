import React from "react";
import Sidebar from "../Sidebar";
import DashboardNav from "../DashboardNav";
import styles from './Help.module.scss';
import Cards from "./cards/Cards";

const Help = () => {
  return (
    <div>
      <div class="dashboard-container">
        <div class="board">
          <Sidebar />
          <div class="dashboard-content">
            <div class="board-content">
              <DashboardNav />
              <div className={styles.main_cont}>
                <h2>Need Help?</h2>
                <p>
                  Reach out to us through our various support channel and get
                  response immediately
                </p>
                <div className={styles.main_card_cont}>
                  <div>
                    <Cards
                      header="Help Center"
                      text="Find in-depth information about Caltex trading , deposits and withdrawal by reaching out to our help center."
                    />
                    <Cards
                      header="Email"
                      text="Show your concern or issues with us, kindly reach out via support@caltextrader.com and we’ll get back to you within 24 hours. "
                    />
                  </div>
                  <div>
                    <Cards
                      header="Live Chat"
                      text="Incase you can’t find the answers to your worries, chat our support team in live chat. Provide your details for easing tracking."
                    />
                    <Cards
                      header="Phone"
                      text="You might want to speak with our friendly support team, please call the compnay’s line."
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
