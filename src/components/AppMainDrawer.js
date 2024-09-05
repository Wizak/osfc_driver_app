import React, { memo } from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { Drawer as PaperDrawer } from 'react-native-paper';

import Constants from 'expo-constants';
import I18n from '../translation';
import LogoutButton from '../components/LogoutButton';

const MenuDrawerContent = (props) => {
    const [activeScreen, setActiveScreen] = React.useState('Home');

    return (
        <PaperDrawer.Section
            title={I18n.t('app.main_menu.title')}
            style={styles.menu}
        >
            <PaperDrawer.Item
                label={I18n.t('app.main_menu.screen.home')}
                active={activeScreen === 'Home'}
                icon="account-box"
                onPress={() => {
                    setActiveScreen('Home');
                    props.navigation.navigate('Home');
                }}
            />
        </PaperDrawer.Section>
    );
};

const AppMainSideMenuContent = (props) => (
    <ScrollView contentContainerStyle={styles.scrollView}>
        <SafeAreaView forceInset={styles.safeArea}>
            <MenuDrawerContent {...props} />
        </SafeAreaView>
        <LogoutButton {...props} />
    </ScrollView>
);

const styles = StyleSheet.create({
    menu: {
        paddingBottom: 10,
        paddingTop: Constants.statusBarHeight,
    },
    menuItem: {
        marginTop: 10,
        marginBottom: 10,
    },
    safeArea: {
        top: 'always',
        horizontal: 'never',
    },
    scrollView: {
        flex: 1,
        paddingTop: 20,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
});

export default memo(AppMainSideMenuContent);
