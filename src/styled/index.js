import { styled, css } from "@mui/system";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import { fontFamily } from "./theme";
import Switch, { SwitchProps } from "@mui/material/Switch";

export const INPUT_AUTOFILL_SELECTOR = `
            input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
textarea:-webkit-autofill,
textarea:-webkit-autofill:hover,
textarea:-webkit-autofill:focus,
select:-webkit-autofill,
select:-webkit-autofill:hover,
select:-webkit-autofill:focus 
              `;

export const StyledLink = styled(Link)`
  ${({ theme }) => {
    return ` 
    color:${theme.palette.primary.dark};
    &:hover {
        text-decoration:underline;
    };
    `;
  }}
`;

export const styledLinkProp = {
  color: "primary.dark",
  cursor: "pointer",
  "&:hover": {
    textDecoration: "underline"
  }
};

export const StyledOverlay = styled("div")`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 500;
  width: 100%;
  height: 100%;
  border-radius: inherit;
  background-color: rgba(0, 0, 0, 0.4);
`;

export const StyledFormGroup = styled(Box, {
  shouldForwardProp: prop => {
    switch (prop) {
      case "noAdornment":
      case "type":
      case "error":
      case "withBorderErr":
        return false;
      default:
        return true;
    }
  }
})(
  ({
    theme: { palette },
    noAdornment,
    type = "text",
    error = "",
    withBorderErr = true
  }) => {
    return `
      margin: 16px 0px;
      width: 100%;
      min-height:40px;
      position:relative;

      .custom-input-container {
        position:relative;
        width: 100%;
        border-radius: 5px;
        border: 1px solid currentColor;
        min-height:inherit;
        height:inherit;
        border-color: ${
          (!withBorderErr && type === "password" && error !== "Weak") || !error
            ? palette.action.border
            : palette.error.main
        };

        color: text.primary;
        display: flex;
        justify-content: center; 

        .custom-input-wrapper { 
          position:relative;
          width: 100%;
          border-color: transparent;
          border-top-left-radius: inherit;
          border-bottom-left-radius: inherit;
          border-radius: ${noAdornment ? "inherit" : ""};
          flex:1;
          min-height:inherit;
          height:inherit;

          input:not(.StripeElement), .StripeElement {  
          position:absolute;
          top:0;
          left:0;
          min-height:100%;
          width:100%;
          height:100%; 
          padding:12px;
          padding-left: 16px; 
          padding-right: ${noAdornment ? "16px" : "0"};
          outline: 0;
          box-shadow: none;
          border: inherit;
          background:transparent; 
          border-radius:inherit;
          border-color:transparent;
          
          &.loading {
            z-index:10 !important;
          };
          }
        }

        & .adornment {
          min-width: 50px;
          margin-left: 16px;
          align-self:center;

          & svg {
            width: 1.5rem;
            height: 1.5rem;
          }
        }
      }

      & label {
        display: block;
        font-size: 1rem;
        font-weight: 400;
        font-family: ${fontFamily};
        line-height: 19.5px;
        margin-bottom: 16px;
      }
    `;
  }
);

export const StyledAntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: "flex",
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 15
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(9px)"
    }
  },
  "& .MuiSwitch-switchBase": {
    padding: 2,
    "&.Mui-checked": {
      transform: "translateX(12px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1
      }
    }
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(["width"], {
      duration: 200
    })
  },
  "& .MuiSwitch-track": {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(255,255,255,.35)"
        : "rgba(0,0,0,.25)",
    boxSizing: "border-box"
  }
}));
