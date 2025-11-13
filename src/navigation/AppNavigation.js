import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

// Importez les pages/écrans nécessaires
import DetailPage from '../screens/DetailPage';
import LoginPage from '../screens/LoginPage';
import SignupPage from '../screens/SignupPage';

// Importez le Navigator par Onglets
import BottomTabNavigator from './BottomTabNavigator';

// Importez votre hook d'authentification
import { useAuth } from '../contexts/AuthContext';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    // Récupérer l'état d'authentification
    const { isAuthenticated, loading } = useAuth();

    // Afficher un indicateur de chargement pendant la vérification du token
    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#E50914" />
            </View>
        );
    }

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: '#000000' }
            }}
            // L'écran initial dépend de l'authentification
            initialRouteName={isAuthenticated ? "AppTabs" : "Login"}
        >
            {isAuthenticated ? (
                // Écrans après connexion
                <>
                    {/* Le BottomTabNavigator (Accueil, Recherche, Profil) */}
                    <Stack.Screen name="AppTabs" component={BottomTabNavigator} />

                    {/* Les pages comme 'Detail' doivent être en dehors des onglets */}
                    <Stack.Screen name="Detail" component={DetailPage} />
                </>
            ) : (
                // Écrans d'authentification (si déconnecté)
                <>
                    <Stack.Screen name="Login" component={LoginPage} />
                    <Stack.Screen name="Signup" component={SignupPage} />
                </>
            )}
        </Stack.Navigator>
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

export default AppNavigator;