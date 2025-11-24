import { useNavigation } from '@react-navigation/native';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// --- Composant 1: MediaCard (Vignette individuelle) ---
const MediaCard = ({ media, navigation }) => (
    // Remplacement de la classe Tailwind par style={styles.cardContainer}
    <TouchableOpacity
        onPress={() => navigation.navigate('Detail', { id: media.id })}
        style={styles.cardContainer}
    >
        <Image
            source={{ uri: media.poster_url }}
            // Remplacement de la classe Tailwind par style={styles.cardImage}
            style={styles.cardImage}
            resizeMode="cover"
        />
        {/* Overlay pour le titre */}
        {/* Remplacement de la classe Tailwind par style={styles.titleOverlay} */}
        <View style={styles.titleOverlay}>
            {/* Remplacement de la classe Tailwind par style={styles.titleText} */}
            <Text style={styles.titleText} numberOfLines={1}>
                {media.title}
            </Text>
        </View>
    </TouchableOpacity>
);

// --- Composant 2: Row (Ligne Horizontale) ---
const Row = ({ title, mediaList = [] }) => {
    const navigation = useNavigation();

    if (!mediaList || mediaList.length === 0) {
        return null;
    }

    return (
        // Remplacement de la classe Tailwind par style={styles.rowContainer}
        <View style={styles.rowContainer}>
            {/* Titre de la Ligne */}
            {/* Remplacement de la classe Tailwind par style={styles.rowTitle} */}
            <Text style={styles.rowTitle}>
                {title}
            </Text>

            {/* Liste Défilante Horizontale */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollViewContent}
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

// --- Définition des Styles (équivalents CSS) ---
const styles = StyleSheet.create({
    // Styles pour MediaCard
    // Équivalent de: mr-3 w-28 h-44 rounded-md overflow-hidden bg-gray-800 shadow-md
    cardContainer: {
        marginRight: 12,        // mr-3 (12 unités)
        width: 112,             // w-28 (112 unités)
        height: 176,            // h-44 (176 unités)
        borderRadius: 6,        // rounded-md
        overflow: 'hidden',     // overflow-hidden
        backgroundColor: '#1f2937', // bg-gray-800
        // Shadow (ombre) - Implémentation multi-plateforme
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5, // Pour Android
    },

    // Équivalent de: w-full h-full
    cardImage: {
        width: '100%',
        height: '100%',
    },

    // Équivalent de: absolute bottom-0 w-full p-1 bg-black/50
    titleOverlay: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        padding: 4, // p-1 (4 unités)
        // bg-black/50 (Noir avec opacité 50%)
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },

    // Équivalent de: text-white text-xs
    titleText: {
        color: 'white',
        fontSize: 12, // text-xs
    },

    // Styles pour Row
    // Équivalent de: mb-6
    rowContainer: {
        marginBottom: 24, // mb-6 (24 unités)
    },

    // Équivalent de: text-white text-xl font-bold mb-3 px-4
    rowTitle: {
        color: 'white',
        fontSize: 20,       // text-xl
        fontWeight: 'bold', // font-bold
        marginBottom: 12,   // mb-3 (12 unités)
        paddingHorizontal: 16, // px-4 (16 unités)
    },

    // Équivalent de: contentContainerStyle={{ paddingHorizontal: 16 }}
    scrollViewContent: {
        paddingHorizontal: 16,
    }
});

export default Row;