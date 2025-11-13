import { NavigationContainer } from '@react-navigation/native';
// L'importation de gesture-handler doit être le premier import non-Expo/React
import 'react-native-gesture-handler';

// Importez vos Contextes
import { AuthProvider } from './src/contexts/AuthContext';
import { MediaProvider } from './src/contexts/MediaContext';

// Importez le Navigator (Utilisation de AppNavigation, comme indiqué par vos logs)
import AppNavigation from './src/navigation/AppNavigation';


export default function App() {
    return (
        // Le NavigationContainer doit encapsuler TOUT le routage
        <NavigationContainer>
            <AuthProvider>
                <MediaProvider>
                    {/* AppNavigation bascule entre Login/Signup et les onglets */}
                    <AppNavigation />
                </MediaProvider>
            </AuthProvider>
        </NavigationContainer>
    );
}