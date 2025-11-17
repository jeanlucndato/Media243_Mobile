import { useNavigation, useRoute } from '@react-navigation/native';
import { Image, SafeAreaView, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

// Composants (vous devrez les créer : Row, CastRow)
import CastRow from '../components/CastRow';
import Row from '../components/Row';

// MOCK DATA pour l'exemple
const mockDetail = {
    id: 1,
    title: "Le Cœur de l'Afrique",
    year: 2024,
    rating: 9.2,
    backdrop_url: 'https://via.placeholder.com/1080x600/1C1C1C/FFFFFF?text=Détails+Background',
    synopsis: "Un jeune guerrier congolais doit s'unir à ses rivaux pour protéger leur terre ancestrale d'une menace inconnue. Ce film épique explore les thèmes de l'unité, du sacrifice et de la richesse culturelle de la RDC. Un incontournable pour Media243.",
    cast: [
        { id: 1, name: "Actor 1", photo_url: 'https://via.placeholder.com/100x100/333/fff?text=A1' },
        { id: 2, name: "Actress 2", photo_url: 'https://via.placeholder.com/100x100/444/fff?text=A2' },
        { id: 3, name: "Actor 3", photo_url: 'https://via.placeholder.com/100x100/555/fff?text=A3' },
    ],
};
const mockSimilarMedia = [
    { id: 10, title: "Film Similaire 1", poster_url: 'https://via.placeholder.com/150x225/B82329/FFFFFF?text=S1' },
    { id: 11, title: "Série Similaire 2", poster_url: 'https://via.placeholder.com/150x225/404040/FFFFFF?text=S2' },
    { id: 12, title: "Docu Similaire 3", poster_url: 'https://via.placeholder.com/150x225/222222/FFFFFF?text=S3' },
];

const DetailScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { id } = route.params; // Récupère l'ID passé par la navigation

    // En production, vous feriez ici un appel API pour charger les détails basés sur 'id'
    const media = mockDetail;

    return (
        <SafeAreaView className="flex-1 bg-black">
            <StatusBar barStyle="light-content" />

            <ScrollView className="flex-1">

                {/* --- 1. Bannière du Contenu et En-tête de Retour --- */}
                <View className="w-full h-[300px] relative">
                    <Image
                        source={{ uri: media.backdrop_url }}
                        className="w-full h-full"
                        resizeMode="cover"
                    />

                    {/* Dégradé pour le contraste du Header */}
                    <View className="absolute inset-0 bg-gradient-to-t from-black/20 to-black/60" />

                    {/* Header de retour */}
                    <View className="absolute top-0 w-full p-4 flex-row justify-between items-center mt-6">
                        <TouchableOpacity onPress={() => navigation.goBack()} className="p-1">
                            <Icon name="arrow-back-outline" size={30} color="#FFFFFF" />
                        </TouchableOpacity>

                        {/* Logo Central (Optionnel, vous pouvez le mettre ou le titre) */}
                        <Text className="text-white text-xl font-bold">
                            Media<Text className="text-red-600">243</Text>
                        </Text>

                        <View className="w-8" /> {/* Espaceur */}
                    </View>
                </View>

                {/* --- 2. Informations et Boutons --- */}
                <View className="p-4 -mt-20"> {/* Remonte légèrement pour chevaucher la bannière */}
                    <Text className="text-white text-3xl font-extrabold mb-1">
                        {media.title}
                    </Text>

                    {/* Métadonnées (Année, Note) */}
                    <View className="flex-row items-center mb-4">
                        <Text className="text-gray-400 font-semibold mr-4">{media.year}</Text>

                        {/* Note avec icône de flamme */}
                        <View className="flex-row items-center bg-gray-700/50 rounded-full px-3 py-1">
                            <Icon name="star" size={14} color="#FFD700" className="mr-1" />
                            <Text className="text-white text-sm font-bold mr-1">{media.rating}</Text>
                            <Icon name="flame" size={14} color="#FF4500" />
                        </View>
                    </View>

                    {/* Boutons d'Action */}
                    <View className="flex-row mb-6">
                        <TouchableOpacity
                            onPress={() => console.log('Lancer la lecture')}
                            className="flex-row items-center justify-center bg-red-600 rounded-lg py-3 flex-1 mr-3"
                        >
                            <Icon name="play" size={20} color="#FFFFFF" className="mr-2" />
                            <Text className="text-white text-lg font-bold">Play Now</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => console.log('Ajouter à la liste')}
                            className="flex-row items-center justify-center border border-gray-600 rounded-lg py-3 px-6 bg-gray-800/70"
                        >
                            <Icon name="add-outline" size={20} color="#FFFFFF" />
                        </TouchableOpacity>
                    </View>

                    {/* --- 3. Synopsis --- */}
                    <Text className="text-white text-lg font-bold mb-2">Synopsis</Text>
                    <Text className="text-gray-300 text-base leading-relaxed mb-6">
                        {media.synopsis}
                    </Text>

                    {/* --- 4. Acteurs --- */}
                    <Text className="text-white text-lg font-bold mb-3">Acteurs & Casting</Text>
                    <CastRow cast={media.cast} />

                    {/* --- 5. Contenus Similaires --- */}
                    <View className="mt-8 mb-20">
                        <Row title="Plus comme ça" mediaList={mockSimilarMedia} />
                    </View>

                </View>

            </ScrollView>
        </SafeAreaView>
    );
};

export default DetailScreen;