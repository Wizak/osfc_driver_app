import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { LoginScreen } from '../screens';

const Stack = createNativeStackNavigator();

const SecureNavigation = (screenProps) => {
    const isLoggedIn = false;

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {!isLoggedIn ? (
                <Stack.Screen name="Login" component={LoginScreen} />
            ) : (
                <Stack.Screen {...screenProps} />
            )}
        </Stack.Navigator>
    );
};

export default SecureNavigation;
