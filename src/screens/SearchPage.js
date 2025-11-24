import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Alert, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'; // Ajout de Alert pour remplacer la fonction 'alert'
import Icon from 'react-native-vector-icons/Ionicons';
// Composants (assurez-vous que les chemins sont corrects)
import Row from '../components/Row';
import StreamSearchBar from '../components/StreamSearchBar';

// MOCK DATA
const recentSearches = ['Action', 'Thriller', 'Drame 2024', 'Séries TV', 'Documentaire'];

// Couleurs définies ici pour les vignettes de catégorie (équivalent des classes bg-...)
const CATEGORY_COLORS = {
    'bg-red-700': '#B91C1C', // red-700
    'bg-yellow-500': '#EAB308', // yellow-500
    'bg-blue-700': '#1D4ED8', // blue-700
    'bg-purple-700': '#6D28D9', // purple-700
    'bg-black-900': '#111827', // Presque noir (gray-900)
    'bg-green-600': '#16A34A', // green-600
};

const popularCategories = [
    { name: 'Action', colorClass: 'bg-red-700', icon: 'flash' },
    { name: 'Comedy', colorClass: 'bg-yellow-500', icon: 'happy' },
    { name: 'Drame', colorClass: 'bg-blue-700', icon: 'sad' },
    { name: 'Sci-Fi', colorClass: 'bg-purple-700', icon: 'rocket' },
    { name: 'Horreur', colorClass: 'bg-black-900', icon: 'skull' },
    { name: 'Famille', colorClass: 'bg-green-600', icon: 'home' },
];

const SearchScreen = () => {
    const navigation = useNavigation();
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = (query) => {
        setSearchTerm(query);
        if (query.length > 2) {
            // Logique pour appeler l'API de recherche ici
            console.log("Recherche lancée pour:", query);
            // Exemple de résultat simple
            setSearchResults([
                { id: 1, title: 'Résultat 1', poster_url: 'https://via.placeholder.com/150x225/333/fff?text=R1' },
                { id: 2, title: 'Résultat 2', poster_url: 'https://via.placeholder.com/150x225/444/fff?text=R2' },
            ]);
        } else {
            setSearchResults([]);
        }
    };

    const handleVoiceSearch = () => {
        // Remplacement de 'alert' par une fonction native plus robuste
        Alert.alert("Recherche Vocale", "Lancement de la recherche vocale...");
        // Logique d'activation de la reconnaissance vocale ici
    };

    const renderRecentSearch = (tag) => (
        <TouchableOpacity
            key={tag}
            onPress={() => handleSearch(tag)}
            style={styles.recentSearchTag} // Styles du bouton
        >
            <Text style={styles.recentSearchText}>{tag}</Text>
        </TouchableOpacity>
    );

    const renderCategoryVignette = (category) => {
        // Récupération de la couleur réelle à partir du mapping
        const backgroundColor = CATEGORY_COLORS[category.colorClass] || '#4B5563'; // Fallback gray-600

        return (
            <TouchableOpacity
                key={category.name}
                onPress={() => handleSearch(`Genre: ${category.name}`)}
                style={styles.categoryVignetteWrapper} // w-1/2 p-1.5
            >
                <View style={[styles.categoryVignette, { backgroundColor: backgroundColor }]}>
                    <Text style={styles.categoryVignetteText}>{category.name}</Text>
                    <Icon name={category.icon} size={28} color="#FFFFFF" />
                </View>
            </TouchableOpacity>
        );
    };

    return (
        // Équivalent de: flex-1 bg-black
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="light-content" />

            {/* --- 1. Header (Menu, Logo, Micro) --- */}
            {/* Équivalent de: flex-row items-center justify-between p-4 border-b border-gray-800 */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => console.log('Ouvrir Menu')}>
                    <Icon name="menu-outline" size={30} color="#FFFFFF" />
                </TouchableOpacity>

                {/* Titre et Logo */}
                <Text style={styles.headerTitle}>
                    Media<Text style={styles.headerTitleRed}>243</Text>
                </Text>

                {/* Bouton de recherche vocale */}
                <TouchableOpacity onPress={handleVoiceSearch}>
                    <Icon name="mic" size={26} color="#B82329" /> {/* Micro en couleur d'action */}
                </TouchableOpacity>
            </View>

            {/* Équivalent de: flex-1 p-4 */}
            <ScrollView style={styles.scrollView}>

                {/* --- 2. Barre de Recherche Personnalisée --- */}
                <StreamSearchBar onSearch={handleSearch} placeholder="Rechercher films, séries, acteurs..." />

                {/* --- 3. Affichage des Résultats (si searchTerm est actif) --- */}
                {searchTerm.length > 0 && searchResults.length > 0 ? (
                    // Équivalent de: mt-6 mb-20
                    <View style={styles.searchResultsContainer}>
                        {/* Équivalent de: text-white text-lg font-bold mb-3 */}
                        <Text style={styles.resultsTitle}>
                            Résultats pour "{searchTerm}"
                        </Text>
                        <Row mediaList={searchResults} title="" />
                    </View>
                ) : (
                    <>
                        {/* --- 4. Recherches Récentes (si pas de résultats) --- */}
                        {/* Équivalent de: mt-6 mb-6 */}
                        <View style={styles.recentSearchesContainer}>
                            {/* Équivalent de: text-white text-lg font-bold mb-3 */}
                            <Text style={styles.resultsTitle}>
                                Recherches Récentes
                            </Text>
                            {/* Équivalent de: flex-row flex-wrap */}
                            <View style={styles.tagsContainer}>
                                {recentSearches.map(renderRecentSearch)}
                            </View>
                        </View>

                        {/* --- 5. Catégories Populaires --- */}
                        {/* Équivalent de: mb-20 */}
                        <View style={styles.categoriesContainer}>
                            {/* Équivalent de: text-white text-lg font-bold mb-3 */}
                            <Text style={styles.resultsTitle}>
                                Parcourir les Catégories
                            </Text>
                            {/* Équivalent de: flex-row flex-wrap -m-1.5 */}
                            <View style={styles.categoryGrid}>
                                {popularCategories.map(renderCategoryVignette)}
                            </View>
                        </View>
                    </>
                )}

            </ScrollView>
        </SafeAreaView>
    );
};

