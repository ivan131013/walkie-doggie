import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

export const theme = extendTheme({
  config,
  colors: {
    blueish: {
      200: "#9BC2CF",
      300: "#2C8475",
      500: "#589AAF",
      900: "#002637",
    },
    yellowish: {
      400: "#EEE8A9",
    },
    blackish: {
      200: "#002637",
    },
  },
  fonts: {
    main: "Roboto, sans-serif",
    secondary: "Raleway, sans-serif",
  },
  fontSizes: {
    xs: "12px",
    sm: "18px",
    stnd: "1rem",
    md: "20px",
    lg: "24px",
    xl: "36px",
    xxl: "56px",
    "3xl": "84px",
  },
  lineHeights: {
    normal: "120%",
    tall: "150%",
  },
  radii: {
    none: "0",
    sm: "0.125rem",
    base: "0.5rem",
    lg: "1.5rem",
    max: "50%",
  },
  styles: {
    global: {
      body: {
        backgroundSize: "cover",
        fontFamily: "Roboto",
        backgroundColor: "white",
      },
    },
  },

  breakpoints: {
    sm: "744px",
    md: "1280px",
    lg: "1700px",
  },
});
