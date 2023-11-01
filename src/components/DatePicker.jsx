import React from "react";
import PropTypes from "prop-types";
import { format, eachYearOfInterval } from "date-fns";
import Stack from "@mui/material/Stack";

const DatePicker = ({
  namePrefix = "",
  disabled,
  startYear,
  endYear,
  groupName = "duration",
  ...props
}) => {
  const today = new Date();

  startYear = startYear || today.getFullYear();
  endYear = endYear || today.getFullYear() + 1000;

  const years = eachYearOfInterval({
    start: new Date(startYear, 0, 1),
    end: new Date(endYear, 11, 31)
  });

  const yearList = years.map(year => format(year, "yyyy"));

  const dayName = namePrefix + "Day";

  const mthName = namePrefix + "Mth";

  const yearName = namePrefix + "Year";

  return (
    <Stack sx={{ width: "60%" }}>
      <select
        className="custom-date"
        value={props.day}
        name={dayName}
        data-name={groupName}
        onChange={props.handleChange}
        disabled={disabled}
      >
        {Array.from(new Array(31)).map((mth, i) => (
          <option key={i} value={i + 1}>
            {`${i + 1}`.padStart(2, "0")}
          </option>
        ))}
      </select>
      <select
        className="custom-date"
        name={mthName}
        value={props.mth}
        data-name={groupName}
        onChange={e => {
          let val = Number(e.target.value);

          const yr = today.getFullYear();

          if (props.year === yr) {
            const mth = today.getMonth();
            const bool = val < mth;

            if (bool) val = mth;
          }

          e.target.value = val;

          props.handleChange(e);
        }}
        disabled={disabled}
      >
        {Array.from(new Array(12)).map((_, i) => {
          return (
            <option key={i} value={i}>
              {`${i + 1}`.padStart(2, "0")}
            </option>
          );
        })}
      </select>
      <select
        className="custom-date"
        name={yearName}
        value={props.year}
        onChange={props.handleChange}
        disabled={disabled}
        data-name={groupName}
      >
        {yearList.map(y => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </select>
    </Stack>
  );
};

DatePicker.propTypes = {};

export default DatePicker;
