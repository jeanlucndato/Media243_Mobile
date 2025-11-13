import { useNavigation } from '@react-navigation/native';
import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window'); // Récupère la largeur de l'écran

// Taille standard d'une affiche sur mobile pour React Native
const POSTER_WIDTH = width / 3 - 20; // Environ 1/3 de l'écran moins le padding

const Row = ({ title, mediaList }) => {
    const navigation = useNavigation();

    // Fonction de navigation vers l'écran de Détail
    const navigateToDetail = (mediaId) => {
        navigation.navigate('Detail', { id: mediaId });
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.posterContainer}
            onPress={() => navigateToDetail(item.id)}
        >
            <Image
                source={{ uri: item.poster_url }}
                style={styles.posterImage}
                // Placeholder pour le chargement ou si l'URL est invalide
                defaultSource={require('../../assets/images/android-icon-foreground.png')} // Assurez-vous d'avoir une image placeholder
            />
            {/* Optionnel : Afficher le titre au survol ou en bas */}
            {/* <Text style={styles.posterTitle}>{item.title}</Text> */}
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>

            {/* FlatList est l'équivalent optimisé du défilement horizontal en RN */}
            <FlatList
                data={mediaList}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.listContent}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        paddingHorizontal: 15,
        marginBottom: 10,
    },
    listContent: {
        paddingHorizontal: 15, // Padding à l'intérieur du conteneur de défilement
    },
    posterContainer: {
        marginRight: 8, // Espacement entre les affiches
        width: POSTER_WIDTH,
        height: POSTER_WIDTH * 1.5, // Ratio 2:3 typique
        borderRadius: 4,
        overflow: 'hidden',
    },
    posterImage: {
        width: '100%',
        height: '100%',
    },
    // posterTitle: { /* ... style de texte si vous l'ajoutez ... */ }
});

export default Row;