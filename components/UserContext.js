import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import defaultUser from './user'; // Import the default user structure

// Create User Context
const UserContext = createContext();

// User Provider Component
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null); // `null` when not authenticated
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUserData = async () => {
            try {
                const storedUser = await AsyncStorage.getItem('user');
                if (storedUser) {
                    setUser(JSON.parse(storedUser)); // Use existing stored user
                }
            } catch (error) {
                console.error('Error loading user data', error);
            } finally {
                setLoading(false);
            }
        };
        loadUserData();
    }, []);

    const login = async (userData, isNewUser = false) => {
        try {
            let storedUsers = await AsyncStorage.getItem('users');
            storedUsers = storedUsers ? JSON.parse(storedUsers) : [];
    
            let userToLogin;
    
            if (isNewUser) {
                // For new users, merge with default values
                userToLogin = { ...defaultUser, ...userData };
                storedUsers.push(userToLogin); // Add to stored users
            } else {
                // For existing users, find the matching user in storage
                userToLogin = storedUsers.find(user => user.email === userData.email);
    
                if (!userToLogin) {
                    throw new Error('User not found');
                }
            }
    
            // Save updated users list back to AsyncStorage
            await AsyncStorage.setItem('users', JSON.stringify(storedUsers));
    
            // Set the logged-in user and persist in AsyncStorage
            setUser(userToLogin);
            await AsyncStorage.setItem('user', JSON.stringify(userToLogin));
        } catch (error) {
            console.error('Failed to login user:', error);
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
