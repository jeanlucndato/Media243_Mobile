import { useRoute } from '@react-navigation/native';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text } from 'react-native';

const DetailPage = () => {
    const route = useRoute();
    const { id } = route.params; // Récupère l'ID passé depuis la navigation

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="light-content" backgroundColor="#000" />
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.title}>Détail du Média</Text>
                <Text style={styles.mediaId}>ID du Média : {id}</Text>
                <Text style={styles.placeholderText}>
                    Ici s'afficheront le lecteur vidéo, la description, les saisons/épisodes, et la distribution.
                </Text>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#000',
    },
    container: {
        paddingHorizontal: 15,
        paddingVertical: 30,
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#E50914',
        marginBottom: 20,
    },
    mediaId: {
        fontSize: 18,
        color: '#A0A0A0',
        marginBottom: 30,
    },
    placeholderText: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginTop: 50,
    }
});

export default DetailPage;