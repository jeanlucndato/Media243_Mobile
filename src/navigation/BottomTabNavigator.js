import { Ionicons } from '@expo/vector-icons'; // Utilisé pour les icônes
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Importez vos écrans
import HomePage from '../screens/HomeScreen';
// Vous créerez ces écrans (ou les remplacerez par vos vrais noms de fichiers)
import ProfilePage from '../screens/LoginPage';
// import SearchPage from '../screens/SearchPage';

// Créez le Tab Navigator
const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
    return (
        <Tab.Navigator
            initialRouteName="Accueil"
            screenOptions={{
                headerShown: false, // Cache le header en haut de page
                tabBarStyle: {
                    backgroundColor: '#000', // Fond noir (Style Netflix)
                    borderTopColor: '#222', // Petite ligne de séparation sombre
                    paddingBottom: 5, // Ajout de padding pour les téléphones modernes
                    height: 55, // Hauteur de la barre
                },
                tabBarActiveTintColor: '#E50914', // Rouge vif pour l'onglet actif (Netflix Red)
                tabBarInactiveTintColor: '#808080', // Gris pour les inactifs
            }}
        >
            {/* 1. Écran d'Accueil */}
            <Tab.Screen
                name="Accueil"
                component={HomePage}
                options={{
                    tabBarLabel: 'Accueil',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home-outline" color={color} size={size} />
                    ),
                }}
            />

            {/* 2. Écran de Recherche */}
            <Tab.Screen
                name="Recherche"
                component={SearchPage} // Vous devrez créer ce composant
                options={{
                    tabBarLabel: 'Recherche',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="search-outline" color={color} size={size} />
                    ),
                }}
            />

            {/* 3. Écran Mon Espace/Profil */}
            <Tab.Screen
                name="Mon Espace"
                component={ProfilePage} // Vous devrez créer ce composant
                options={{
                    tabBarLabel: 'Mon Espace',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person-outline" color={color} size={size} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

export default BottomTabNavigator;