import { useState, useCallback, useRef } from "react";

export const isEmail = str => {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(
    str
  );
};

export const isPassword = password => {
  if (password.length < 8) return "Weak";

  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /[0-9]/.test(password);
  const hasSymbols = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/\-|=]/.test(password);

  const mixedCharactersCount = [
    hasUpperCase,
    hasLowerCase,
    hasNumbers,
    hasSymbols
  ].filter(Boolean).length;

  if (mixedCharactersCount === 4) return "Strong";
  else if (mixedCharactersCount >= 2) return "Medium";
  else return "Weak";
};

export const isObject = obj =>
  obj &&
  (typeof obj.toString === "function"
    ? obj.toString() === "[object Object]"
    : typeof obj === "object" && obj.length === undefined);

export const isNumber = (value, type = "whole") => {
  return /^[0-9]+$/.test(value);
};

const useForm = (config = {}) => {
  const { required, placeholders = {}, rules, serializeData } = config;

  const [errors, setErrors] = useState({});
  const [formData, setFormdata] = useState(placeholders);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const stateRef = useRef({ placeholders: placeholders || {} });

  const handleChange = useCallback(
    (e, validator) => {
      const node = e.currentTarget || e.target;
      const { type, name: keyName, value } = node;

      let errMap = {};

      const addError = err =>
        setErrors(errors => {
          if (err && err !== "err") errors[keyName] = err;
          return {
            ...errors,
            ...errMap
          };
        });

      const withValidator = typeof validator === "function";

      setFormdata((formData = stateRef.current.placeholders) => {
        let err;

        const props = {
          value,
          keyName,
          type,
          e,
          setErrors,
          prevData: { ...formData }
        };

        if (value) {
          if (withValidator) err = validator(props);
          else
            switch ((rules && rules[keyName]?.type) || type || keyName) {
              case "email":
                if (!isEmail(value)) err = "Invalid email address";
                break;
              case "password":
                if (keyName === "confirmPassword") {
                  if (value !== formData.password) err = "Password don't match";
                } else {
                  const status = isPassword(value);

                  const alt = formData.confirmPassword;

                  if (status !== "Strong") err = status;

                  if (alt && value !== alt) {
                    err = "err";
                    errMap.confirmPassword = "Password don't match";
                  } else errMap.confirmPassword = true;
                }
                break;
              default:
                break;
            }
        } else if (required && (!!required[keyName] === true ? true : false))
          err =
            required && typeof required[keyName] === "string"
              ? required[keyName]
              : `Your ${keyName} is required`;

        if (err) addError(err);
        else
          setErrors(errors => {
            delete errors[keyName];
            for (const key in errMap) {
              delete errors[key];
            }
            return {
              ...errors
            };
          });

        formData = {
          ...formData,
          [keyName]: value
        };

        if (serializeData) formData = serializeData(formData, props);

        return formData;
      });
    },
    [required, rules, serializeData]
  );

  const handleSubmit = useCallback(
    (e, config = {}) => {
      e && e.preventDefault();

      const { disableIsSubmitting = false } = config;

      const data = { ...formData };

      let withErr;
      console.log(required, formData, errors, "required...formData...errors");
 
      if (required) {
        if (isObject(required)) {
          for (const key in required) {
            const v = required[key];

            if (v && !data[key]) {
              withErr = true;

              setErrors(errors => ({
                ...errors,
                [key]: typeof v === "string" ? v : `Your ${key} is required`
              }));
            }
          }
        } else {
          withErr = true;
          setErrors(errors => ({ ...errors, all: "All field is required" }));
        }
      }

      withErr = withErr || !!Object.keys(errors).length;

      if (!disableIsSubmitting && !withErr) {
        delete data.confirmPassword;

        serializeData && serializeData(data, { setErrors, isSubmitting: true });

        setIsSubmitting(true);
      }
      console.log(errors, withErr, "...post handle submit");
      return { formData: data, withErr, errors, setIsSubmitting };
    },
    [formData, errors, required, serializeData]
  );

  const resetForm = useCallback(
    (
      formData = stateRef.current.formData,
      config = { errors: {}, isSubmitting: false }
    ) => {
      config.errors && setErrors(config.errors);

      setIsSubmitting(!!config.isSubmitting);

      if (isObject(formData)) setFormdata(formData);
      else if (!formData) setFormdata(stateRef.current.placeholders);
    },
    []
  );

  return {
    formData,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    resetForm,
    setErrors,
    setFormdata,
    setIsSubmitting
  };
};

export default useForm;
