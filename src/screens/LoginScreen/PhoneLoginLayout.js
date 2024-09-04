import React, { useState, useRef, useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import { useTheme } from '../../hooks';
import { ColorScheme } from '../../constants/enums';
import Button from '../../components/Button';

const PhoneLoginLayout = () => {
    const { colorScheme } = useTheme();
    const [value, setValue] = useState('');
    const [valid, setValid] = useState(false);
    const phoneInput = useRef(null);

    const validatePhoneInput = () => {
        const checkValid = phoneInput.current?.isValidNumber(value);
        setValid(checkValid ? checkValid : false);
    };

    const handleOnSend = () => {
        validatePhoneInput();
    };

    useEffect(() => {
        if (valid) {
        }
    }, [valid]);
    return (
        <>
            <SafeAreaView>
                <PhoneInput
                    ref={phoneInput}
                    defaultValue={value}
                    defaultCode="NO"
                    layout="first"
                    onChangeText={setValue}
                    withDarkTheme={ColorScheme.dark === colorScheme}
                    withShadow
                    autoFocus
                />
            </SafeAreaView>
            <Button onPress={handleOnSend}>Send</Button>
        </>
    );
};

export default PhoneLoginLayout;
