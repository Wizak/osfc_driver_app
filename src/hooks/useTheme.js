import { useColorScheme } from 'react-native';

import { ColorScheme } from '../constants/enums';
import { CombinedLightTheme, CombinedDarkTheme } from '../constants/themes';

const useTheme = () => {
    const colorScheme = useColorScheme();

    const colorTheme =
        colorScheme === ColorScheme.light
            ? CombinedLightTheme
            : CombinedDarkTheme;

    return { colorScheme, colorTheme };
};

export { useTheme };
