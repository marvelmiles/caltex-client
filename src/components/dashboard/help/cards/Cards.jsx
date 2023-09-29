import React from 'react';
import PropsTypes from "prop-types";
import styles from './Cards.module.scss';

const Cards = (props) => {
 const { header, text, } = props;
  return (
    <div>
      <ul className={styles.cards_ul}>
       <li>{header}</li>
       <li>{text}</li>
       
      </ul>
    </div>
  )
}

Cards.propTypes = {
  header: PropsTypes.string,
  text: PropsTypes.string,
  
};

export default Cards
