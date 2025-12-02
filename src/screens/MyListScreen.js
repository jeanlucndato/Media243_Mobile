import { useNavigation } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';
import { FlatList, Image, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import EmptyState from '../components/EmptyState';
import colors from '../constants/colors';
import { spacing } from '../constants/spacing';
import { typography } from '../constants/typography';
import { useMedia } from '../contexts/MediaContext';

const MyListScreen = () => {
    const navigation = useNavigation();
    const { watchlist, removeFromWatchlist } = useMedia();

    const handleRemove = async (mediaId) => {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        const result = await removeFromWatchlist(mediaId);
        if (!result.success) {
            console.log('Error removing from watchlist');
        }
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            onPress={() => navigation.navigate('Detail', { id: item.id })}
            style={styles.itemWrapper}
        >
            <View style={styles.posterContainer}>
                <Image
                    source={{ uri: item.poster_url }}
                    style={styles.posterImage}
                    resizeMode="cover"
                />
                <View style={styles.titleOverlay}>
                    <Text style={styles.titleText} numberOfLines={1}>
                        {item.title}
                    </Text>
                </View>

                <TouchableOpacity
                    onPress={() => handleRemove(item.id)}
                    style={styles.deleteButton}
                >
                    <Icon name="close" size={14} color={colors.textPrimary} />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="light-content" />

            <View style={styles.header}>
                <Text style={styles.headerTitle}>
                    Ma <Text style={styles.headerTitleRed}>Liste</Text>
                </Text>
            </View>

            {watchlist.length === 0 ? (
                <EmptyState
                    icon="list-outline"
                    title="Votre Liste est vide"
                    message="Ajoutez des films et séries pour les retrouver facilement ici!"
                    actionLabel="Explorer le Contenu"
                    onAction={() => navigation.navigate('Accueil')}
                />
            ) : (
                <FlatList
                    data={watchlist}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderItem}
                    numColumns={2}
                    columnWrapperStyle={styles.columnWrapper}
                    contentContainerStyle={styles.listContent}
                />
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.background,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: spacing.base,
        borderBottomWidth: 1,
        borderColor: colors.border,
    },
    headerTitle: {
        ...typography.styles.h3,
        color: colors.textPrimary,
    },
    headerTitleRed: {
        color: colors.primary,
    },
    columnWrapper: {
        justifyContent: 'space-between',
        paddingHorizontal: spacing.sm,
    },
    listContent: {
        paddingVertical: spacing.md,
        paddingBottom: spacing['6xl'],
    },
    itemWrapper: {
        width: '48%',
        marginBottom: spacing.base,
    },
    posterContainer: {
        position: 'relative',
        width: '100%',
        aspectRatio: 2 / 3,
        borderRadius: spacing.borderRadius.base,
        overflow: 'hidden',
        shadowColor: colors.background,
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
    },
    posterImage: {
        width: '100%',
        height: '100%',
    },
    titleOverlay: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        padding: spacing.sm,
        backgroundColor: colors.black50,
    },
    titleText: {
        ...typography.styles.bodySmall,
        color: colors.textPrimary,
        fontWeight: typography.fontWeight.semibold,
    },
    deleteButton: {
        position: 'absolute',
        top: spacing.xs,
        right: spacing.xs,
        backgroundColor: colors.primary,
        borderRadius: spacing.borderRadius.full,
        padding: spacing.xs,
        zIndex: 1,
    },
});

export default MyListScreen;