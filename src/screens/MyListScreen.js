import { useNavigation } from '@react-navigation/native';
import { FlatList, Image, SafeAreaView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

// MOCK DATA : Liste de films/séries à regarder
const watchlistMedia = [
    { id: 101, title: "L'Ombre du Kivu", poster_url: 'https://via.placeholder.com/150x225/B82329/FFFFFF?text=WL1' },
    { id: 102, title: "Kin Nights S2", poster_url: 'https://via.placeholder.com/150x225/404040/FFFFFF?text=WL2' },
    { id: 103, title: "La Nuit du Congo", poster_url: 'https://via.placeholder.com/150x225/222222/FFFFFF?text=WL3' },
    { id: 104, title: "RDC Stories Ép. 4", poster_url: 'https://via.placeholder.com/150x225/555555/FFFFFF?text=WL4' },
    { id: 105, title: "Saga de Goma", poster_url: 'https://via.placeholder.com/150x225/888888/FFFFFF?text=WL5' },
    { id: 106, title: "Héritage 243 S3", poster_url: 'https://via.placeholder.com/150x225/000000/FFFFFF?text=WL6' },
];

const MyListScreen = () => {
    const navigation = useNavigation();

    // Rendu d'une seule vignette de film/série
    const renderItem = ({ item }) => (
        <TouchableOpacity
            onPress={() => navigation.navigate('Detail', { id: item.id })}
            className="w-1/2 p-2" // Prend la moitié de la largeur
        >
            <View className="relative w-full aspect-[2/3] rounded-lg overflow-hidden shadow-lg">
                <Image
                    source={{ uri: item.poster_url }}
                    className="w-full h-full"
                    resizeMode="cover"
                />
                {/* Overlay pour le titre ou une indication de statut (facultatif) */}
                <View className="absolute bottom-0 w-full p-2 bg-black/50">
                    <Text className="text-white text-xs font-semibold" numberOfLines={1}>
                        {item.title}
                    </Text>
                </View>
                {/* Icône de suppression facile */}
                <TouchableOpacity
                    onPress={() => console.log('Supprimer', item.id)}
                    className="absolute top-1 right-1 bg-red-600 rounded-full p-1"
                >
                    <Icon name="close" size={14} color="#FFFFFF" />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );

    const renderEmptyList = () => (
        <View className="flex-1 items-center justify-center mt-20 p-4">
            <Icon name="list-outline" size={80} color="#555" />
            <Text className="text-gray-400 text-xl font-bold mt-4">
                Votre Liste est vide
            </Text>
            <Text className="text-gray-500 text-base text-center mt-2">
                Ajoutez des films et séries pour les retrouver facilement ici !
            </Text>
            <TouchableOpacity
                onPress={() => navigation.navigate('Home')}
                className="mt-6 bg-red-600 rounded-lg py-3 px-6"
            >
                <Text className="text-white font-bold">Explorer le Contenu</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaView className="flex-1 bg-black">
            <StatusBar barStyle="light-content" />

            {/* Header simple pour "Ma Liste" */}
            <View className="flex-row items-center justify-center p-4 border-b border-gray-800">
                <Text className="text-white text-2xl font-bold">
                    Ma <Text className="text-red-600">Liste</Text>
                </Text>
            </View>

            {/* Contenu principal (Grille ou Message Vide) */}
            <FlatList
                data={watchlistMedia}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                numColumns={2} // Affichage en deux colonnes
                columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: 8 }}
                ListEmptyComponent={renderEmptyList}
                contentContainerStyle={{ paddingVertical: 10, paddingBottom: 80 }}
            />

            {/* NOTE: La barre de navigation inférieure est gérée par le Tab Navigator */}
        </SafeAreaView>
    );
};

export default MyListScreen;