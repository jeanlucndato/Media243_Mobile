import { useNavigation } from '@react-navigation/native'; // Pour la navigation
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, View } from 'react-native';

import HeroBanner from '../components/HeroBanner';
import Row from '../components/Row';

// MOCK : Données pour le test (assurez-vous que poster_url est valide)
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

    // Fonction à passer à la HeroBanner
    const navigateToDetail = (id) => {
        navigation.navigate('Detail', { id });
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="light-content" backgroundColor="#000" />

            <ScrollView style={styles.scrollView}>

                {/* 1. Héro Bannière */}
                <HeroBanner
                    media={heroMedia}
                    onPlayPress={() => navigateToDetail(heroMedia.id)}
                    onInfoPress={() => navigateToDetail(heroMedia.id)}
                />

                {/* 2. Lignes de Contenu */}
                <View style={styles.rowContainer}>
                    <Row title="🔥 Tendances Actuelles" mediaList={mockMedia} />
                    <Row title="🎬 Nouveautés" mediaList={mockMedia.slice(2).concat(mockMedia.slice(0))} />
                    <Row title="⭐ Top Évalués" mediaList={mockMedia.slice(1)} />
                </View>

            </ScrollView>

            {/* NOTE : Le Header est omis ici car il est géré par le Tab Navigator,
               mais vous pourriez le réintégrer en Absolu si nécessaire. */}

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#000',
    },
    scrollView: {
        flex: 1,
    },
    rowContainer: {
        marginTop: 15,
        paddingBottom: 80, // Espace pour la barre de navigation inférieure
    }
});

export default HomePage;