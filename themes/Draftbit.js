import { systemWeights } from 'react-native-typography';
export default {
  disabledOpacity: 0.5,
  roundness: 6,
  colors: {
    Background: 'rgb(255, 255, 255)',
    Divider: 'rgba(234, 237, 242, 1)',
    Error: 'rgb(238, 29, 0)',
    Light: 'rgb(229, 229, 229)',
    'Light Inverse': 'rgb(232, 248, 239)',
    LightError: 'rgb(255, 136, 136)',
    Medium: 'rgba(70, 78, 88, 1)',
    'Medium Inverse': 'rgba(26, 182, 92, 0.25)',
    Primary: 'rgb(26, 182, 92)',
    Secondary: 'rgb(0, 0, 0)',
    Strong: 'rgba(18, 20, 44, 1)',
    'Strong Inverse': 'rgba(255, 255, 255, 1)',
    Surface: 'rgba(255, 255, 255, 1)',
    background: 'rgb(255, 255, 255)',
    divider: 'rgba(234, 237, 242, 1)',
    error: 'rgb(238, 29, 0)',
    light: 'rgb(229, 229, 229)',
    lightError: 'rgb(255, 136, 136)',
    lightInverse: 'rgb(232, 248, 239)',
    medium: 'rgba(70, 78, 88, 1)',
    mediumInverse: 'rgba(26, 182, 92, 0.25)',
    primary: 'rgb(26, 182, 92)',
    secondary: 'rgb(0, 0, 0)',
    strong: 'rgba(18, 20, 44, 1)',
    strongInverse: 'rgba(255, 255, 255, 1)',
    surface: 'rgba(255, 255, 255, 1)',
  },
  typography: {
    body1: {
      ...systemWeights.regular,
      fontSize: 16,
      letterSpacing: 0,
      lineHeight: 26,
    },
    body2: {
      ...systemWeights.regular,
      fontSize: 14,
      letterSpacing: 0,
      lineHeight: 22,
    },
    button: {
      ...systemWeights.bold,
      fontSize: 14,
      letterSpacing: 0,
      lineHeight: 16,
    },
    caption: {
      ...systemWeights.regular,
      fontSize: 12,
      letterSpacing: 0,
      lineHeight: 16,
    },
    headline1: {
      ...systemWeights.bold,
      fontSize: 60,
      letterSpacing: 0,
      lineHeight: 71,
    },
    headline2: {
      ...systemWeights.bold,
      fontSize: 48,
      letterSpacing: 0,
      lineHeight: 58,
    },
    headline3: {
      ...systemWeights.bold,
      fontSize: 34,
      letterSpacing: 0,
      lineHeight: 40,
    },
    headline4: {
      ...systemWeights.bold,
      fontSize: 24,
      letterSpacing: 0,
      lineHeight: 34,
    },
    headline5: {
      ...systemWeights.bold,
      fontSize: 20,
      letterSpacing: 0,
      lineHeight: 26,
    },
    headline6: {
      ...systemWeights.bold,
      fontSize: 16,
      letterSpacing: 0,
      lineHeight: 24,
    },
    overline: {
      ...systemWeights.regular,
      fontSize: 12,
      letterSpacing: 2,
      lineHeight: 16,
    },
    subtitle1: {
      ...systemWeights.regular,
      fontSize: 16,
      letterSpacing: 0,
      lineHeight: 26,
    },
    subtitle2: {
      ...systemWeights.regular,
      fontSize: 14,
      letterSpacing: 0,
      lineHeight: 22,
    },
  },
};
