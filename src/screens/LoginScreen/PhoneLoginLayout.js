import React, { useState, useRef, useEffect, useCallback } from 'react';
import { SafeAreaView } from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import { OtpInput } from 'react-native-otp-entry';
import { useAlerts } from 'react-native-paper-alerts';

import Button from '../../components/Button';
import I18n from '../../translation';

import { useTheme } from '../../hooks';
import { ColorScheme } from '../../constants/enums';
import { httpClient } from '../../httpClient';
import { OSFC_API_URL } from '../../constants/constants';
import { useAuth } from '../../contexts/auth';

const PhoneLoginLayout = () => {
    const [phone, setPhone] = useState('');
    const [countryCode, setCountryCode] = useState('');
    const [codeVerification, setCodeVerification] = useState(null);

    const phoneInput = useRef(null);
    const { colorScheme } = useTheme();
    const { signIn, getState } = useAuth();
    const { error } = getState();
    const alerts = useAlerts();

    const fetchSendPhoneVerification = useCallback(async () => {
        const uri = `${OSFC_API_URL}/phone-code-verification`;
        const body = { phone: countryCode + phone };

        await httpClient(uri, {
            method: 'POST',
            body: JSON.stringify(body),
        })
            .then((res) => {
                setCodeVerification(res.json);
            })
            .catch((e) => {
                setCodeVerification(null);
                alerts.alert('Verification Error', e.message);
            });
    }, [OSFC_API_URL, phone, countryCode, httpClient]);

    const fetchPhoneLogin = useCallback(
        async (inputCode) => {
            const body = { phone: phone, code: inputCode };
            await signIn(body);
        },
        [phone, OSFC_API_URL, signIn]
    );

    const handleOnChangeCountry = (payload) => {
        setCountryCode(payload.callingCode[0]);
    };

    const handleOnSend = useCallback(() => {
        const checkValid = phoneInput.current?.isValidNumber(phone);
        if (!checkValid) {
            alerts.alert('Warning', 'Invalid Phone number');
        } else {
            fetchSendPhoneVerification();
        }
    }, [phoneInput, fetchSendPhoneVerification]);

    const handleOnCodeFilled = useCallback(
        async (code) => {
            await fetchPhoneLogin(code);
        },
        [fetchPhoneLogin]
    );

    useEffect(() => {
        error && alerts.alert('Occured Error', error);
    }, [error]);

    return (
        <SafeAreaView>
            {!codeVerification ? (
                <>
                    <PhoneInput
                        ref={phoneInput}
                        defaultValue={phone}
                        defaultCode="DM"
                        layout="first"
                        onChangeText={setPhone}
                        onChangeCountry={handleOnChangeCountry}
                        withDarkTheme={colorScheme == ColorScheme.dark}
                        withShadow
                        autoFocus
                    />
                    <Button mode="contained" onPress={handleOnSend}>
                        {I18n.t('app.phone_verification.send')}
                    </Button>
                </>
            ) : (
                <OtpInput
                    numberOfDigits={4}
                    focusColor="green"
                    focusStickBlinkingDuration={1000}
                    onFilled={handleOnCodeFilled}
                    textInputProps={{
                        accessibilityLabel: 'One-Time Password',
                    }}
                />
            )}
        </SafeAreaView>
    );
};

export default PhoneLoginLayout;
