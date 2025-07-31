import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#8D5524",
      light: "#42a5f5",
      dark: "#1565c0",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#D9D9D9",
      light: "#ba68c8",
      dark: "#7b1fa2",
      contrastText: "#000000",
    },
    error: {
      main: "#d32f2f",
      light: "#ef5350",
      dark: "#c62828",
    },
    warning: {
      main: "#ed6c02",
      light: "#ff9800",
      dark: "#e65100",
    },
    info: {
      main: "#0288d1",
      light: "#03a9f4",
      dark: "#01579b",
    },
    success: {
      main: "#2e7d32",
      light: "#4caf50",
      dark: "#1b5e20",
    },
    background: {
      default: "#f5f5f5",
      paper: "#ffffff",
    },
    text: {
      primary: "rgba(0, 0, 0, 0.87)",
      secondary: "rgba(0, 0, 0, 0.6)",
      disabled: "rgba(0, 0, 0, 0.38)",
    },
  },
  typography: {
    fontFamily: '"Open Sans", sans-serif',
    h1: {
      fontSize: "2.5rem",
      fontWeight: 700,
      lineHeight: 1.2,
      fontFamily: '"Open Sans", sans-serif',
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 700,
      lineHeight: 1.2,
      fontFamily: '"Open Sans", sans-serif',
    },
    h3: {
      fontSize: "1.75rem",
      fontWeight: 600,
      lineHeight: 1.2,
      fontFamily: '"Open Sans", sans-serif',
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 600,
      lineHeight: 1.2,
      fontFamily: '"Open Sans", sans-serif',
    },
    h5: {
      fontSize: "1.25rem",
      fontWeight: 600,
      lineHeight: 1.2,
      fontFamily: '"Open Sans", sans-serif',
    },
    h6: {
      fontSize: "1rem",
      fontWeight: 600,
      lineHeight: 1.2,
      fontFamily: '"Open Sans", sans-serif',
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.5,
      fontFamily: '"Open Sans", sans-serif',
    },
    body2: {
      fontSize: "0.875rem",
      lineHeight: 1.5,
      fontFamily: '"Open Sans", sans-serif',
    },
    button: {
      textTransform: "none",
      fontWeight: 500,
      fontFamily: '"Open Sans", sans-serif',
    },
  },
  shape: {
    borderRadius: 8,
  },
  shadows: [
    "none",
    "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
    "0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)",
    ...createTheme().shadows.slice(3),
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: "8px 16px",
          transition: "all 0.3s ease",
          "&:hover": {
            backgroundColor: "rgba(141, 85, 36, 0.04)",
          },
        },
        contained: {
          boxShadow: "none",
          "&:hover": {
            boxShadow: "none",
          },
        },
        containedPrimary: {
          backgroundColor: "#8D5524",
          "&:hover": {
            backgroundColor: "#6B3E1E",
          },
        },
        containedSecondary: {
          backgroundColor: "#D9D9D9",
          "&:hover": {
            backgroundColor: "#BDBDBD",
          },
        },
        containedError: {
          "&:hover": {
            backgroundColor: "#b71c1c",
          },
        },
        outlined: {
          borderColor: "#8D5524",
          color: "#8D5524",
          "&:hover": {
            backgroundColor: "rgba(141, 85, 36, 0.04)",
            borderColor: "#6B3E1E",
          },
        },
        text: {
          "&:hover": {
            backgroundColor: "rgba(141, 85, 36, 0.04)",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.05)",
          borderRadius: 8,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          marginBottom: 16,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 0,
        },
        notchedOutline: {
          borderRadius: 0,
        },
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          "&:before, &:after": {
            borderRadius: 0,
          },
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          borderRadius: 0,
        },
      },
    },
  },
});

export default theme;
