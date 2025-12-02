import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Import screens
import HomePage from '../screens/HomeScreen';
import MyListScreen from '../screens/MyListScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SearchPage from '../screens/SearchPage';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
    return (
        <Tab.Navigator
            initialRouteName="Accueil"
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: '#000',
                    borderTopColor: '#222',
                    paddingBottom: 5,
                    height: 60,
                },
                tabBarActiveTintColor: '#E50914',
                tabBarInactiveTintColor: '#808080',
            }}
        >
            {/* Home Screen */}
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

            {/* Search Screen */}
            <Tab.Screen
                name="Recherche"
                component={SearchPage}
                options={{
                    tabBarLabel: 'Recherche',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="search-outline" color={color} size={size} />
                    ),
                }}
            />

            {/* My List Screen */}
            <Tab.Screen
                name="MyList"
                component={MyListScreen}
                options={{
                    tabBarLabel: 'Ma Liste',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="list-outline" color={color} size={size} />
                    ),
                }}
            />

            {/* Profile Screen */}
            <Tab.Screen
                name="Profil"
                component={ProfileScreen}
                options={{
                    tabBarLabel: 'Profil',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person-outline" color={color} size={size} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

export default BottomTabNavigator;