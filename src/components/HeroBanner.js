import { Ionicons } from '@expo/vector-icons';
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Placeholder pour l'image de fond
const DEFAULT_BACKGROUND = 'https://via.placeholder.com/1080x600/1C1C1C/FFFFFF?text=Bannière+Principale';

const HeroBanner = ({ media, onPlayPress, onInfoPress }) => {
    // Utiliser un mock si 'media' n'est pas fourni (pour le développement)
    const currentMedia = media || {
        title: "Le Cœur de l'Afrique",
        description: "Plongez dans un drame historique captivant sur les rives du lac Kivu. Un Media243 Original à ne pas manquer.",
        backgroundImage: DEFAULT_BACKGROUND,
        rating: '9.2',
        genre: 'Drame, Historique',
    };

    return (
        <ImageBackground
            source={{ uri: currentMedia.backgroundImage }}
            style={styles.container}
            resizeMode="cover"
        >
            {/* Gradient pour améliorer la lisibilité du texte */}
            <View style={styles.gradientOverlay} />

            <View style={styles.content}>
                <Text style={styles.title}>{currentMedia.title}</Text>
                <Text style={styles.infoText}>{currentMedia.rating} | {currentMedia.genre}</Text>

                <View style={styles.buttonContainer}>
                    {/* Bouton PRINCIPAL : Lire/Play */}
                    <TouchableOpacity style={styles.playButton} onPress={onPlayPress}>
                        <Ionicons name="play" size={20} color="black" />
                        <Text style={styles.playButtonText}>Lire</Text>
                    </TouchableOpacity>

                    {/* Bouton SECONDAIRE : Info */}
                    <TouchableOpacity style={styles.infoButton} onPress={onInfoPress}>
                        <Ionicons name="information-circle-outline" size={20} color="white" />
                        <Text style={styles.infoButtonText}>Infos</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 450, // Hauteur fixe pour l'immersion sur mobile
        justifyContent: 'flex-end',
    },
    gradientOverlay: {
        ...StyleSheet.absoluteFillObject,
        // Gradient allant du bas vers le haut
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        // Simuler un fort gradient en bas pour le texte
        paddingTop: '50%',
        paddingBottom: 0,
    },
    content: {
        paddingHorizontal: 15,
        paddingBottom: 30,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 8,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
    },
    infoText: {
        fontSize: 14,
        color: '#A0A0A0',
        marginBottom: 15,
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    playButton: {
        flexDirection: 'row',
        backgroundColor: 'white',
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 4,
        alignItems: 'center',
        marginRight: 10,
    },
    playButtonText: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 5,
    },
    infoButton: {
        flexDirection: 'row',
        backgroundColor: 'rgba(109, 109, 110, 0.7)', // Gris semi-transparent
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 4,
        alignItems: 'center',
    },
    infoButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 5,
    },
});

export default HeroBanner;