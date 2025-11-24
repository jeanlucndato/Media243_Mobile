import { useNavigation } from '@react-navigation/native';
import { FlatList, Image, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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
        // Remplacement de la classe Tailwind par style={styles.itemWrapper}
        <TouchableOpacity
            onPress={() => navigation.navigate('Detail', { id: item.id })}
            style={styles.itemWrapper}
        >
            {/* Remplacement de la classe Tailwind par style={styles.posterContainer} */}
            <View style={styles.posterContainer}>
                {/* Remplacement de la classe Tailwind par style={styles.posterImage} */}
                <Image
                    source={{ uri: item.poster_url }}
                    style={styles.posterImage}
                    resizeMode="cover"
                />
                {/* Overlay pour le titre */}
                {/* Remplacement de la classe Tailwind par style={styles.titleOverlay} */}
                <View style={styles.titleOverlay}>
                    {/* Remplacement de la classe Tailwind par style={styles.titleText} */}
                    <Text style={styles.titleText} numberOfLines={1}>
                        {item.title}
                    </Text>
                </View>
                {/* Icône de suppression facile */}
                {/* Remplacement de la classe Tailwind par style={styles.deleteButton} */}
                <TouchableOpacity
                    onPress={() => console.log('Supprimer', item.id)}
                    style={styles.deleteButton}
                >
                    <Icon name="close" size={14} color="#FFFFFF" />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );

    const renderEmptyList = () => (
        // Remplacement des classes Tailwind par style={styles.emptyContainer}
        <View style={styles.emptyContainer}>
            <Icon name="list-outline" size={80} color="#555" />
            {/* Remplacement des classes Tailwind par style={styles.emptyTitle} */}
            <Text style={styles.emptyTitle}>
                Votre Liste est vide
            </Text>
            {/* Remplacement des classes Tailwind par style={styles.emptyMessage} */}
            <Text style={styles.emptyMessage}>
                Ajoutez des films et séries pour les retrouver facilement ici !
            </Text>
            {/* Remplacement des classes Tailwind par style={styles.exploreButton} et styles.exploreButtonText */}
            <TouchableOpacity
                onPress={() => navigation.navigate('Home')}
                style={styles.exploreButton}
            >
                <Text style={styles.exploreButtonText}>Explorer le Contenu</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        // Remplacement de la classe Tailwind par style={styles.safeArea}
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="light-content" />

            {/* Header simple pour "Ma Liste" */}
            {/* Remplacement des classes Tailwind par style={styles.header} */}
            <View style={styles.header}>
                {/* Remplacement des classes Tailwind par style={styles.headerTitle} */}
                <Text style={styles.headerTitle}>
                    Ma <Text style={styles.headerTitleRed}>Liste</Text>
                </Text>
            </View>

            {/* Contenu principal (Grille ou Message Vide) */}
            <FlatList
                data={watchlistMedia}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                numColumns={2} // Affichage en deux colonnes
                columnWrapperStyle={styles.columnWrapper}
                ListEmptyComponent={renderEmptyList}
                contentContainerStyle={styles.listContent}
            />
        </SafeAreaView>
    );
};

// --- Définition des Styles (équivalents CSS) ---
const styles = StyleSheet.create({
    // Styles de l'écran principal
    // Équivalent de: flex-1 bg-black
    safeArea: {
        flex: 1,
        backgroundColor: 'black',
    },

    // Styles de l'en-tête
    // Équivalent de: flex-row items-center justify-center p-4 border-b border-gray-800
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16, // p-4
        borderBottomWidth: 1,
        borderColor: '#1f2937', // border-gray-800
    },
    // Équivalent de: text-white text-2xl font-bold
    headerTitle: {
        color: 'white',
        fontSize: 24, // text-2xl
        fontWeight: 'bold',
    },
    // Équivalent de: text-red-600
    headerTitleRed: {
        color: '#DC2626', // red-600
    },

    // Styles de la FlatList
    columnWrapper: {
        justifyContent: 'space-between',
        paddingHorizontal: 8, // Ajustement pour l'espacement entre les bords
    },
    listContent: {
        paddingVertical: 10,
        paddingBottom: 80, // Espace pour la barre de navigation inférieure (si elle existe)
    },

    // Styles d'une vignette (renderItem)
    // Équivalent de: w-1/2 p-2
    itemWrapper: {
        width: '50%', // w-1/2
        padding: 8, // p-2
    },
    // Équivalent de: relative w-full aspect-[2/3] rounded-lg overflow-hidden shadow-lg
    posterContainer: {
        position: 'relative', // relative
        width: '100%', // w-full
        aspectRatio: 2 / 3, // aspect-[2/3]
        borderRadius: 8, // rounded-lg
        overflow: 'hidden', // overflow-hidden
        // Shadow (ombre) - Implémentation multi-plateforme
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10, // Pour Android (shadow-lg)
    },
    // Équivalent de: w-full h-full
    posterImage: {
        width: '100%',
        height: '100%',
    },
    // Overlay pour le titre
    // Équivalent de: absolute bottom-0 w-full p-2 bg-black/50
    titleOverlay: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        padding: 8, // p-2
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // bg-black/50
    },
    // Équivalent de: text-white text-xs font-semibold
    titleText: {
        color: 'white',
        fontSize: 12, // text-xs
        fontWeight: '600', // font-semibold
    },
    // Icône de suppression
    // Équivalent de: absolute top-1 right-1 bg-red-600 rounded-full p-1
    deleteButton: {
        position: 'absolute',
        top: 4, // top-1
        right: 4, // right-1
        backgroundColor: '#DC2626', // bg-red-600
        borderRadius: 9999, // rounded-full
        padding: 4, // p-1
        zIndex: 1, // Assurez-vous qu'il est au-dessus de l'image
    },

    // Styles de la liste vide (renderEmptyList)
    // Équivalent de: flex-1 items-center justify-center mt-20 p-4
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 80, // mt-20
        padding: 16, // p-4
    },
    // Équivalent de: text-gray-400 text-xl font-bold mt-4
    emptyTitle: {
        color: '#9ca3af', // text-gray-400
        fontSize: 20, // text-xl
        fontWeight: 'bold',
        marginTop: 16, // mt-4
    },
    // Équivalent de: text-gray-500 text-base text-center mt-2
    emptyMessage: {
        color: '#6b7280', // text-gray-500
        fontSize: 16, // text-base
        textAlign: 'center',
        marginTop: 8, // mt-2
    },
    // Équivalent de: mt-6 bg-red-600 rounded-lg py-3 px-6
    exploreButton: {
        marginTop: 24, // mt-6
        backgroundColor: '#DC2626', // bg-red-600
        borderRadius: 8, // rounded-lg
        paddingVertical: 12, // py-3
        paddingHorizontal: 24, // px-6
    },
    // Équivalent de: text-white font-bold
    exploreButtonText: {
        color: 'white',
        fontWeight: 'bold',
    }
});

export default MyListScreen;