import React, { useState } from "react";
import PropTypes from "prop-types";
import IconButton from "@mui/material/IconButton";
import searchIcon from "../svgs/search-icon.svg";
import CustomInput from "../components/CustomInput";

const SearchInput = ({ onSearch }) => {
  const [q, setQ] = useState("");

  const handleChange = e => setQ(e.currentTarget.value);

  return (
    <CustomInput
      onChange={handleChange}
      value={q}
      placeholder="Search"
      sx={{
        "& .custom-input-container .custom-input-wrapper input": {
          padding: "0 !important",
          paddingRight: "12px !important"
        },
        "& .custom-input-container .adornment": {
          marginLeft: "5px"
        },
        maxWidth: "250px",
        alignSelf: "center"
      }}
      startAdornment={
        <IconButton onClick={onSearch}>
          <img src={searchIcon} />
        </IconButton>
      }
    />
  );
};

SearchInput.propTypes = {};

export default SearchInput;
