import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Platform } from 'react-native';

// Import screens
import colors from '../constants/colors';
import HomePage from '../screens/HomeScreen';
import MyListScreen from '../screens/MyListScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SearchPage from '../screens/SearchPage';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: colors.bottomTab,
                    borderTopColor: 'transparent',
                    height: Platform.OS === 'ios' ? 85 : 60,
                    paddingBottom: Platform.OS === 'ios' ? 30 : 10,
                    paddingTop: 10,
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    elevation: 0,
                    opacity: 0.96, // Slight transparency
                },
                tabBarActiveTintColor: colors.textPrimary, // Netflix uses white for active
                tabBarInactiveTintColor: colors.textSecondary, // Grey for inactive
                tabBarLabelStyle: {
                    fontSize: 8,
                    fontWeight: '500',
                    marginTop: -4,
                },
            }}
        >
            {/* Home Screen */}
            <Tab.Screen
                name="Home"
                component={HomePage}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons
                            name={focused ? "home" : "home-outline"}
                            color={color}
                            size={24}
                        />
                    ),
                }}
            />

            {/* Search/New & Hot typically, keeping Search for now */}
            <Tab.Screen
                name="Search"
                component={SearchPage}
                options={{
                    tabBarLabel: 'Search',
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons
                            name={focused ? "search" : "search-outline"}
                            color={color}
                            size={24}
                        />
                    ),
                }}
            />

            {/* My List / Downloads */}
            <Tab.Screen
                name="MyList"
                component={MyListScreen}
                options={{
                    tabBarLabel: 'My Media243', // Changing label to match modern Media243 "My Media243" hub
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons
                            name={focused ? "person-circle" : "person-circle-outline"} // Netflix uses avatar often, using circle icon for now
                            color={color}
                            size={24}
                        />
                    ),
                }}
            />

            {/* Profile/More -> Often merged into "My Netflix" in new UI, let's keep separate for structure but maybe rename to "More" or keep Profile */}
            {/* Actually, Netflix 2024 has: Home, New & Hot, My Netflix. simpler. 
               We have 4 screens. Let's keep Profile appearing as Menu or similar.
               But user had "ProfileScreen". Let's stick to standard recognizable tabs.
            */}
            <Tab.Screen
                name="Menu"
                component={ProfileScreen}
                options={{
                    tabBarLabel: 'Menu',
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons
                            name={focused ? "menu" : "menu-outline"}
                            color={color}
                            size={24}
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

export default BottomTabNavigator;