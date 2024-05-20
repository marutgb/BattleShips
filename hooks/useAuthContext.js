import React, { createContext, useContext, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login as loginService, register as registerService } from "../api";

const AuthContext = createContext({
    token: '',
    login: async () => {},
    register: async () => {}
});

export const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState('');

    const performLogin = async (email, password) => {
        try {
            const result = await loginService(email, password);
            if (!result.accessToken) {
                throw new Error('Login failed');
            }
            setAuthToken(result.accessToken);
            await AsyncStorage.setItem('accessToken', result.accessToken);
            return result;
        } catch (error) {
            throw new Error(error.message || 'Login failed');
        }
    };

    const performRegister = async (email, password) => {
        try {
            const result = await registerService(email, password);
            return result;
        } catch (error) {
            throw new Error(error.message || 'Registration failed');
        }
    };

    return (
        <AuthContext.Provider value={{ token: authToken, login: performLogin, register: performRegister }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => useContext(AuthContext);
