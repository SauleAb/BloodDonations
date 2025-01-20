import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import defaultUser from './user';

// Create User Context
const UserContext = createContext();

// User Provider Component
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(defaultUser);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUserData = async () => {
            try {
                const storedUser = await AsyncStorage.getItem('user');
                if (storedUser) {
                    setUser(JSON.parse(storedUser));
                } else {
                    console.log('No user found in storage. Using default user.');
                    setUser(defaultUser);
                }
            } catch (error) {
                console.error('Error loading user data:', error);
                setUser(defaultUser);
            } finally {
                setLoading(false);
            }
        };
        loadUserData();
    }, []);
    
    const login = async (userData) => {
        try {
            const userToLogin = { ...defaultUser, ...userData };

            setUser(userToLogin); 
            await AsyncStorage.setItem('user', JSON.stringify(userToLogin));
        } catch (error) {
            console.error('Login Error:', error.message);
        }
    };

    const logout = async () => {
        await AsyncStorage.removeItem('user');
        setUser(null);
    };

    return (
        <UserContext.Provider value={{ user, setUser, loading, login, logout }}>
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
