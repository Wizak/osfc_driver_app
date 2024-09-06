import 'react-native-gesture-handler';

import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PaperProvider } from 'react-native-paper';
import { AlertsProvider } from 'react-native-paper-alerts';

import { StatusBar } from 'expo-status-bar';

import AuthProvider from '../contexts/auth';
import StoreProvider from '../contexts/store';

import AppScreen from './screen';
import I18n from '../translation';

import { useTheme } from '../hooks';
import { Locales } from '../constants/enums';
import { useLocales } from 'expo-localization';
import { ColorScheme } from '../constants/enums';

const AppMain = () => {
    const { colorScheme, colorTheme } = useTheme();
    const userDeviceLocales = useLocales();
    const [statusBarStyle, setStatusBarStyle] = React.useState();

    I18n.locale =
        Locales[userDeviceLocales[userDeviceLocales.length - 1].languageCode] ||
        Locales.en;

    React.useEffect(() => {
        setStatusBarStyle(
            ColorScheme[colorScheme] == ColorScheme.light
                ? ColorScheme.dark
                : ColorScheme.light
        );
    }, [colorScheme]);

    return (
        <StoreProvider>
            <AuthProvider>
                <SafeAreaProvider>
                    <PaperProvider theme={colorTheme}>
                        <NavigationContainer theme={colorTheme}>
                            <AlertsProvider>
                                <AppScreen />
                            </AlertsProvider>
                        </NavigationContainer>
                        <StatusBar
                            hidden={false}
                            style={statusBarStyle}
                            translucent={true}
                        />
                    </PaperProvider>
                </SafeAreaProvider>
            </AuthProvider>
        </StoreProvider>
    );
};

export default AppMain;
