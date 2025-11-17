import { useState } from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';
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
        // Conteneur principal (ici, sans padding externe pour qu'il s'intègre au SearchScreen)
        <View className="p-0">
            <View className="flex-row items-center bg-gray-800 rounded-full h-12 px-4 shadow-lg border border-gray-700">

                {/* Icône de recherche (loupe) */}
                <Icon name="search" size={20} color="#888888" className="mr-3" />

                {/* Champ de texte */}
                <TextInput
                    className="flex-1 text-white text-base"
                    placeholder={placeholder}
                    placeholderTextColor="#A0AEC0" // Placeholder gris clair
                    value={searchText}
                    onChangeText={setSearchText}
                    onSubmitEditing={handleSearch} // Lance la recherche à la validation
                    returnKeyType="search"
                />

                {/* Bouton pour effacer le texte (X) - visible seulement si le champ n'est pas vide */}
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