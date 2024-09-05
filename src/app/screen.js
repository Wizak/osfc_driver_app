import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import SecureNavigation from '../controllers/SecureNavigation';
import AppMainDrawerContent from '../components/AppMainDrawer';
import I18n from '../translation';

import { HomeScreen } from '../screens';

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
        options={{ title: I18n.t('app.root_title') }}
    />
);

export default SecuredNavigationAppScreen;
