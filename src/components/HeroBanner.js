import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// Assurez-vous d'avoir installé react-native-vector-icons
import Icon from 'react-native-vector-icons/Ionicons';

const HeroBanner = ({ media, onPlayPress, onInfoPress }) => {
    // Si aucune image n'est fournie, affichez un fond sombre par défaut
    const backgroundSource = media.backgroundImage
        ? { uri: media.backgroundImage }
        : require('../../assets/images/SNORT.jpg'); // Mettez votre chemin d'image par défaut ici

    return (
        // 1. Conteneur principal avec hauteur définie
        // Remplacement de la classe Tailwind par style={styles.mainContainer}
        <View style={styles.mainContainer}>
            <ImageBackground
                source={backgroundSource}
                resizeMode="cover"
                // Remplacement de la classe Tailwind par style={styles.imageBackground}
                style={styles.imageBackground}
            >
                {/* 2. Dégradé sombre pour améliorer la lisibilité du texte inférieur */}
                {/* Remplacement de la classe Tailwind par style={styles.overlay} et styles.contentContainer */}
                <View style={styles.overlay}>
                    <View style={styles.contentContainer}>

                        {/* 3. Titre du Contenu */}
                        {/* Remplacement de la classe Tailwind par style={styles.titleText} */}
                        <Text style={styles.titleText} numberOfLines={2}>
                            {media.title || "Titre du Média"}
                        </Text>

                        {/* 4. Groupe de Boutons */}
                        {/* Remplacement de la classe Tailwind par style={styles.buttonGroup} */}
                        <View style={styles.buttonGroup}>

                            {/* Bouton Principal: Play Now (Rouge vif) */}
                            {/* Remplacement de la classe Tailwind par style={styles.playButton} */}
                            <TouchableOpacity
                                onPress={onPlayPress}
                                style={styles.playButton}
                            >
                                <Icon name="play" size={18} color="#FFFFFF" style={styles.iconMargin} />
                                <Text style={styles.playButtonText}>
                                    Play Now
                                </Text>
                            </TouchableOpacity>

                            {/* Bouton Secondaire: Add to Watchlist (Fond sombre/transparent) */}
                            {/* Remplacement de la classe Tailwind par style={styles.infoButton} */}
                            <TouchableOpacity
                                onPress={onInfoPress}
                                style={styles.infoButton}
                            >
                                <Icon name="list-outline" size={18} color="#FFFFFF" style={styles.iconMargin} />
                                <Text style={styles.infoButtonText}>
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

// --- Définition des Styles (équivalents CSS) ---
const styles = StyleSheet.create({
    // Équivalent de: w-full h-[550px] bg-gray-900
    mainContainer: {
        width: '100%',
        height: 550,
        backgroundColor: '#1f2937', // bg-gray-900
    },

    // Équivalent de: flex-1 justify-end
    imageBackground: {
        flex: 1,
        justifyContent: 'flex-end',
    },

    // Équivalent de: absolute inset-0 bg-black/30
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        // bg-black/30 (noir avec opacité 30%)
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },

    // Équivalent de: flex-1 justify-end p-6
    contentContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        padding: 24, // p-6 (24 unités)
    },

    // Équivalent de: text-white text-4xl font-extrabold mb-2
    titleText: {
        color: 'white',
        fontSize: 36,        // text-4xl
        fontWeight: '900',   // font-extrabold
        marginBottom: 8,     // mb-2 (8 unités)
    },

    // Équivalent de: flex-row mt-4
    buttonGroup: {
        flexDirection: 'row',
        marginTop: 16, // mt-4 (16 unités)
    },

    // Styles pour les boutons
    // Équivalent de: flex-row items-center justify-center bg-red-600 rounded-lg py-3 px-6 shadow-xl mr-3
    playButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#DC2626', // bg-red-600
        borderRadius: 8,            // rounded-lg
        paddingVertical: 12,        // py-3
        paddingHorizontal: 24,      // px-6
        marginRight: 12,            // mr-3
        // Le style shadow est géré différemment sur iOS/Android, nous utilisons ici un shadowOffset/Radius de base
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 6, // Pour Android
    },

    // Équivalent de: text-white text-lg font-bold
    playButtonText: {
        color: 'white',
        fontSize: 18, // text-lg
        fontWeight: 'bold',
    },

    // Équivalent de: flex-row items-center justify-center bg-gray-700/80 rounded-lg py-3 px-5 border border-gray-600
    infoButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        // bg-gray-700/80 (gris sombre avec opacité 80%)
        backgroundColor: 'rgba(55, 65, 81, 0.8)',
        borderRadius: 8, // rounded-lg
        paddingVertical: 12, // py-3
        paddingHorizontal: 20, // px-5 (légèrement moins que px-6)
        borderWidth: 1, // border
        borderColor: '#4b5563', // border-gray-600
    },

    // Équivalent de: text-white text-lg font-semibold
    infoButtonText: {
        color: 'white',
        fontSize: 18, // text-lg
        fontWeight: '600', // font-semibold
    },

    // Équivalent de: mr-2 pour les icônes à l'intérieur des boutons
    iconMargin: {
        marginRight: 8, // mr-2
    }
});

export default HeroBanner;