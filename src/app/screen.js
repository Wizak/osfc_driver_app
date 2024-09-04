import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import SecureNavigation from '../controllers/SecureNavigation';
import AppMainDrawerContent from '../components/AppMainDrawer';

import { HomeScreen } from '../screens';
// import { useStore } from './contexts/store';

const Drawer = createDrawerNavigator();

const AppScreen = () => (
    <Drawer.Navigator
        initialRouteName="Home"
        drawerContent={(props) => <AppMainDrawerContent {...props} />}
        screenOptions={{ unmountOnBlur: true }}
    >
        <Drawer.Screen name="Home" component={HomeScreen} />
    </Drawer.Navigator>
);

const SecuredNavigationAppScreen = () => (
    <SecureNavigation
        component={AppScreen}
        name="AppMain"
        options={{ title: 'OSFC Driver App' }}
    />
);

export default SecuredNavigationAppScreen;
