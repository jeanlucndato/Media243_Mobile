import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

const AuthContext = createContext();

const AUTH_TOKEN_KEY = '@media243_auth_token';
const USER_DATA_KEY = '@media243_user_data';

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkAuthStatus();
    }, []);

    const checkAuthStatus = async () => {
        try {
            const token = await AsyncStorage.getItem(AUTH_TOKEN_KEY);
            const userData = await AsyncStorage.getItem(USER_DATA_KEY);

            if (token && userData) {
                setUser(JSON.parse(userData));
                setIsAuthenticated(true);
            }
        } catch (error) {
            console.error('Error checking auth status:', error);
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        try {
            // TODO: Replace with actual API call
            // For now, using mock authentication
            await new Promise(resolve => setTimeout(resolve, 1000));

            const mockUser = {
                id: '1',
                name: email.split('@')[0],
                email,
                subscription: 'premium',
                avatar: 'https://via.placeholder.com/100/DC2626/FFFFFF?text=' + email[0].toUpperCase(),
            };

            const mockToken = 'mock_token_' + Date.now();

            await AsyncStorage.setItem(AUTH_TOKEN_KEY, mockToken);
            await AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(mockUser));

            setUser(mockUser);
            setIsAuthenticated(true);

            return { success: true };
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, error: error.message };
        }
    };

    const signup = async (name, email, password) => {
        try {
            // TODO: Replace with actual API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            const mockUser = {
                id: '1',
                name,
                email,
                subscription: 'free',
                avatar: 'https://via.placeholder.com/100/DC2626/FFFFFF?text=' + name[0].toUpperCase(),
            };

            const mockToken = 'mock_token_' + Date.now();

            await AsyncStorage.setItem(AUTH_TOKEN_KEY, mockToken);
            await AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(mockUser));

            setUser(mockUser);
            setIsAuthenticated(true);

            return { success: true };
        } catch (error) {
            console.error('Signup error:', error);
            return { success: false, error: error.message };
        }
    };

    const logout = async () => {
        try {
            await AsyncStorage.removeItem(AUTH_TOKEN_KEY);
            await AsyncStorage.removeItem(USER_DATA_KEY);
            setUser(null);
            setIsAuthenticated(false);
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    const updateUser = async (userData) => {
        try {
            const updatedUser = { ...user, ...userData };
            await AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(updatedUser));
            setUser(updatedUser);
            return { success: true };
        } catch (error) {
            console.error('Update user error:', error);
            return { success: false, error: error.message };
        }
    };

    const value = {
        user,
        isAuthenticated,
        loading,
        login,
        signup,
        logout,
        updateUser,
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#E50914" />
            </View>
        );
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
    }
});