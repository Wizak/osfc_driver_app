import 'react-native-gesture-handler';

import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PaperProvider } from 'react-native-paper';
import { AlertsProvider } from 'react-native-paper-alerts';

import { StatusBar } from 'expo-status-bar';

import AuthContextProvider from '../contexts/auth';
import AppScreen from './screen';
import I18n from '../translation';

import { useTheme } from '../hooks';
import { Locales } from '../constants/enums';

const AppMain = () => {
    const { colorScheme, colorTheme } = useTheme();

    I18n.locale = Locales.en;

    return (
        <AuthContextProvider>
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
        </AuthContextProvider>
    );
};

export default AppMain;
