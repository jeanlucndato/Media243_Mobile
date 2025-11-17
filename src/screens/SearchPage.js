import { useState } from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';
// Assurez-vous d'utiliser une bibliothèque d'icônes compatible avec NativeWind/Tailwind,
// comme 'react-native-vector-icons' enveloppé dans un composant stylé si nécessaire,
// ou une solution comme 'expo-router' pour les icônes.
// Pour la simplicité ici, nous allons supposer que vous pouvez utiliser des composants stylés.

// Si vous utilisez 'react-native-vector-icons', vous pourriez avoir besoin de l'envelopper :
import Icon from 'react-native-vector-icons/Ionicons';
// Si NativeWind ne fonctionne pas directement sur l'icône, vous devrez utiliser des styles objets,
// mais nous allons tenter l'approche Tailwind classique en premier.

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
            onSearch(''); // Réinitialiser les résultats de recherche
        }
    };

    return (
        <View className="p-4 bg-gray-900 border-b border-gray-700 shadow-md">
            <View className="flex-row items-center bg-gray-800 rounded-full h-12 px-4">
                {/* Icône de recherche */}
                <Icon name="search" size={20} color="#888888" className="mr-3" />

                {/* Champ de texte */}
                <TextInput
                    className="flex-1 text-white text-base"
                    placeholder={placeholder}
                    placeholderTextColor="#A0AEC0" // Placeholder gris clair
                    value={searchText}
                    onChangeText={setSearchText}
                    onSubmitEditing={handleSearch}
                    returnKeyType="search"
                />

                {/* Bouton pour effacer le texte (X) */}
                {searchText.length > 0 && (
                    <TouchableOpacity onPress={clearSearch} className="ml-3 p-1">
                        <Icon name="close-circle" size={20} color="#888888" />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

export default StreamSearchBar;