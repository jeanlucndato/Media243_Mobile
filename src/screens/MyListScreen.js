import { useNavigation } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';
import { FlatList, Image, Platform, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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

                    <TouchableOpacity
                        onPress={() => handleRemove(item.itemId || item.id)}
                        style={styles.deleteButton}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                        <Icon name="close" size={14} color={colors.white} />
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="light-content" />

            <View style={styles.header}>
                <Text style={styles.headerTitle}>My List</Text>
                {watchlist.length > 0 && (
                    <View style={styles.countBadge}>
                        <Text style={styles.countText}>{watchlist.length}</Text>
                    </View>
                )}
            </View>

            {watchlist.length === 0 ? (
                <EmptyState
                    icon="add-circle-outline"
                    title="Empy List"
                    message="Add movies and shows to your list so you can easily find them later."
                    actionLabel="Find Something to Watch"
                    onAction={() => navigation.navigate('Home')}
                />
            ) : (
                <FlatList
                    data={watchlist}
                    keyExtractor={(item) => (item.itemId || item.id).toString()}
                    renderItem={renderItem}
                    numColumns={3}
                    columnWrapperStyle={styles.columnWrapper}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
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
        paddingHorizontal: spacing.base,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 10 : 50,
        paddingBottom: spacing.base,
        // Netflix often has a sticky header or just a simple text
    },
    headerTitle: {
        ...typography.styles.h3,
        color: colors.textPrimary,
        fontWeight: 'bold',
        marginRight: spacing.sm,
    },
    countBadge: {
        // Optional: Netflix doesn't always show count in header
        backgroundColor: '#262626',
        borderRadius: 12,
        paddingHorizontal: 8,
        paddingVertical: 2,
    },
    countText: {
        ...typography.styles.caption,
        color: colors.textSecondary,
    },
    columnWrapper: {
        gap: 8,
        paddingHorizontal: 8,
    },
    listContent: {
        paddingTop: spacing.xs,
        paddingBottom: spacing['6xl'],
    },
    itemWrapper: {
        flex: 1,
        maxWidth: '33.33%', // 3 columns
        marginBottom: 8,
    },
    posterContainer: {
        position: 'relative',
        width: '100%',
        aspectRatio: 2 / 3,
        borderRadius: 4,
        overflow: 'hidden',
        backgroundColor: colors.backgroundCard,
    },
    posterImage: {
        width: '100%',
        height: '100%',
    },
    // Removed titleOverlay for cleaner look
    deleteButton: {
        position: 'absolute',
        top: 4,
        right: 4,
        backgroundColor: 'rgba(0,0,0,0.6)',
        borderRadius: 12,
        padding: 4,
        zIndex: 1,
    },
});

export default MyListScreen;