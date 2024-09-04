import React, { memo } from 'react';
import { StyleSheet } from 'react-native';

import Background from '../../components/Background';
import Logo from '../../components/Logo';
import Header from '../../components/Header';

// import { OtpInput } from 'react-native-otp-entry';
import PhoneLoginLayout from './PhoneLoginLayout';

const SignInLayout = () => <PhoneLoginLayout />;
const LoginScreen = () => {
    return (
        <Background extraStyle={styles.container}>
            <Logo />
            <Header>OSFC Employee App</Header>
            <SignInLayout />
            {/* <OtpInput
                numberOfDigits={4}
                focusColor="green"
                focusStickBlinkingDuration={500}
                onTextChange={(text) => console.log(text)}
                onFilled={(text) => console.log(`OTP is ${text}`)}
                textInputProps={{
                    accessibilityLabel: 'One-Time Password',
                }}
            /> */}
        </Background>
    );
};

const styles = StyleSheet.create({
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
