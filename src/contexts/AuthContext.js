import { createContext, useContext, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    // TEMPORAIRE : Supprimer le loading pour débloquer l'affichage
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // TEMPORAIRE : Simuler l'utilisateur connecté pour voir la HomePage
        setUser({ name: "Demo", email: "demo@media243.com", subscription: 'premium' });
        setIsAuthenticated(true);

        // Le code ci-dessous est désactivé car loading est toujours false
        // const checkAuthStatus = async () => {
        //     await new Promise(resolve => setTimeout(resolve, 500)); 
        //     setLoading(false);
        // };
        // checkAuthStatus();
    }, []);

    const login = async (email, password) => {
        // Logique MOCK...
        setUser({ name: "Test", email, subscription: 'premium' });
        setIsAuthenticated(true);
    };

    const signup = async (name, email, password) => {
        // Logique MOCK...
        setUser({ name, email, subscription: 'free' });
        setIsAuthenticated(true);
    };

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
    };


    const value = {
        user,
        isAuthenticated,
        loading,
        login,
        signup,
        logout,
    };

    // ATTENTION : Le blocage du rendu a été supprimé ici
    // if (loading) {
    //     return (
    //       <View style={styles.loadingContainer}>
    //           <ActivityIndicator size="large" color="#E50914" />
    //       </View>
    //     );
    // }

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