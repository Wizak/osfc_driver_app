import * as React from 'react';
import * as SecureStore from 'expo-secure-store';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { AuthReducer, AuthActions } from './reducers/auth';
import { httpClient } from '../httpClient';
import { OSFC_API_URL, AllowedRolesToUseApp } from '../constants/constants';
import I18n from '../translation';

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
    const [state, dispatch] = React.useReducer(AuthReducer, {
        isLoading: true,
        permissions: null,
        error: null,
    });

    React.useEffect(() => {
        const bootstrapAsync = async () => {
            let permissions;
            let error;

            try {
                permissions = JSON.parse(
                    await AsyncStorage.getItem('permissions')
                );
            } catch (e) {
                throw new Error('Restore permissions Error');
            }

            dispatch({
                type: AuthActions.RestorePermissions,
                permissions,
                error,
            });
        };

        bootstrapAsync();
    }, []);

    const authContextValue = {
        signIn: async ({ apiUrl = OSFC_API_URL, ...body }) => {
            let permissions;
            let error;

            dispatch({ type: AuthActions.Loading });

            await httpClient(`${apiUrl}/login/code`, {
                method: 'POST',
                body: JSON.stringify(body),
            })
                .then(async ({ headers, json }) => {
                    if (!AllowedRolesToUseApp.includes(json.permissions.role)) {
                        error = I18n.t(
                            'app.error.security.allowed_app_user_role'
                        );
                        return;
                    }
                    try {
                        const setCookieHeader = headers.get('Set-Cookie');
                        if (setCookieHeader) {
                            const tokenMatch = setCookieHeader.match(
                                /Authorization=([^;]+)/
                            );
                            if (tokenMatch) {
                                const token = tokenMatch[1];
                                await SecureStore.setItemAsync('token', token);
                            }
                        }
                    } catch (e) {
                        throw new Error('Set Authorization Error');
                    }
                    try {
                        await AsyncStorage.setItem(
                            'permissions',
                            JSON.stringify(json.permissions)
                        );
                        permissions = json.permissions;
                    } catch (e) {
                        throw new Error('Set permissions Error');
                    }
                })
                .catch((e) => {
                    error = e?.message || 'Unexpected Error';
                })
                .finally(() => {
                    dispatch({ type: AuthActions.SignIn, permissions, error });
                });
        },
        signOut: async () => {
            dispatch({ type: AuthActions.Loading });
            try {
                await SecureStore.deleteItemAsync('token');
                await AsyncStorage.removeItem('permissions');
            } catch (e) {
                throw new Error('Reset storage Error');
            }
            dispatch({ type: AuthActions.SignOut });
        },
        getState: () => state,
        checkAuth: () => !!SecureStore.getItem('token'),
    };

    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => {
    const context = React.useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
};

export { useAuth };
export default AuthProvider;
