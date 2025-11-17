import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { SafeAreaView, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

// Composants (assurez-vous que les chemins sont corrects)
import Row from '../components/Row'; // Pour afficher les résultats (optionnel ici, pour l'exemple)
import StreamSearchBar from '../components/StreamSearchBar'; // Barre de recherche personnalisée

// MOCK DATA
const recentSearches = ['Action', 'Thriller', 'Drame 2024', 'Séries TV', 'Documentaire'];
const popularCategories = [
    { name: 'Action', color: 'bg-red-700', icon: 'flash' },
    { name: 'Comedy', color: 'bg-yellow-500', icon: 'happy' },
    { name: 'Drame', color: 'bg-blue-700', icon: 'sad' },
    { name: 'Sci-Fi', color: 'bg-purple-700', icon: 'rocket' },
    { name: 'Horreur', color: 'bg-black-900', icon: 'skull' },
    { name: 'Famille', color: 'bg-green-600', icon: 'home' },
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
        alert("Lancement de la recherche vocale...");
        // Logique d'activation de la reconnaissance vocale ici
    };

    const renderRecentSearch = (tag) => (
        <TouchableOpacity
            key={tag}
            onPress={() => handleSearch(tag)}
            className="bg-gray-700 rounded-full px-4 py-2 mr-2 mb-2"
        >
            <Text className="text-white text-sm">{tag}</Text>
        </TouchableOpacity>
    );

    const renderCategoryVignette = (category) => (
        <TouchableOpacity
            key={category.name}
            onPress={() => handleSearch(`Genre: ${category.name}`)}
            className={`w-1/2 p-1.5`}
        >
            <View className={`rounded-lg h-20 flex-row items-center justify-between p-4 ${category.color}`}>
                <Text className="text-white text-base font-bold">{category.name}</Text>
                <Icon name={category.icon} size={28} color="#FFFFFF" />
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView className="flex-1 bg-black">
            <StatusBar barStyle="light-content" />

            {/* --- 1. Header (Menu, Logo, Micro) --- */}
            <View className="flex-row items-center justify-between p-4 border-b border-gray-800">
                <TouchableOpacity onPress={() => console.log('Ouvrir Menu')}>
                    <Icon name="menu-outline" size={30} color="#FFFFFF" />
                </TouchableOpacity>

                <Text className="text-white text-xl font-bold">
                    Media<Text className="text-red-600">243</Text>
                </Text>

                <TouchableOpacity onPress={handleVoiceSearch}>
                    <Icon name="mic" size={26} color="#B82329" /> {/* Micro en couleur d'action */}
                </TouchableOpacity>
            </View>

            <ScrollView className="flex-1 p-4">

                {/* --- 2. Barre de Recherche Personnalisée --- */}
                {/* Réutilisez le composant StreamSearchBar que vous avez déjà en Tailwind */}
                <StreamSearchBar onSearch={handleSearch} placeholder="Rechercher films, séries, acteurs..." />

                {/* --- 3. Affichage des Résultats (si searchTerm est actif) --- */}
                {searchTerm.length > 0 && searchResults.length > 0 ? (
                    <View className="mt-6 mb-20">
                        <Text className="text-white text-lg font-bold mb-3">
                            Résultats pour "{searchTerm}"
                        </Text>
                        <Row mediaList={searchResults} title="" />
                    </View>
                ) : (
                    <>
                        {/* --- 4. Recherches Récentes (si pas de résultats) --- */}
                        <View className="mt-6 mb-6">
                            <Text className="text-white text-lg font-bold mb-3">
                                Recherches Récentes
                            </Text>
                            <View className="flex-row flex-wrap">
                                {recentSearches.map(renderRecentSearch)}
                            </View>
                        </View>

                        {/* --- 5. Catégories Populaires --- */}
                        <View className="mb-20">
                            <Text className="text-white text-lg font-bold mb-3">
                                Parcourir les Catégories
                            </Text>
                            <View className="flex-row flex-wrap -m-1.5"> {/* -m-1.5 compense le p-1.5 */}
                                {popularCategories.map(renderCategoryVignette)}
                            </View>
                        </View>
                    </>
                )}

            </ScrollView>
            {/* NOTE: La barre de navigation inférieure sera gérée par votre Tab Navigator */}
        </SafeAreaView>
    );
};

export default SearchScreen;