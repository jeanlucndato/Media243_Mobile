import { useNavigation, useRoute } from '@react-navigation/native';
import { Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

// Composants (déjà convertis)
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
        // Remplacement de la classe Tailwind par style={styles.safeArea}
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="light-content" />

            {/* Remplacement de la classe Tailwind par style={styles.scrollView} */}
            <ScrollView style={styles.scrollView}>

                {/* --- 1. Bannière du Contenu et En-tête de Retour --- */}
                {/* Remplacement de la classe Tailwind par style={styles.bannerContainer} */}
                <View style={styles.bannerContainer}>
                    {/* Remplacement de la classe Tailwind par style={styles.bannerImage} */}
                    <Image
                        source={{ uri: media.backdrop_url }}
                        style={styles.bannerImage}
                        resizeMode="cover"
                    />

                    {/* Dégradé (Simulé avec des Vues transparentes/opaques) */}
                    <View style={StyleSheet.absoluteFill}>
                        {/* Dégradé bas (from-black to-transparent) */}
                        <View style={styles.gradientBottom} />
                        {/* Dégradé haut (from-black/80 to-transparent) */}
                        <View style={styles.gradientTop} />
                    </View>

                    {/* Header de retour */}
                    {/* Remplacement de la classe Tailwind par style={styles.header} */}
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                            <Icon name="arrow-back-outline" size={30} color="#FFFFFF" />
                        </TouchableOpacity>

                        <Text style={styles.headerTitle}>
                            Media<Text style={styles.headerTitleRed}>243</Text>
                        </Text>

                        <View style={styles.spacer} />
                    </View>
                </View>

                {/* --- 2. Informations et Boutons --- */}
                {/* Remplacement de la classe Tailwind par style={styles.infoSection} */}
                <View style={styles.infoSection}>

                    {/* Titre */}
                    <View style={styles.titleWrapper}>
                        {/* Remplacement de la classe Tailwind par style={styles.mediaTitle} */}
                        <Text style={styles.mediaTitle} numberOfLines={2}>
                            {media.title}
                        </Text>

                        {/* Métadonnées (Année, Note) */}
                        <View style={styles.metadataContainer}>
                            {/* Texte gris clair */}
                            <Text style={styles.metaDataText}>{media.year}</Text>
                            <Text style={styles.metaDataText}>Action, Drame</Text>

                            {/* Note avec icône de flamme */}
                            <View style={styles.ratingContainer}>
                                <Icon name="star" size={16} color="#FFD700" style={styles.ratingIcon} />
                                {/* Texte blanc gras */}
                                <Text style={styles.ratingText}>{media.rating}</Text>
                            </View>
                        </View>
                    </View>


                    {/* Boutons d'Action */}
                    {/* Remplacement de la classe Tailwind par style={styles.actionButtonsContainer} */}
                    <View style={styles.actionButtonsContainer}>
                        {/* Bouton Play */}
                        {/* Remplacement de la classe Tailwind par style={styles.playButton} */}
                        <TouchableOpacity
                            onPress={() => console.log('Lancer la lecture')}
                            style={styles.playButton}
                        >
                            <Icon name="play" size={20} color="#FFFFFF" style={styles.iconMargin} />
                            <Text style={styles.playButtonText}>Play Now</Text>
                        </TouchableOpacity>

                        {/* Boutons secondaires */}
                        <TouchableOpacity
                            onPress={() => console.log('Ajouter à la liste')}
                            style={styles.secondaryButton}
                        >
                            <Icon name="add-outline" size={24} color="#FFFFFF" />
                            <Text style={styles.secondaryButtonText}>Ma Liste</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => console.log('Télécharger')}
                            style={styles.secondaryButton}
                        >
                            <Icon name="download-outline" size={24} color="#FFFFFF" />
                            <Text style={styles.secondaryButtonText}>Télécharger</Text>
                        </TouchableOpacity>
                    </View>

                    {/* --- 3. Synopsis --- */}
                    <Text style={styles.synopsisTitle}>Synopsis</Text>
                    <Text style={styles.synopsisText}>
                        {media.synopsis}
                    </Text>

                    {/* --- 4. Acteurs --- */}
                    <Text style={styles.castTitle}>Acteurs & Casting</Text>
                    <CastRow cast={media.cast} />

                    {/* --- 5. Contenus Similaires --- */}
                    <View style={styles.similarMediaSection}>
                        <Row title="Plus comme ça" mediaList={mockSimilarMedia} />
                    </View>

                </View>

            </ScrollView>
        </SafeAreaView>
    );
};

