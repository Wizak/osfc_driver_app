import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';

import Background from '../../components/Background';
import Logo from '../../components/Logo';
import Header from '../../components/Header';
import I18n from '../../translation';

import PhoneLoginLayout from './PhoneLogin';

const SignInLayout = () => <PhoneLoginLayout />;

const LoginScreen = () => {
    return (
        <Background extraStyle={styles.container}>
            <View style={styles.logo_container}>
                <Logo />
                <Header>{I18n.t('app.root_title')}</Header>
            </View>
            <SignInLayout />
        </Background>
    );
};

const styles = StyleSheet.create({
    logo_container: {
        marginTop: 50,
        marginBottom: 100,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: 'white',
    },
    dropDownPicker: {
        marginTop: 10,
        marginBottom: 20,
    },
    container: {
        padding: 20,
        maxWidth: 340,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default memo(LoginScreen);
