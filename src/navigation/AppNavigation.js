import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

// Importez les pages/écrans nécessaires
import AccountScreen from '../screens/AccountScreen';
import AppSettingsScreen from '../screens/AppSettingsScreen';
import DetailPage from '../screens/DetailPage';
import DownloadsScreen from '../screens/DownloadsScreen';
import HelpScreen from '../screens/HelpScreen';
import LoginPage from '../screens/LoginPage';
import NotificationsScreen from '../screens/NotificationsScreen';
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
            // Always show AppTabs (Home) first
            initialRouteName="AppTabs"
        >
            {/* Main app screens - always accessible */}
            <Stack.Screen name="AppTabs" component={BottomTabNavigator} />
            <Stack.Screen name="Detail" component={DetailPage} />

            {/* Profile sub-screens */}
            <Stack.Screen name="Notifications" component={NotificationsScreen} />
            <Stack.Screen name="Downloads" component={DownloadsScreen} />
            <Stack.Screen name="AppSettings" component={AppSettingsScreen} />
            <Stack.Screen name="Account" component={AccountScreen} />
            <Stack.Screen name="Help" component={HelpScreen} />

            {/* Auth screens - accessible from Profile when not logged in */}
            <Stack.Screen name="Login" component={LoginPage} />
            <Stack.Screen name="Signup" component={SignupPage} />
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