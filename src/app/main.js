import 'react-native-gesture-handler';

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PaperProvider } from 'react-native-paper';

import { StatusBar } from 'expo-status-bar';

import { useTheme } from '../hooks';
import AppScreen from './screen';

const AppMain = () => {
    const { colorScheme, colorTheme } = useTheme();

    return (
        <SafeAreaProvider>
            <PaperProvider theme={colorTheme}>
                <NavigationContainer theme={colorTheme}>
                    <AppScreen />
                </NavigationContainer>
                <StatusBar
                    hidden={false}
                    style={colorScheme}
                    translucent={true}
                />
            </PaperProvider>
        </SafeAreaProvider>
    );
};

export default AppMain;
