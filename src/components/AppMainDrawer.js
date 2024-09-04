import React, { memo } from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { Drawer as PaperDrawer } from 'react-native-paper';

import Constants from 'expo-constants';

const MenuDrawerContent = (props) => {
    const [activeScreen, setActiveScreen] = React.useState('Home');

    return (
        <PaperDrawer.Section title="Menu" style={styles.menu}>
            <PaperDrawer.Item
                label="Home"
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
