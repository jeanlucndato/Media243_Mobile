import { useNavigation } from '@react-navigation/native';
import { FlatList, Image, Platform, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import EmptyState from '../components/EmptyState';
import colors from '../constants/colors';
import { spacing } from '../constants/spacing';
import { typography } from '../constants/typography';

// Mock downloads data
const mockDownloads = [
    {
        id: '1',
        title: 'The Dark Knight',
        poster_url: 'https://via.placeholder.com/150x225/202020/FFFFFF?text=Movie+1',
        size: '1.2 GB',
        quality: 'HD',
        downloadedAt: '2025-12-09',
        progress: 100,
    },
    {
        id: '2',
        title: 'Inception',
        poster_url: 'https://via.placeholder.com/150x225/202020/FFFFFF?text=Movie+2',
        size: '950 MB',
        quality: 'SD',
        downloadedAt: '2025-12-08',
        progress: 100,
    },
];

const DownloadsScreen = () => {
    const navigation = useNavigation();

    const renderDownloadItem = ({ item }) => (
        <TouchableOpacity
            style={styles.downloadItem}
            onPress={() => navigation.navigate('Detail', { id: item.id })}
        >
            <Image source={{ uri: item.poster_url }} style={styles.poster} resizeMode="cover" />
            <View style={styles.downloadInfo}>
                <Text style={styles.downloadTitle} numberOfLines={1}>
                    {item.title}
                </Text>
                <View style={styles.downloadMeta}>
                    <View style={styles.qualityBadge}>
                        <Text style={styles.qualityText}>{item.quality}</Text>
                    </View>
                    <Text style={styles.sizeText}>{item.size}</Text>
                </View>
                <Text style={styles.downloadDate}>Downloaded {item.downloadedAt}</Text>
            </View>
            <TouchableOpacity style={styles.moreButton}>
                <Icon name="ellipsis-vertical" size={20} color={colors.textSecondary} />
            </TouchableOpacity>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="light-content" />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Icon name="arrow-back" size={24} color={colors.textPrimary} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Downloads</Text>
                <TouchableOpacity style={styles.headerAction}>
                    <Icon name="create-outline" size={24} color={colors.textPrimary} />
                </TouchableOpacity>
            </View>

            {/* Info Banner */}
            <View style={styles.infoBanner}>
                <Icon name="information-circle-outline" size={20} color={colors.textSecondary} />
                <Text style={styles.infoText}>Downloads are available for offline viewing</Text>
            </View>

            {/* Downloads List */}
            {mockDownloads.length > 0 ? (
                <FlatList
                    data={mockDownloads}
                    renderItem={renderDownloadItem}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                />
            ) : (
                <EmptyState
                    icon="download-outline"
                    title="No Downloads"
                    message="Download movies and shows to watch offline"
                    actionLabel="Browse Content"
                    onAction={() => navigation.navigate('Home')}
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
        justifyContent: 'space-between',
        paddingHorizontal: spacing.base,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 10 : spacing.xl,
        paddingBottom: spacing.base,
    },
    backButton: {
        padding: spacing.xs,
    },
    headerTitle: {
        ...typography.styles.h3,
        color: colors.textPrimary,
        fontWeight: 'bold',
    },
    headerAction: {
        padding: spacing.xs,
    },
    infoBanner: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1a1a1a',
        paddingHorizontal: spacing.base,
        paddingVertical: spacing.md,
        marginHorizontal: spacing.base,
        marginBottom: spacing.md,
        borderRadius: 8,
        gap: spacing.sm,
    },
    infoText: {
        ...typography.styles.caption,
        color: colors.textSecondary,
        flex: 1,
    },
    listContent: {
        paddingHorizontal: spacing.base,
        paddingBottom: spacing['6xl'],
    },
    downloadItem: {
        flexDirection: 'row',
        backgroundColor: '#1a1a1a',
        borderRadius: 8,
        padding: spacing.md,
        marginBottom: spacing.md,
        alignItems: 'center',
    },
    poster: {
        width: 60,
        height: 90,
        borderRadius: 4,
        backgroundColor: colors.backgroundCard,
    },
    downloadInfo: {
        flex: 1,
        marginLeft: spacing.md,
    },
    downloadTitle: {
        ...typography.styles.bodyLarge,
        color: colors.textPrimary,
        fontWeight: '600',
        marginBottom: 6,
    },
    downloadMeta: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
        gap: spacing.sm,
    },
    qualityBadge: {
        backgroundColor: '#333',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 4,
    },
    qualityText: {
        ...typography.styles.caption,
        color: colors.white,
        fontWeight: '600',
        fontSize: 10,
    },
    sizeText: {
        ...typography.styles.caption,
        color: colors.textSecondary,
    },
    downloadDate: {
        ...typography.styles.caption,
        color: colors.textTertiary,
    },
    moreButton: {
        padding: spacing.sm,
    },
});

export default DownloadsScreen;
