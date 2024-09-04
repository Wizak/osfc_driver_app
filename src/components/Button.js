import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import { Button as PaperButton } from 'react-native-paper';
import { useTheme } from '../hooks';

const Button = ({
    mode,
    children,
    withStyles = true,
    buttonStyle = {},
    labelStyle = {},
    ...props
}) => {
    const { colorTheme } = useTheme();
    return (
        <PaperButton
            style={
                withStyles
                    ? [
                          styles.button,
                          mode === 'outlined' && {
                              backgroundColor: colorTheme.colors.surface,
                          },
                          buttonStyle,
                      ]
                    : buttonStyle
            }
            labelStyle={withStyles ? styles.text : labelStyle}
            mode={mode}
            {...props}
        >
            {children}
        </PaperButton>
    );
};
const styles = StyleSheet.create({
    button: {
        width: '100%',
        marginVertical: 10,
    },
    text: {
        fontWeight: 'bold',
        fontSize: 15,
        lineHeight: 26,
    },
});

export default memo(Button);