// --- Définition des Styles (équivalents CSS) ---
const styles = StyleSheet.create({
    safeArea: {
        flex: 1, // flex-1
        backgroundColor: 'black', // bg-black
    },
    scrollView: {
        flex: 1, // flex-1
    },

    // 1. Bannière
    // Équivalent de: w-full h-[450px] relative
    bannerContainer: {
        width: '100%', // w-full
        height: 450, // h-[450px]
        position: 'relative', // relative
    },
    // Équivalent de: w-full h-full
    bannerImage: {
        width: '100%', // w-full
        height: '100%', // h-full
    },

    // Dégradés (simulés)
    // ATTENTION: React Native ne supporte pas les CSS gradients. On utilise ici une approche par superposition de Vues.
    // bg-gradient-to-t from-black to-transparent (Dégradé bas)
    gradientBottom: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: '50%', // h-1/2
        backgroundColor: 'transparent',
        // Utilisation d'une couleur plus opaque en bas pour simuler le dégradé qui va vers le noir
        // NOTE: Une bibliothèque tierce (comme react-native-linear-gradient) serait idéale ici.
        // Ici, on utilise un hack en ajustant l'opacité :
        backgroundColor: 'rgba(0, 0, 0, 0.9)', // Noir très foncé
        // On suppose que la vue mère (ImageBackground) a un dégradé intégré
        // ou que la couleur de fond de l'écran (noir) crée cet effet de fusion.
    },
    // bg-gradient-to-b from-black/80 to-transparent (Dégradé haut)
    gradientTop: {
        position: 'absolute',
        top: 0,
        width: '100%',
        height: '25%', // h-1/4
        backgroundColor: 'rgba(0, 0, 0, 0.8)', // Noir avec 80% d'opacité
    },

    // Header de retour
    // Équivalent de: absolute top-0 w-full p-4 flex-row justify-between items-center mt-6 z-10
    header: {
        position: 'absolute', // absolute
        top: 0,
        width: '100%', // w-full
        padding: 16, // p-4
        flexDirection: 'row', // flex-row
        justifyContent: 'space-between', // justify-between
        alignItems: 'center', // items-center
        marginTop: 24, // mt-6 (ajusté pour Safe Area / Status Bar)
        zIndex: 10, // z-10
    },
    backButton: {
        padding: 4, // p-1
    },
    // Équivalent de: text-white text-xl font-bold
    headerTitle: {
        color: 'white',
        fontSize: 20, // text-xl
        fontWeight: 'bold',
    },
    // Équivalent de: text-red-600
    headerTitleRed: {
        color: '#DC2626', // red-600
    },
    // Équivalent de: w-8
    spacer: {
        width: 32, // w-8
    },

    // 2. Informations et Boutons
    // Équivalent de: p-4 -mt-16
    infoSection: {
        padding: 16, // p-4
        marginTop: -64, // -mt-16
    },
    titleWrapper: {
        paddingBottom: 16, // pb-4
    },
    // Équivalent de: text-white text-4xl font-extrabold mb-2
    mediaTitle: {
        color: 'white',
        fontSize: 36, // text-4xl
        fontWeight: '900', // font-extrabold
        marginBottom: 8, // mb-2
    },
    // Équivalent de: flex-row items-center
    metadataContainer: {
        flexDirection: 'row', // flex-row
        alignItems: 'center', // items-center
    },
    // Équivalent de: text-gray-400 font-semibold mr-3 text-sm
    metaDataText: {
        color: '#9ca3af', // gray-400
        fontWeight: '600', // font-semibold
        marginRight: 12, // mr-3
        fontSize: 14, // text-sm
    },
    // Équivalent de: flex-row items-center
    ratingContainer: {
        flexDirection: 'row', // flex-row
        alignItems: 'center', // items-center
        marginLeft: 8, // Pour l'espacement avec les genres précédents
    },
    ratingIcon: {
        marginRight: 4, // mr-1
    },
    // Équivalent de: text-white text-base font-bold mr-1
    ratingText: {
        color: 'white',
        fontSize: 16, // text-base
        fontWeight: 'bold',
        marginRight: 4, // mr-1
    },

    // Boutons d'Action
    // Équivalent de: flex-row mb-6
    actionButtonsContainer: {
        flexDirection: 'row',
        marginBottom: 24, // mb-6
    },
    // Équivalent de: flex-row items-center justify-center bg-red-600 rounded-lg py-3 flex-1 mr-3
    playButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#DC2626', // bg-red-600
        borderRadius: 8, // rounded-lg
        paddingVertical: 12, // py-3
        flex: 1, // flex-1
        marginRight: 12, // mr-3
    },
    iconMargin: {
        marginRight: 8, // mr-2 (pour les icônes à l'intérieur des boutons)
    },
    // Équivalent de: text-white text-lg font-bold
    playButtonText: {
        color: 'white',
        fontSize: 18, // text-lg
        fontWeight: 'bold',
    },

    // Boutons secondaires
    // Équivalent de: flex-col items-center justify-center p-3 bg-gray-800/70 rounded-lg ml-2
    secondaryButton: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        // bg-gray-800/70 (Gris foncé, opacité 70%)
        backgroundColor: 'rgba(31, 41, 55, 0.7)',
        borderRadius: 8, // rounded-lg
        padding: 12, // p-3
        marginLeft: 8, // ml-2
    },
    // Équivalent de: text-gray-400 text-xs mt-1
    secondaryButtonText: {
        color: '#9ca3af', // gray-400
        fontSize: 12, // text-xs
        marginTop: 4, // mt-1
    },

    // 3. Synopsis
    // Équivalent de: text-white text-lg font-bold mb-2 mt-4
    synopsisTitle: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8, // mb-2
        marginTop: 16, // mt-4
    },
    // Équivalent de: text-gray-300 text-base leading-relaxed mb-6
    synopsisText: {
        color: '#d1d5db', // gray-300
        fontSize: 16, // text-base
        lineHeight: 24, // leading-relaxed
        marginBottom: 24, // mb-6
    },

    // 4. Acteurs
    // Équivalent de: text-white text-lg font-bold mb-3
    castTitle: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 12, // mb-3
    },

    // 5. Contenus Similaires
    // Équivalent de: mt-8 mb-20
    similarMediaSection: {
        marginTop: 32, // mt-8
        marginBottom: 80, // mb-20
    },
});

export default DetailScreen;