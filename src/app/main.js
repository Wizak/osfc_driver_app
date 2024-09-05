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

const AppMain = () => {
    const { colorScheme, colorTheme } = useTheme();
    const userDeviceLocales = useLocales();

    I18n.locale =
        Locales[userDeviceLocales[userDeviceLocales.length - 1].languageCode] ||
        Locales.en;

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
                            style={colorScheme}
                            translucent={true}
                        />
                    </PaperProvider>
                </SafeAreaProvider>
            </AuthProvider>
        </StoreProvider>
    );
};

export default AppMain;
