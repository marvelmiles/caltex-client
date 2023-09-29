import { createTheme as createMuiTheme } from "@mui/material";

export const fontFamily = "'Poppins', sans-serif";

export const createTheme = (theme = "light") =>
  createMuiTheme({
    palette: {
      primary: {
        main: "rgba(18, 14, 251, 1)"
      },
      secondary: {
        main: "#140460"
      },
      grey: {
        main: "rgba(18, 14, 251, 0.05)"
      },
      action: { border: "rgba(30, 30, 30, 1)" },
      text: { primary: "rgba(30, 30, 30, 1)" },
      common: {
        link: "rgba(20, 4, 96, 1)"
      }
    },
    typography: {
      allVariants: {
        fontFamily,
        fontSize: "12px"
      },
      h1: {
        fontSize: 40
      },
      h2: {
        fontSize: 32
      },
      h3: {
        fontSize: 24
      },
      h4: {
        fontSize: 20
      },
      h5: {
        fontSize: 16
      },
      h6: {
        fontSize: 14
      }
    },
    components: {
      MuiStack: {
        styleOverrides: {
          root: {
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
            gap: "8px"
          }
        }
      },
      MuiIconButton: {
        styleOverrides: {
          root: ({
            theme: {
              palette: { background, action, text }
            }
          }) => ({
            width: 35,
            height: 35,
            minHeight: 0,
            minWidth: 0,
            svg: {
              fontSize: ".75em"
            }
          })
        }
      }
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 576,
        md: 768,
        lg: 1024,
        xl: 1200,
        xxl: 1536,
        s200: 200,
        s280: 280,
        s320: 320,
        s640: 640,
        xxxl: 1595,
        s1200: 1200,
        s1400: 1400
      }
    }
  });
