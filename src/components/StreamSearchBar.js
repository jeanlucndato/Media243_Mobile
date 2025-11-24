import { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
// Assurez-vous d'avoir installé react-native-vector-icons

const StreamSearchBar = ({ onSearch, placeholder = "Rechercher films, séries, acteurs..." }) => {
    const [searchText, setSearchText] = useState('');

    const handleSearch = () => {
        if (onSearch) {
            onSearch(searchText);
        }
    };

    const clearSearch = () => {
        setSearchText('');
        if (onSearch) {
            onSearch(''); // Optionnel: déclencher une recherche vide ou réinitialiser les résultats
        }
    };

    return (
        // Conteneur principal - Remplacement de la classe Tailwind par style={styles.outerContainer}
        <View style={styles.outerContainer}>
            {/* Remplacement de la classe Tailwind par style={styles.searchContainer} */}
            <View style={styles.searchContainer}>

                {/* Icône de recherche (loupe) */}
                {/* Remplacement de la classe Tailwind par style={styles.searchIcon} */}
                <Icon name="search" size={20} color="#888888" style={styles.searchIcon} />

                {/* Champ de texte */}
                {/* Remplacement de la classe Tailwind par style={styles.textInput} */}
                <TextInput
                    style={styles.textInput}
                    placeholder={placeholder}
                    placeholderTextColor="#A0AEC0" // Placeholder gris clair (gris-400 de Tailwind)
                    value={searchText}
                    onChangeText={setSearchText}
                    onSubmitEditing={handleSearch} // Lance la recherche à la validation
                    returnKeyType="search"
                />

                {/* Bouton pour effacer le texte (X) - visible seulement si le champ n'est pas vide */}
                {searchText.length > 0 && (
                    // Remplacement de la classe Tailwind par style={styles.clearButton}
                    <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
                        <Icon name="close-circle" size={20} color="#888888" />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

// --- Définition des Styles (équivalents CSS) ---
const styles = StyleSheet.create({
    // Équivalent de: p-0 (Pas de padding externe)
    outerContainer: {
        padding: 0,
        width: '100%',
    },

    // Équivalent de: flex-row items-center bg-gray-800 rounded-full h-12 px-4 shadow-lg border border-gray-700
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1f2937', // bg-gray-800
        borderRadius: 9999, // rounded-full (très grande valeur pour un cercle)
        height: 48, // h-12
        paddingHorizontal: 16, // px-4
        borderWidth: 1,
        borderColor: '#374151', // border-gray-700
        // Shadow (ombre) - Implémentation multi-plateforme
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10, // Pour Android (shadow-lg)
    },

    // Équivalent de: mr-3 (pour l'icône de recherche)
    searchIcon: {
        marginRight: 12, // mr-3
    },

    // Équivalent de: flex-1 text-white text-base
    textInput: {
        flex: 1, // flex-1
        color: 'white', // text-white
        fontSize: 16, // text-base
        paddingVertical: 0, // IMPORTANT pour aligner le texte dans le TextInput de RN
    },

    // Équivalent de: ml-3 p-1 (pour le bouton d'effacement)
    clearButton: {
        marginLeft: 12, // ml-3
        padding: 4, // p-1
    },
});

export default StreamSearchBar;