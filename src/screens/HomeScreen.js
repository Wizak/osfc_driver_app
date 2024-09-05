import React, { memo } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import Background from '../components/Background';

const HomeScreen = () => {
    return (
        <Background>
            <SafeAreaView
                edges={['bottom', 'left', 'right']}
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={styles.container}>
                    <View>
                        <Text>Welcome</Text>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </Background>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default memo(HomeScreen);
