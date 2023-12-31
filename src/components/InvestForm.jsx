import React, { useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import useForm from "../hooks/useForm";
import DatePicker from "./DatePicker";
import { setFutureDate, getDaysDifference } from "../utils";
import http from "../api/http";
import { useCtx } from "../context";
import Button from "@mui/material/Button";
import { createUTCDate } from "../utils/serializers";
import { formatToDecimalPlace } from "../utils/normalizers";

const InvestForm = ({
  plan = "starter",
  tradeType = "forex",
  maxAmount = 10000,
  minAmount = 100,
  roiPct = 2.5,
  duration: defaultDuration = 7
}) => {
  const placeholders = useMemo(() => {
    const endDate = setFutureDate(defaultDuration);

    const startDate = new Date();
    return {
      tradeType,
      plan,
      endYear: endDate.getFullYear(),
      endMth: endDate.getMonth(),
      endDay: endDate.getDate(),
      startDay: startDate.getDate(),
      startMth: startDate.getMonth(),
      startYear: startDate.getFullYear(),
      duration: defaultDuration
    };
  }, [tradeType, plan, defaultDuration]);

  const { setSnackBar } = useCtx();

  const serializeData = useCallback(
    (formData, props = {}) => {
      const {
        keyName,
        setErrors,
        dataset = {},
        prevData,
        isSubmitting
      } = props;

      const { name: dataName } = dataset;

      let { endYear, endMth, endDay, startYear, startMth, startDay } = formData;

      endYear = Number(endYear);
      endMth = Number(endMth);
      endDay = Number(endDay);

      startYear = Number(startYear);
      startMth = Number(startMth);
      startDay = Number(startDay);

      const setROI = (inputValue = formData.amount) => {
        if (inputValue) {
          inputValue = Number(inputValue);
          const interest = inputValue * (roiPct / 100);
          const roi = interest * formData.duration;
          formData.amount = Number(formData.amount);
          formData.roi = Number(roi);
        }
      };

      const setTimeframe = () => {
        const today = new Date();

        let changed = false;

        if (startYear > endYear) {
          changed = true;
          startYear = today.getFullYear();
        }

        if (startMth > endMth) {
          changed = true;
          startMth = today.getMonth();
        }

        if (!changed) {
          const day = today.getDate();

          if (startDay < day) startDay = day;
        }

        if (endYear === startYear && endMth === startMth && endDay < startDay)
          endDay = setFutureDate(defaultDuration).getDate();

        const startDate = createUTCDate(startYear, startMth, startDay);

        const endDate = createUTCDate(endYear, endMth, endDay);

        const duration = getDaysDifference(endDate, startDate);

        if (duration >= 0) {
          formData.startDate = startDate;
          formData.endDate = endDate;
          formData.duration = duration;

          formData.startYear = startYear;
          formData.startMth = startMth;
          formData.startDay = startDay;

          formData.endDay = endDay;
        }
      };

      if (isSubmitting || dataName === "duration") {
        setTimeframe();
        setROI();
      }
      else if (keyName === "amount") {
        const amt = formData[keyName];

        const inputValue = Number(amt);

        const err = "Input value is invalid.";

        if (inputValue > -1) {
          if (!inputValue) {
            formData.roi = "";
            formData.amount = "";
          } else if (minAmount < inputValue && inputValue > maxAmount)
            formData.amount = prevData.amount;

          setROI();

          setErrors(errors => {
            delete errors.amount;
            return {
              ...errors
            };
          });
        } else {
          setErrors(errors => ({ ...errors, amount: err }));
          setSnackBar(err);
        }
      }

      return formData;
    },
    [setSnackBar, maxAmount, roiPct, defaultDuration, minAmount]
  );

  const {
    formData,
    isSubmitting,
    handleChange,
    handleSubmit,
    resetForm
  } = useForm({
    serializeData,
    required: { amount: "Amount is required" },
    placeholders
  });

  const onSubmit = async e => {
    try {
      const { withErr, formData } = handleSubmit(e);

      if (withErr) {
        resetForm(true);
        return setSnackBar("Investment details are invalid!");
      }

      if (formData.amount < minAmount) {
        resetForm(true);
        return setSnackBar(
          `Amount must be at least ${minAmount.toLocaleString()} or higher!`
        );
      }

      if (formData.duration < 0) {
        resetForm(true);

        return setSnackBar(
          "Investment date timeframe is invalid. Expect a future time date."
        );
      }
      const response = await http.post(`/investments/invest`, formData);

      if (!response.success) {
        throw response;
      }

      resetForm();

      setSnackBar({
        message: response.message,
        severity: "success"
      });
    } catch (error) {
      console.log("Error submitting investment details:", error);
      setSnackBar(error.message);

      resetForm(true);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div class="invest-text">
        <h3>Investment for {plan} Plan</h3>
      </div>
      <div class="input-amount">
        <span class="input-des">Input Amount</span>
        <input
          type="number"
          id="amount"
          name="amount"
          readOnly={isSubmitting}
          value={formData.amount || ""}
          onChange={handleChange}
          placeholder={`$${minAmount.toLocaleString()} - ${
            maxAmount === Infinity
              ? "Unlimited"
              : `$${maxAmount.toLocaleString()}`
          }`}
        />
      </div>
      <br />

      <div class="input-amount">
        <span class="input-des">Return On Investment</span>
        <input
          type="text"
          name="roi"
          id="roi"
          value={
            formData.roi ? "$" + formatToDecimalPlace(formData.roi, true) : ""
          }
          readOnly
          placeholder={roiPct + "% on investment"}
        />
      </div>
      <div class="input-amount">
        <span class="input-des">Net Gain</span>
        <input
          type="text"
          name="fund"
          id="roi"
          value={
            "$" +
            formatToDecimalPlace(
              formData.amount ? formData.amount + formData.roi : 0,
              true
            )
          }
          readOnly
          placeholder={roiPct + "% on investment"}
        />
      </div>
      <br />

      <div class="input-amount">
        <span class="input-des">Date Of Investment</span>

        <DatePicker
          key="start"
          namePrefix="start"
          year={formData.startYear}
          day={formData.startDay}
          mth={formData.startMth}
          handleChange={handleChange}
          disabled={isSubmitting}
        />
      </div>
      <br />

      <div class="input-amount">
        <span class="input-des">Duration Of Investment</span>
        <input
          type="text"
          id="doi"
          name="duration"
          placeholder="7 DAYS"
          value={`${formData.duration} Days Investment`}
          readOnly
        />
      </div>
      <br />

      <div class="input-amount">
        <span class="input-des">Investment Last till</span>
        <DatePicker
          namePrefix="end"
          key="end"
          year={formData.endYear}
          day={formData.endDay}
          mth={formData.endMth}
          handleChange={handleChange}
          disabled={isSubmitting}
        />
      </div>
      <br />

      <div class="invest-starter-btn">
        <Button
          variant="contained"
          type="submit"
          sx={{ p: "12px", px: 5 }}
          disabled={isSubmitting}
        >
          Invest
        </Button>
      </div>
    </form>
  );
};

InvestForm.propTypes = {};

export default InvestForm;
