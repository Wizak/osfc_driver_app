import {
    MD3DarkTheme,
    MD3LightTheme,
    adaptNavigationTheme,
} from 'react-native-paper';

import {
    DarkTheme as NavigationDarkTheme,
    DefaultTheme as NavigationLightTheme,
} from '@react-navigation/native';

import merge from 'deepmerge';
import { COLORS } from './colors';

const customDarkTheme = {
    ...MD3DarkTheme,
    colors: COLORS.dark,
};
const customLightTheme = {
    ...MD3LightTheme,
    colors: COLORS.light,
};

const { LightTheme, DarkTheme } = adaptNavigationTheme({
    reactNavigationLight: NavigationLightTheme,
    reactNavigationDark: NavigationDarkTheme,
});

const CombinedLightTheme = merge(LightTheme, customLightTheme);
const CombinedDarkTheme = merge(DarkTheme, customDarkTheme);

export { CombinedLightTheme, CombinedDarkTheme };
