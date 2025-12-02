// Fichier: ../components/AppHeader.js

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const AppHeader = ({ navigation }) => {
    return (
        // Remplacement de la classe Tailwind par style={styles.headerContainer}
        <View style={styles.headerContainer}>

            {/* 1. Bouton Menu (à gauche) */}
            <TouchableOpacity onPress={() => navigation.openDrawer}>
                <Icon name="menu-outline" size={32} color="#FFFFFF" />
            </TouchableOpacity>

            {/* 2. Logo Central */}
            {/* Remplacement des classes Tailwind par style={styles.logoText} */}
            <Text style={styles.logoText}>
                Media
                {/* Remplacement de la classe Tailwind par style={styles.logoRed} */}
                <Text style={styles.logoRed}>243</Text>
            </Text>

            {/* 3. Bouton Recherche (à droite) */}
            <TouchableOpacity onPress={() => navigation.navigate('SearchScreen')}>
                <Icon name="search-outline" size={26} color="#FFFFFF" />
            </TouchableOpacity>
        </View>
    );
};

// --- Définition des Styles (équivalents CSS) ---
const styles = StyleSheet.create({
    // Équivalent de: flex-row items-center justify-between px-4 py-4 bg-transparent w-full
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16, // px-4 (16 unités)
        paddingVertical: 16,   // py-4 (16 unités)
        backgroundColor: 'transparent', // bg-transparent
        width: '100%', // w-full
    },

    // Équivalent de: text-white text-xl font-bold
    logoText: {
        color: '#FFFFFF', // text-white
        fontSize: 20, // text-xl
        fontWeight: 'bold', // font-bold
    },

    // Équivalent de: text-red-600
    logoRed: {
        // En Tailwind, red-600 est généralement #DC2626
        color: '#DC2626',
    },
});

export default AppHeader;