// --- Définition des Styles (équivalents CSS) ---
const styles = StyleSheet.create({
    // Équivalent de: flex-1 bg-black
    safeArea: {
        flex: 1,
        backgroundColor: 'black',
    },
    // Équivalent de: flex-1 p-4
    scrollView: {
        flex: 1,
        paddingHorizontal: 16, // p-4
    },

    // 1. Header
    // Équivalent de: flex-row items-center justify-between p-4 border-b border-gray-800
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16, // p-4
        borderBottomWidth: 1,
        borderColor: '#1f2937', // border-gray-800
    },
    // Équivalent de: text-white text-xl font-bold
    headerTitle: {
        color: 'white',
        fontSize: 20, // text-xl
        fontWeight: 'bold',
    },
    // Équivalent de: text-red-600
    headerTitleRed: {
        color: '#DC2626', // red-600
    },

    // Conteneur de résultats de recherche
    // Équivalent de: mt-6 mb-20
    searchResultsContainer: {
        marginTop: 24, // mt-6
        marginBottom: 80, // mb-20
    },
    // Équivalent de: text-white text-lg font-bold mb-3
    resultsTitle: {
        color: 'white',
        fontSize: 18, // text-lg
        fontWeight: 'bold',
        marginBottom: 12, // mb-3
    },

    // 4. Recherches Récentes
    // Équivalent de: mt-6 mb-6
    recentSearchesContainer: {
        marginTop: 24, // mt-6
        marginBottom: 24, // mb-6
    },
    // Équivalent de: flex-row flex-wrap
    tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    // Équivalent de: bg-gray-700 rounded-full px-4 py-2 mr-2 mb-2
    recentSearchTag: {
        backgroundColor: '#374151', // gray-700
        borderRadius: 9999, // rounded-full
        paddingHorizontal: 16, // px-4
        paddingVertical: 8, // py-2
        marginRight: 8, // mr-2
        marginBottom: 8, // mb-2
    },
    // Équivalent de: text-white text-sm
    recentSearchText: {
        color: 'white',
        fontSize: 14, // text-sm
    },

    // 5. Catégories Populaires
    // Équivalent de: mb-20
    categoriesContainer: {
        marginBottom: 80, // mb-20
    },
    // Équivalent de: flex-row flex-wrap -m-1.5
    categoryGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginHorizontal: -6, // Compense le padding horizontal des vignettes
    },
    // Équivalent de: w-1/2 p-1.5
    categoryVignetteWrapper: {
        width: '50%', // w-1/2
        padding: 6, // p-1.5
    },
    // Équivalent de: rounded-lg h-20 flex-row items-center justify-between p-4
    categoryVignette: {
        borderRadius: 8, // rounded-lg
        height: 80, // h-20
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16, // p-4
    },
    // Équivalent de: text-white text-base font-bold
    categoryVignetteText: {
        color: 'white',
        fontSize: 16, // text-base
        fontWeight: 'bold',
    }
});

export default SearchScreen;