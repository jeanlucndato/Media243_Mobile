import { useNavigation } from '@react-navigation/native';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

// Composant pour une seule vignette
const MediaCard = ({ media, navigation }) => (
    <TouchableOpacity
        onPress={() => navigation.navigate('Detail', { id: media.id })}
        className="mr-3 w-28 h-44 rounded-md overflow-hidden bg-gray-800 shadow-md"
    >
        <Image
            source={{ uri: media.poster_url }}
            className="w-full h-full"
            resizeMode="cover"
        />
        {/* Vous pouvez ajouter un overlay ici pour le titre/la note */}
        <View className="absolute bottom-0 w-full p-1 bg-black/50">
            <Text className="text-white text-xs" numberOfLines={1}>
                {media.title}
            </Text>
        </View>
    </TouchableOpacity>
);

// Composant de Ligne Horizontale
const Row = ({ title, mediaList = [] }) => {
    const navigation = useNavigation();

    if (!mediaList || mediaList.length === 0) {
        return null;
    }

    return (
        <View className="mb-6">
            {/* Titre de la Ligne */}
            <Text className="text-white text-xl font-bold mb-3 px-4">
                {title}
            </Text>

            {/* Liste Défilante Horizontale */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 16 }}
            >
                {mediaList.map((media) => (
                    <MediaCard
                        key={media.id}
                        media={media}
                        navigation={navigation}
                    />
                ))}
            </ScrollView>
        </View>
    );
};

export default Row;