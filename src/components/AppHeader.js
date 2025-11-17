// Fichier: ../components/AppHeader.js

import { Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const AppHeader = ({ navigation }) => {
    return (
        // 🚨 CHANGEMENT : bg-transparent pour voir la bannière en dessous
        <View className="flex-row items-center justify-between px-4 py-4 bg-transparent w-full">

            {/* 1. Bouton Menu (à gauche) */}
            <TouchableOpacity onPress={() => console.log('Ouvrir Menu')}>
                {/* 🚨 OPTIMISATION : Menu icône plus simple pour le style Netflix */}
                <Icon name="menu-outline" size={32} color="#FFFFFF" />
            </TouchableOpacity>

            {/* 2. Logo Central */}
            <Text className="text-white text-xl font-bold">
                Media<Text className="text-red-600">243</Text>
            </Text>

            {/* 3. Bouton Recherche (à droite) */}
            <TouchableOpacity onPress={() => navigation.navigate('SearchTab')}>
                <Icon name="search-outline" size={26} color="#FFFFFF" />
            </TouchableOpacity>
        </View>
    );
};

export default AppHeader;