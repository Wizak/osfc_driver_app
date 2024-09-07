import React, { memo, useState, useRef, useEffect, useCallback } from 'react';

import { SafeAreaView, StyleSheet, View } from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import { OtpInput } from 'react-native-otp-entry';
import { useAlerts } from 'react-native-paper-alerts';
import { HelperText, Text } from 'react-native-paper';

import { useLocales } from 'expo-localization';

import Button from '../../components/Button';
import I18n from '../../translation';

import { ColorScheme } from '../../constants/enums';
import { httpClient } from '../../httpClient';
import { OSFC_API_URL } from '../../constants/constants';
import { useAuth } from '../../contexts/auth';
import { useTheme } from '../../hooks';

const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
        2,
        '0'
    )}`;
};

const initialTimer = 60;

const PhoneLogin = () => {
    const userDeviceLocales = useLocales();
    const phoneInput = useRef(null);
    const otpInput = useRef(null);
    const { colorScheme } = useTheme();
    const { signIn, getState } = useAuth();
    const { error } = getState();
    const alerts = useAlerts();
    const { colorTheme } = useTheme();

    const [phone, setPhone] = useState('');
    const [isOTPReading, setIsOTPReading] = useState(false);
    const [timer, setTimer] = useState(null);
    const [countryCode, setCountryCode] = useState(
        userDeviceLocales[userDeviceLocales.length - 1].regionCode
    );
    const [cellingCode, setCellingCode] = useState('');

    useEffect(() => {
        if (isOTPReading) {
            if (timer === null) {
                setTimer(initialTimer);
            }
        } else {
            setTimer(null);
        }
    }, [isOTPReading]);

    useEffect(() => {
        if (timer > 0) {
            const intervalId = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
            return () => clearInterval(intervalId);
        }
    }, [timer]);

    useEffect(() => {
        error && alerts.alert('Unexpected Error', error);
    }, [error]);

    const fetchSendPhoneVerification = useCallback(async () => {
        const uri = `${OSFC_API_URL}/phone-code-verification`;
        const body = { phone: cellingCode + phone };

        await httpClient(uri, {
            method: 'POST',
            body: JSON.stringify(body),
        })
            .then((res) => {
                setIsOTPReading(true);
            })
            .catch((e) => {
                setIsOTPReading(false);
                alerts.alert(
                    I18n.t('app.phone_login.error.verification_error'),
                    e.message
                );
            });
    }, [OSFC_API_URL, phone, cellingCode, httpClient]);

    const fetchPhoneLogin = useCallback(
        async (inputCode) => {
            const body = {
                phone: cellingCode + phone,
                code: inputCode,
            };
            await signIn(body);
        },
        [phone, cellingCode, signIn]
    );

    const handleOnSend = useCallback(async () => {
        const checkValid = phoneInput.current?.isValidNumber(phone);
        if (!checkValid) {
            alerts.alert(
                I18n.t('app.error.warning'),
                I18n.t('app.error.invalid_phone_number')
            );
        } else {
            await fetchSendPhoneVerification();
        }
    }, [phoneInput.current, phone, fetchSendPhoneVerification]);

    const handleOnCodeFilled = async (code) => {
        await fetchPhoneLogin(code);
    };

    const handleOnResend = useCallback(async () => {
        setTimer(initialTimer);
        otpInput.current?.clear();
        await fetchSendPhoneVerification();
    }, [initialTimer, otpInput.current, fetchSendPhoneVerification]);

    const handleOnBackToPhone = () => {
        setTimer(null);
        setIsOTPReading(false);
    };

    const handleOnChangeFormattedText = () => {
        setCountryCode(phoneInput.current?.getCountryCode() || '');
        setCellingCode(phoneInput.current?.getCallingCode() || '');
    };

    return (
        <SafeAreaView>
            {!isOTPReading ? (
                <View style={styles.container}>
                    <Text style={styles.subtitle}>
                        {I18n.t('app.phone_login.text.phone_login_title')}
                    </Text>
                    <PhoneInput
                        ref={phoneInput}
                        defaultValue={phone}
                        defaultCode={countryCode}
                        layout="first"
                        onChangeText={setPhone}
                        onChangeFormattedText={handleOnChangeFormattedText}
                        withDarkTheme={colorScheme == ColorScheme.dark}
                        placeholder=" "
                        withShadow
                        autoFocus
                        textInputProps={{
                            selectionColor:
                                styles.phone.selectionColor(colorTheme),
                            onCahnged: (value) => value.replace(/[^0-9]/g, ''),
                            maxLength: 11,
                        }}
                        {...styles.phoneTheme(colorTheme)}
                    />
                    <Button
                        style={styles.button}
                        mode="contained"
                        onPress={handleOnSend}
                    >
                        {I18n.t('app.buttons.send')}
                    </Button>
                </View>
            ) : (
                <View style={styles.container}>
                    <Text style={styles.subtitle}>
                        {I18n.t('app.phone_login.text.otp_title')}
                    </Text>
                    <OtpInput
                        ref={otpInput}
                        numberOfDigits={4}
                        type="numeric"
                        focusColor="green"
                        focusStickBlinkingDuration={1000}
                        onFilled={handleOnCodeFilled}
                        textInputProps={{
                            accessibilityLabel: 'One-Time Password',
                        }}
                        theme={styles.otpTheme(colorTheme)}
                    />
                    {timer > 0 ? (
                        <HelperText type="info" visible>
                            {I18n.t(
                                'app.phone_login.fields.verification_code.helper_text.countdown_on'
                            )}{' '}
                            {formatTime(timer)}
                        </HelperText>
                    ) : (
                        <HelperText type="info" visible>
                            {I18n.t(
                                'app.phone_login.fields.verification_code.helper_text.countdown_off'
                            )}{' '}
                            <Text
                                style={{
                                    color: colorTheme.colors.primary,
                                    textDecorationLine: 'underline',
                                }}
                                onPress={handleOnResend}
                            >
                                {I18n.t('app.buttons.resend')}
                            </Text>
                        </HelperText>
                    )}
                    <Button
                        style={styles.button}
                        onPress={handleOnBackToPhone}
                        mode="contained"
                        disabled={!!timer}
                    >
                        {I18n.t('app.phone_login.buttons.back_to_phone')}
                    </Button>
                </View>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    otpTheme: (theme) => ({
        pinCodeTextStyle: {
            color: theme.colors.primary,
        },
    }),
    phoneTheme: (theme) => ({
        flagButtonStyle: {
            backgroundColor: theme.colors.secondary,
            borderTopLeftRadius: 20,
            borderBottomLeftRadius: 20,
        },
        textContainerStyle: {
            backgroundColor: theme.colors.onSecondaryContainer,
            borderTopRightRadius: 20,
            borderBottomRightRadius: 20,
        },
        containerStyle: {
            backgroundColor: 'transparent',
        },
        codeTextStyle: {
            color: theme.colors.secondaryContainer,
            fontWeight: 900,
        },
        textInputStyle: {
            color: theme.colors.onSecondary,
        },
    }),
    phone: {
        selectionColor: (theme) => theme.colors.secondaryContainer,
    },
    button: {
        marginBottom: 10,
        marginTop: 50,
    },
    subtitle: {
        fontSize: 20,
        fontWeight: 700,
        marginBottom: 30,
        color: '#666',
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
    },
});

export default memo(PhoneLogin);
