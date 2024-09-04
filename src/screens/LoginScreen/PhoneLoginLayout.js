import React, { useState, useRef } from 'react';
import {
    SafeAreaView,
    View,
    StatusBar,
    TouchableOpacity,
    Text,
} from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import { useTheme } from '../../hooks';
import { ColorScheme } from '../../constants/enums';

const PhoneLoginLayout = () => {
    const { colorScheme } = useTheme();
    const [value, setValue] = useState('');
    const [valid, setValid] = useState(false);
    const phoneInput = useRef(null);

    return (
        <>
            <SafeAreaView>
                <PhoneInput
                    ref={phoneInput}
                    defaultValue={value}
                    defaultCode="NO"
                    layout="first"
                    onChangeText={(text) => {
                        setValue(text);
                    }}
                    onChangeFormattedText={(text) => {
                        setFormattedValue(text);
                    }}
                    withDarkTheme={ColorScheme.dark === colorScheme}
                    withShadow
                    autoFocus
                />
                <TouchableOpacity
                    onPress={() => {
                        const checkValid =
                            phoneInput.current?.isValidNumber(value);
                        setShowMessage(true);
                        setValid(checkValid ? checkValid : false);
                    }}
                >
                    <Text>Check</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </>
    );
};

export default PhoneLoginLayout;
