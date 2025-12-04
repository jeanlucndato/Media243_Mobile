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

    const renderItem = ({ item }) => {
        // Fallback image if poster_url is missing
        const posterSource = item.poster_url
            ? { uri: item.poster_url }
            : { uri: `https://via.placeholder.com/150x225/1a1a1a/DC2626?text=${encodeURIComponent(item.title?.substring(0, 10) || 'Movie')}` };

        return (
            <TouchableOpacity
                onPress={() => navigation.navigate('Detail', { id: item.itemId || item.id })}
                style={styles.itemWrapper}
            >
                <View style={styles.posterContainer}>
                    <Image
                        source={posterSource}
                        style={styles.posterImage}
                        resizeMode="cover"
                    />
                    <View style={styles.titleOverlay}>
                        <Text style={styles.titleText} numberOfLines={2}>
                            {item.title}
                        </Text>
                    </View>

                    <TouchableOpacity
                        onPress={() => handleRemove(item.itemId || item.id)}
                        style={styles.deleteButton}
                    >
                        <Icon name="close" size={16} color={colors.textPrimary} />
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="light-content" />

            <View style={styles.header}>
                <Text style={styles.headerTitle}>
                    Ma <Text style={styles.headerTitleRed}>Liste</Text>
                </Text>
                {watchlist.length > 0 && (
                    <View style={styles.countBadge}>
                        <Text style={styles.countText}>{watchlist.length}</Text>
                    </View>
                )}
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
                    keyExtractor={(item) => (item.itemId || item.id).toString()}
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
        fontWeight: typography.fontWeight.black,
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 2,
    },
    headerTitleRed: {
        color: colors.primary,
    },
    countBadge: {
        backgroundColor: colors.primary,
        borderRadius: spacing.borderRadius.full,
        minWidth: 24,
        height: 24,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: spacing.sm,
        paddingHorizontal: spacing.xs,
    },
    countText: {
        ...typography.styles.caption,
        color: colors.textPrimary,
        fontWeight: typography.fontWeight.bold,
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
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.5,
        shadowRadius: 6.27,
        elevation: 10,
        backgroundColor: colors.backgroundCard,
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
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        borderTopWidth: 1,
        borderTopColor: 'rgba(220, 38, 38, 0.3)',
    },
    titleText: {
        ...typography.styles.caption,
        color: colors.textPrimary,
        fontWeight: typography.fontWeight.bold,
        textAlign: 'center',
    },
    deleteButton: {
        position: 'absolute',
        top: spacing.xs,
        right: spacing.xs,
        backgroundColor: colors.primary,
        borderRadius: spacing.borderRadius.full,
        padding: spacing.sm,
        zIndex: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 5,
    },
});

export default MyListScreen;