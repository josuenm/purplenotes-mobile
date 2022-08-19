import { extendTheme } from "native-base";

export default extendTheme({
  useSystemColorMode: false,
  initialColorMode: "light",
  fontConfig: {
    Roboto: {
      300: {
        normal: "Roboto_300Light",
      },
      500: {
        normal: "Roboto_500Medium",
      },
      700: {
        normal: "Roboto_700Bold",
      },
    },
  },

  components: {
    Link: {
      baseStyle: () => {
        return { _text: { color: "violet.600" } };
      },
    },
    Text: {
      baseStyle: () => {
        return { fontWeight: 300 };
      },
    },
    Heading: {
      baseStyle: () => {
        return { fontWeight: 700 };
      },
    },
  },

  fonts: {
    heading: "Roboto",
    body: "Roboto",
    mono: "Roboto",
  },
});
