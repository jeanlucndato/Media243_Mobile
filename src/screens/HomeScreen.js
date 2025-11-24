import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, View } from 'react-native';

// Importez vos composants (maintenant tous convertis)
import AppHeader from '../components/AppHeader';
import HeroBanner from '../components/HeroBanner';
import Row from '../components/Row';

// MOCK : Données pour le test (identiques)
const mockMedia = [
    { id: 1, title: "Héritage 243", poster_url: 'https://via.placeholder.com/150x225/B82329/FFFFFF?text=F1', rating: '9.2' },
    { id: 2, title: "Kin Nights", poster_url: 'https://via.placeholder.com/150x225/404040/FFFFFF?text=F2', rating: '8.5' },
    { id: 3, title: "La Nuit du Congo", poster_url: 'https://via.placeholder.com/150x225/222222/FFFFFF?text=F3', rating: '8.8' },
    { id: 4, title: "RDC Stories", poster_url: 'https://via.placeholder.com/150x225/555555/FFFFFF?text=F4', rating: '7.9' },
    { id: 5, title: "Saga de Goma", poster_url: 'https://via.placeholder.com/150x225/888888/FFFFFF?text=F5', rating: '8.1' },
];

const HomePage = () => {
    const navigation = useNavigation();

    const heroMedia = {
        id: 99,
        title: "Le Cœur de l'Afrique",
        backgroundImage: 'https://via.placeholder.com/1080x600/1C1C1C/FFFFFF?text=Bannière+Principale',
        // Ajoutez d'autres détails ici
    };

    const navigateToDetail = (id) => {
        navigation.navigate('Detail', { id });
    };

    return (
        // Remplacement de la classe Tailwind par style={styles.safeArea}
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="light-content" />

            {/* 0. En-tête qui flotte au-dessus du contenu */}
            {/* Remplacement de la classe Tailwind par style={styles.headerAbsolute} */}
            <View style={styles.headerAbsolute}>
                <AppHeader navigation={navigation} />
            </View>

            {/* Remplacement de la classe Tailwind par style={styles.scrollView} */}
            <ScrollView style={styles.scrollView}>

                {/* 1. Héro Bannière */}
                <HeroBanner
                    media={heroMedia}
                    onPlayPress={() => navigateToDetail(heroMedia.id)}
                    onInfoPress={() => navigateToDetail(heroMedia.id)}
                />

                {/* 2. Lignes de Contenu */}
                {/* Remplacement de la classe Tailwind par style={styles.rowsContainer} */}
                <View style={styles.rowsContainer}>
                    <Row title="🔥 Tendances Actuelles" mediaList={mockMedia} />
                    <Row title="🎬 Nouveautés" mediaList={mockMedia.slice(2).concat(mockMedia.slice(0))} />
                    <Row title="⭐ Top Évalués" mediaList={mockMedia.slice(1)} />
                    <Row title="✨ Séries Originales" mediaList={mockMedia} />
                </View>

            </ScrollView>
        </SafeAreaView>
    );
};

// --- Définition des Styles (équivalents CSS) ---
const styles = StyleSheet.create({
    // Équivalent de: flex-1 bg-black
    safeArea: {
        flex: 1,
        backgroundColor: 'black',
    },
    // Équivalent de: flex-1
    scrollView: {
        flex: 1,
    },

    // 0. En-tête Absolu
    // Équivalent de: absolute top-0 w-full z-20
    headerAbsolute: {
        position: 'absolute', // absolute
        top: 0,
        width: '100%', // w-full
        zIndex: 20, // z-20
    },

    // 2. Conteneur des Lignes
    // Équivalent de: mt-4 pb-20
    rowsContainer: {
        marginTop: 16, // mt-4
        paddingBottom: 80, // pb-20
    }
});

export default HomePage;