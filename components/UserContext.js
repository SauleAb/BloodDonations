import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import defaultUser from './user';

// Create User Context
const UserContext = createContext();

// User Provider Component
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUserData = async () => {
            try {
                const storedUser = await AsyncStorage.getItem('user');
                if (storedUser) {
                    setUser(JSON.parse(storedUser));
                }
            } catch (error) {
                console.error('Error loading user data', error);
            } finally {
                setLoading(false);
            }
        };
        loadUserData();
    }, []);

    const login = async (userData) => {
        try {
            // Save only the currently logged-in user
            const userToLogin = { ...defaultUser, ...userData };

            setUser(userToLogin); // Update state
            await AsyncStorage.setItem('user', JSON.stringify(userToLogin)); // Save to storage
        } catch (error) {
            console.error('Login Error:', error.message);
        }
    };

    const logout = async () => {
        setUser(null);
        await AsyncStorage.removeItem('user');
    };

    return (
        <UserContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

// Hook for using User Context
export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
