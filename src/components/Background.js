import React, { memo } from 'react';
import {
    ImageBackground,
    StyleSheet,
    KeyboardAvoidingView,
} from 'react-native';

import { ColorScheme } from '../constants/enums';
import { useTheme } from '../hooks';

const Background = ({ children, extraStyle = {} }) => {
    const { colorScheme } = useTheme();

    const backgroundImages = {
        [ColorScheme.light]: require('../assets/background_dot_light.png'),
        [ColorScheme.dark]: require('../assets/background_dot_dark.png'),
    };

    const backgroundImage = backgroundImages[colorScheme];

    return (
        <ImageBackground
            source={backgroundImage}
            resizeMode="repeat"
            style={styles.container}
        >
            <KeyboardAvoidingView
                style={[styles.container, extraStyle]}
                behavior="padding"
            >
                {children}
            </KeyboardAvoidingView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
    },
});

export default memo(Background);
