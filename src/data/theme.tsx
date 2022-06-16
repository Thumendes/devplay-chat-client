import { extendTheme, withDefaultColorScheme } from "@chakra-ui/react";

export const theme = extendTheme(
  {
    colors: {
      secondary: {
        50: "#f7f5fc",
        100: "#f0ebfa",
        200: "#d9ccf2",
        300: "#c2adeb",
        400: "#9470db",
        500: "#6633cc",
        600: "#5c2eb8",
        700: "#4d2699",
        800: "#3d1f7a",
        900: "#321964",
        trans: "#6633cc55",
      },
      primary: {
        50: "#fff7f2",
        100: "#ffefe6",
        200: "#ffd8bf",
        300: "#fec099",
        400: "#fe914d",
        500: "#fd6200",
        600: "#e45800",
        700: "#be4a00",
        800: "#983b00",
        900: "#7c3000",
        trans: "#fd620055",
      },
    },
    fonts: {
      heading: "Roboto, sans-serif",
      body: "Inter, sans-serif",
    },
    components: {
      Input: {
        defaultProps: {
          focusBorderColor: "secondary.500",
        },
      },
      IconButton: {
        defaultProps: {
          focusBorderColor: "secondary.500",
        },
      },
      Button: {
        defaultProps: {
          focusBorderColor: "secondary.500",
        },
      },
    },
  },
  withDefaultColorScheme({ colorScheme: "secondary" })
);
