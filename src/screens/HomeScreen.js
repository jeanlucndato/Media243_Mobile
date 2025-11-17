import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, ScrollView, StatusBar, View } from 'react-native';

// Importez vos composants
import AppHeader from '../components/AppHeader'; // NOUVEL IMPORT : Pour l'en-tête
import HeroBanner from '../components/HeroBanner';
import Row from '../components/Row';

// MOCK : Données pour le test
const mockMedia = [
    { id: 1, title: "Héritage 243", poster_url: 'https://via.placeholder.com/150x225/B82329/FFFFFF?text=F1', rating: '9.2' },
    { id: 2, title: "Kin Nights", poster_url: 'https://via.placeholder.com/150x225/404040/FFFFFF?text=F2', rating: '8.5' },
    { id: 3, title: "La Nuit du Congo", poster_url: 'https://via.placeholder.com/150x225/222222/FFFFFF?text=F3', rating: '8.8' },
    { id: 4, title: "RDC Stories", poster_url: 'https://via.placeholder.com/150x225/555555/FFFFFF?text=F4', rating: '7.9' },
    { id: 5, title: "Saga de Goma", poster_url: 'https://via.placeholder.com/150x225/888888/FFFFFF?text=F5', rating: '8.1' },
];

const HomePage = () => {
    const navigation = useNavigation();

    // Utilisez les classes Tailwind pour le design de la bannière
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
        // 🚨 Changement : Remplacement de style={styles.safeArea} par des classes Tailwind
        <SafeAreaView className="flex-1 bg-black">
            {/* Définition de la barre de statut (l'arrière-plan noir est géré par la SafeAreaView) */}
            <StatusBar barStyle="light-content" />

            {/* 0. En-tête qui flotte au-dessus du contenu */}
            {/* L'en-tête est en position absolue ou est le premier élément de la ScrollView */}
            <AppHeader navigation={navigation} />

            {/* 🚨 Changement : Remplacement de style={styles.scrollView} par des classes Tailwind */}
            <ScrollView className="flex-1">

                {/* 1. Héro Bannière */}
                <HeroBanner
                    media={heroMedia}
                    onPlayPress={() => navigateToDetail(heroMedia.id)}
                    onInfoPress={() => navigateToDetail(heroMedia.id)}
                />

                {/* 2. Lignes de Contenu */}
                {/* 🚨 Changement : Remplacement de style={styles.rowContainer} par des classes Tailwind */}
                <View className="mt-4 pb-20">
                    <Row title="🔥 Tendances Actuelles" mediaList={mockMedia} />
                    <Row title="🎬 Nouveautés" mediaList={mockMedia.slice(2).concat(mockMedia.slice(0))} />
                    <Row title="⭐ Top Évalués" mediaList={mockMedia.slice(1)} />
                </View>

            </ScrollView>
        </SafeAreaView>
    );
};

export default HomePage;