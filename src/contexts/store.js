import React, { createContext, useContext, useEffect, useReducer } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { StoreReducer, StoreActions } from './reducers/store';
import { USER_STORE_KEY } from '../constants/constants';

const StoreContext = createContext();

const StoreProvider = ({ children }) => {
    const [state, dispatch] = useReducer(StoreReducer, {});

    useEffect(() => {
        const bootstrapAsync = async () => {
            let store;

            try {
                store =
                    JSON.parse(await AsyncStorage.getItem(USER_STORE_KEY)) ||
                    {};
            } catch (e) {
                throw new Error('Restore storage Error');
            }

            dispatch({ type: StoreActions.RestoreStore, payload: store });
        };

        bootstrapAsync();
    }, []);

    const storeContextValue = {
        changeStore: async (payload) => {
            try {
                await AsyncStorage.setItem(
                    USER_STORE_KEY,
                    JSON.stringify({ ...state, ...payload })
                );
            } catch (e) {
                throw new Error('Change storage Error');
            }
            dispatch({ type: StoreActions.ChangeStore, payload });
        },
        resetStore: async () => {
            try {
                await AsyncStorage.removeItem(USER_STORE_KEY);
            } catch (e) {
                throw new Error('Reset storage Error');
            }
            dispatch({ type: StoreActions.ResetStore });
        },
        removeFromStore: async (payload) => {
            const newStoreState = Object.keys(state)
                .filter((stateKey) => !payload.includes(stateKey))
                .reduce((newState, key) => {
                    newState[key] = state[key];
                    return newState;
                }, {});
            try {
                await AsyncStorage.setItem(
                    USER_STORE_KEY,
                    JSON.stringify(newStoreState)
                );
            } catch (e) {
                throw new Error('Remove storage Error');
            }
            dispatch({ type: StoreActions.RemoveFromStore, payload });
        },
        getState: () => state,
    };

    return (
        <StoreContext.Provider value={storeContextValue}>
            {children}
        </StoreContext.Provider>
    );
};

const useStore = () => {
    const context = useContext(StoreContext);

    if (!context) {
        throw new Error('useStore must be used within an StoreProvider');
    }

    return context;
};

export { useStore };
export default StoreProvider;
