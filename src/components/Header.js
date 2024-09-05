import React, { memo } from 'react';
import { StyleSheet, Text } from 'react-native';

import { useTheme } from '../hooks';

const Header = ({ children }) => {
    const { colorTheme } = useTheme();
    return (
        <Text
            style={{ ...styles.header, color: colorTheme.colors.default_text }}
        >
            {children}
        </Text>
    );
};

const styles = StyleSheet.create({
    header: {
        fontSize: 26,
        fontWeight: 'bold',
        paddingVertical: 14,
    },
});

export default memo(Header);
