import { ImageBackground, Text, TouchableOpacity, View } from 'react-native';
// Assurez-vous d'avoir installé react-native-vector-icons
import Icon from 'react-native-vector-icons/Ionicons';

const HeroBanner = ({ media, onPlayPress, onInfoPress }) => {
    // Si aucune image n'est fournie, affichez un fond sombre par défaut
    const backgroundSource = media.backgroundImage
        ? { uri: media.backgroundImage }
        : require('../../assets/default-banner.png'); // Mettez votre chemin d'image par défaut ici

    return (
        // 1. Conteneur principal avec hauteur définie
        <View className="w-full h-[550px] bg-gray-900">
            <ImageBackground
                source={backgroundSource}
                resizeMode="cover"
                className="flex-1 justify-end"
            >
                {/* 2. Dégradé sombre pour améliorer la lisibilité du texte inférieur */}
                <View className="absolute inset-0 bg-black/30">
                    <View className="flex-1 justify-end p-6">

                        {/* 3. Titre du Contenu */}
                        <Text className="text-white text-4xl font-extrabold mb-2" numberOfLines={2}>
                            {media.title || "Titre du Média"}
                        </Text>

                        {/* 4. Groupe de Boutons */}
                        <View className="flex-row mt-4">

                            {/* Bouton Principal: Play Now (Rouge vif) */}
                            <TouchableOpacity
                                onPress={onPlayPress}
                                className="flex-row items-center justify-center bg-red-600 rounded-lg py-3 px-6 shadow-xl mr-3"
                            >
                                <Icon name="play" size={18} color="#FFFFFF" className="mr-2" />
                                <Text className="text-white text-lg font-bold">
                                    Play Now
                                </Text>
                            </TouchableOpacity>

                            {/* Bouton Secondaire: Add to Watchlist (Fond sombre/transparent) */}
                            <TouchableOpacity
                                onPress={onInfoPress}
                                className="flex-row items-center justify-center bg-gray-700/80 rounded-lg py-3 px-5 border border-gray-600"
                            >
                                <Icon name="list-outline" size={18} color="#FFFFFF" className="mr-2" />
                                <Text className="text-white text-lg font-semibold">
                                    Ma Liste
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
};

export default HeroBanner;