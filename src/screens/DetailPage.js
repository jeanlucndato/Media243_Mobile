import { useNavigation, useRoute } from '@react-navigation/native';
import { Image, SafeAreaView, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

// Composants (vous devrez les créer : Row, CastRow)
import CastRow from '../components/CastRow';
import Row from '../components/Row';

// MOCK DATA (Le reste des données reste identique)
const mockDetail = {
    // ... vos données mockées ...
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
    { id: 12, title: "Docu Similaire 3", poster_url: 'https://via.placeholder.com/150x222/222222/FFFFFF?text=S3' },
];


const DetailScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { id } = route.params;

    const media = mockDetail;

    return (
        <SafeAreaView className="flex-1 bg-black">
            <StatusBar barStyle="light-content" />

            <ScrollView className="flex-1">

                {/* --- 1. Bannière du Contenu et En-tête de Retour --- */}
                <View className="w-full h-[450px] relative"> {/* ⬅️ Augmenter la hauteur pour plus d'impact */}
                    <Image
                        source={{ uri: media.backdrop_url }}
                        className="w-full h-full"
                        resizeMode="cover"
                    />

                    {/* Dégradé PLUS PRONONCÉ et étendu (du bas vers le haut) */}
                    <View className="absolute inset-0">
                        {/* Dégradé bas : essentiel pour fusionner avec le fond noir */}
                        <View className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent" />
                        {/* Dégradé haut : pour contraster le header */}
                        <View className="absolute top-0 w-full h-1/4 bg-gradient-to-b from-black/80 to-transparent" />
                    </View>


                    {/* Header de retour (maintenu en absolu) */}
                    <View className="absolute top-0 w-full p-4 flex-row justify-between items-center mt-6 z-10"> {/* ⬅️ Ajout de z-10 */}
                        <TouchableOpacity onPress={() => navigation.goBack()} className="p-1">
                            <Icon name="arrow-back-outline" size={30} color="#FFFFFF" />
                        </TouchableOpacity>

                        <Text className="text-white text-xl font-bold">
                            Media<Text className="text-red-600">243</Text>
                        </Text>

                        <View className="w-8" />
                    </View>
                </View>

                {/* --- 2. Informations et Boutons --- */}
                {/* ⬅️ Réduire le chevauchement et ajouter du padding latéral pour le titre */}
                <View className="p-4 -mt-16">

                    {/* Le titre est maintenant centré par rapport à la zone de chevauchement */}
                    <View className="pb-4">
                        <Text className="text-white text-4xl font-extrabold mb-2"> {/* ⬅️ Plus grand titre */}
                            {media.title}
                        </Text>

                        {/* Métadonnées (Année, Note) */}
                        <View className="flex-row items-center">
                            {/* ⬅️ Utiliser un petit espacement entre les éléments */}
                            <Text className="text-gray-400 font-semibold mr-3 text-sm">{media.year}</Text>
                            <Text className="text-gray-400 font-semibold mr-3 text-sm">Action, Drame</Text>

                            {/* Note avec icône de flamme */}
                            <View className="flex-row items-center">
                                <Icon name="star" size={16} color="#FFD700" className="mr-1" />
                                <Text className="text-white text-base font-bold mr-1">{media.rating}</Text>
                            </View>
                        </View>
                    </View>


                    {/* Boutons d'Action (maintenus pour le style Netflix) */}
                    <View className="flex-row mb-6">
                        <TouchableOpacity
                            onPress={() => console.log('Lancer la lecture')}
                            className="flex-row items-center justify-center bg-red-600 rounded-lg py-3 flex-1 mr-3"
                        >
                            <Icon name="play" size={20} color="#FFFFFF" className="mr-2" />
                            <Text className="text-white text-lg font-bold">Play Now</Text>
                        </TouchableOpacity>

                        {/* Bouton pour 'Ma Liste' avec l'icône de partage/téléchargement pour plus de fonctionnalités Netflix-like */}
                        <TouchableOpacity
                            onPress={() => console.log('Ajouter à la liste')}
                            className="flex-col items-center justify-center p-3 bg-gray-800/70 rounded-lg ml-2"
                        >
                            <Icon name="add-outline" size={24} color="#FFFFFF" />
                            <Text className="text-gray-400 text-xs mt-1">Ma Liste</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => console.log('Télécharger')}
                            className="flex-col items-center justify-center p-3 bg-gray-800/70 rounded-lg ml-2"
                        >
                            <Icon name="download-outline" size={24} color="#FFFFFF" />
                            <Text className="text-gray-400 text-xs mt-1">Télécharger</Text>
                        </TouchableOpacity>
                    </View>

                    {/* --- 3. Synopsis --- */}
                    <Text className="text-white text-lg font-bold mb-2 mt-4">Synopsis</Text>
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