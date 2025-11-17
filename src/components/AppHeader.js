import { Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const AppHeader = ({ navigation }) => {
    return (
        // L'en-tête est positionné en absolu pour flotter sur le contenu de la bannière
        // Si vous le préférez, vous pouvez le laisser en position normale (dans le flux).
        // Ici, nous le faisons normal pour la simplicité, mais avec un grand padding supérieur
        // pour que le contenu ne soit pas masqué.
        <View className="flex-row items-center justify-between p-4 bg-transparent absolute top-0 w-full z-10">

            {/* 1. Bouton Menu (à gauche) */}
            <TouchableOpacity onPress={() => console.log('Ouvrir Menu')}>
                <Icon name="menu-outline" size={30} color="#FFFFFF" />
            </TouchableOpacity>

            {/* 2. Logo Central */}
            <Text className="text-white text-xl font-bold">
                Media<Text className="text-red-600">243</Text>
            </Text>

            {/* 3. Bouton Recherche (à droite) */}
            <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                <Icon name="search-outline" size={26} color="#FFFFFF" />
            </TouchableOpacity>
        </View>
    );
};

export default AppHeader;