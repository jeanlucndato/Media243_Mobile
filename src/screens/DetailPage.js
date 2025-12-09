import { useNavigation, useRoute } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../constants/colors';
import { spacing } from '../constants/spacing';
import { typography } from '../constants/typography';
import { useAuth } from '../contexts/AuthContext';
import { useMedia } from '../contexts/MediaContext';
import { api } from '../services/api';

const { width } = Dimensions.get('window');

const DetailScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { id } = route.params || {};
    const { mediaCatalogue, addToWatchlist, isInWatchlist } = useMedia();
    const { user } = useAuth();

    const [media, setMedia] = useState(null);
    const [loading, setLoading] = useState(true);
    const [inWatchlist, setInWatchlist] = useState(false);

    useEffect(() => {
        fetchMovieDetails();
    }, [id]);

    useEffect(() => {
        if (media) {
            setInWatchlist(isInWatchlist(media.id));
        }
    }, [media, isInWatchlist]);

    const fetchMovieDetails = async () => {
        setLoading(true);
        try {
            const response = await api.getMovieById(id);
            if (response.status === 'success') {
                setMedia(response.data);
            }
        } catch (error) {
            console.error("Error fetching movie details:", error);
            // Fallback to catalogue if API fails
            const fallbackMedia = mediaCatalogue.find(m => m.id === id);
            if (fallbackMedia) {
                setMedia(fallbackMedia);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleAddToWatchlist = async () => {
        if (!user) {
            navigation.navigate('Login');
            return;
        }

        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        const result = await addToWatchlist(media);
        if (result.success) {
            setInWatchlist(true);
        }
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={colors.primary} />
            </View>
        );
    }

    if (!media) {
        return (
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.errorContainer}>
                    <Icon name="alert-circle-outline" size={64} color={colors.textSecondary} />
                    <Text style={styles.errorText}>Film non trouvé</Text>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButtonError}>
                        <Text style={styles.backButtonText}>Retour</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

    // Get similar movies from catalogue (simple recommendation)
    const similarMovies = mediaCatalogue.filter(m => m.id !== media.id).slice(0, 6);

    // Fallback image
    const backdropImage = media.backgroundImage || media.poster_url || `https://via.placeholder.com/1080x600/1a1a1a/DC2626?text=${encodeURIComponent(media.title?.substring(0, 20) || 'Movie')}`;

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {/* Hero Image with Enhanced Gradient */}
                <View style={styles.heroContainer}>
                    <Image
                        source={{ uri: backdropImage }}
                        style={styles.heroImage}
                        resizeMode="cover"
                    />

                    <LinearGradient
                        colors={['rgba(0,0,0,0.2)', 'rgba(0,0,0,0.7)', colors.background]}
                        locations={[0, 0.5, 1]}
                        style={StyleSheet.absoluteFill}
                    />

                    {/* Back Button */}
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={styles.backButton}
                    >
                        <Icon name="arrow-back" size={28} color={colors.textPrimary} />
                    </TouchableOpacity>
                </View>

                {/* Content */}
                <View style={styles.contentContainer}>
                    {/* Logo Badge */}
                    <View style={styles.logoBadge}>
                        <Text style={styles.logoText}>MEDIA</Text>
                        <Text style={styles.logoAccent}>243</Text>
                        {media.isPremium && <Text style={styles.logoSubtext}>PREMIUM</Text>}
                    </View>

                    {/* Title with shadow */}
                    <Text style={styles.title}>{media.title}</Text>

                    {/* Metadata Row */}
                    <View style={styles.metadataRow}>
                        {media.rating && (
                            <View style={styles.matchBadge}>
                                <Text style={styles.matchText}>{Math.round(media.rating * 10)}% Match</Text>
                            </View>
                        )}
                        <Text style={styles.metadataText}>2024</Text>
                        <View style={styles.maturityBadge}>
                            <Text style={styles.maturityText}>16+</Text>
                        </View>
                        {media.durationMinutes && (
                            <Text style={styles.metadataText}>{Math.floor(media.durationMinutes / 60)}h {media.durationMinutes % 60}m</Text>
                        )}
                        <View style={styles.hdBadge}>
                            <Text style={styles.hdText}>HD</Text>
                        </View>
                    </View>

                    {/* Action Buttons */}
                    <View style={styles.buttonGroup}>
                        <TouchableOpacity
                            style={styles.playButton}
                            onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)}
                        >
                            <Icon name="play" size={24} color={colors.background} style={styles.iconSpacing} />
                            <Text style={styles.playButtonText}>Lecture</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.downloadButton}
                            onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
                        >
                            <Icon name="download-outline" size={24} color={colors.textPrimary} style={styles.iconSpacing} />
                            <Text style={styles.downloadButtonText}>Télécharger</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Synopsis */}
                    <Text style={styles.synopsis}>
                        {media.synopsis || media.description || "Un film captivant qui vous transportera dans une aventure inoubliable. Découvrez une histoire riche en émotions et en rebondissements."}
                    </Text>

                    {/* Director */}
                    {media.director && (
                        <Text style={styles.infoLabel}>
                            Réalisateur: <Text style={styles.infoText}>{media.director}</Text>
                        </Text>
                    )}

                    {/* Genre */}
                    {media.genre && (
                        <Text style={styles.infoLabel}>
                            Genre: <Text style={styles.infoText}>{media.genre}</Text>
                        </Text>
                    )}

                    {/* Icon Buttons Row */}
                    <View style={styles.iconButtonsRow}>
                        <TouchableOpacity style={styles.iconButton} onPress={handleAddToWatchlist}>
                            <View style={[styles.iconCircle, inWatchlist && styles.iconCircleActive]}>
                                <Icon
                                    name={inWatchlist ? "checkmark" : "add"}
                                    size={28}
                                    color={colors.textPrimary}
                                />
                            </View>
                            <Text style={styles.iconButtonText}>
                                {inWatchlist ? "Dans ma liste" : "Ma liste"}
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.iconButton}>
                            <View style={styles.iconCircle}>
                                <Icon name="thumbs-up-outline" size={28} color={colors.textPrimary} />
                            </View>
                            <Text style={styles.iconButtonText}>J'aime</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.iconButton}>
                            <View style={styles.iconCircle}>
                                <Icon name="share-social-outline" size={28} color={colors.textPrimary} />
                            </View>
                            <Text style={styles.iconButtonText}>Partager</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Similar Content - Grid Layout */}
                    {similarMovies.length > 0 && (
                        <View style={styles.similarSection}>
                            <View style={styles.sectionHeader}>
                                <View style={styles.sectionIndicator} />
                                <Text style={styles.sectionTitle}>Plus de titres</Text>
                            </View>

                            <View style={styles.gridContainer}>
                                {similarMovies.map((item) => (
                                    <TouchableOpacity
                                        key={item.id}
                                        style={styles.gridItem}
                                        onPress={() => navigation.push('Detail', { id: item.id })}
                                    >
                                        <Image
                                            source={{ uri: item.poster_url || 'https://via.placeholder.com/150' }}
                                            style={styles.gridImage}
                                            resizeMode="cover"
                                        />
                                        <View style={styles.gridOverlay}>
                                            <Icon name="play-circle-outline" size={32} color={colors.white} style={{ opacity: 0.8 }} />
                                        </View>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.background,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background,
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: spacing.xl,
    },
    errorText: {
        ...typography.styles.h4,
        color: colors.textPrimary,
        marginTop: spacing.lg,
        marginBottom: spacing.xl,
    },
    backButtonError: {
        backgroundColor: colors.primary,
        paddingHorizontal: spacing.xl,
        paddingVertical: spacing.md,
        borderRadius: spacing.borderRadius.sm,
    },
    backButtonText: {
        ...typography.styles.button,
        color: colors.textPrimary,
        fontWeight: typography.fontWeight.bold,
    },
    scrollView: {
        flex: 1,
    },
    heroContainer: {
        width: '100%',
        height: 500,
        position: 'relative',
    },
    heroImage: {
        width: '100%',
        height: '100%',
    },
    backButton: {
        position: 'absolute',
        top: spacing['3xl'],
        left: spacing.base,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    contentContainer: {
        padding: spacing.base,
        marginTop: -spacing['4xl'],
    },
    logoBadge: {
        flexDirection: 'row',
        alignItems: 'baseline',
        marginBottom: spacing.base,
    },
    logoText: {
        ...typography.styles.bodySmall,
        color: colors.textPrimary,
        fontWeight: typography.fontWeight.black,
        letterSpacing: 2,
        textShadowColor: 'rgba(0, 0, 0, 0.8)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 3,
    },
    logoAccent: {
        ...typography.styles.bodySmall,
        color: colors.primary,
        fontWeight: typography.fontWeight.black,
        letterSpacing: 2,
        marginLeft: 2,
        textShadowColor: 'rgba(0, 0, 0, 0.8)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 3,
    },
    logoSubtext: {
        ...typography.styles.caption,
        color: colors.star,
        fontWeight: typography.fontWeight.semibold,
        marginLeft: spacing.sm,
    },
    title: {
        ...typography.styles.h2,
        color: colors.textPrimary,
        marginBottom: spacing.md,
        fontWeight: typography.fontWeight.black,
        textShadowColor: 'rgba(0, 0, 0, 0.8)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4,
    },
    metadataRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.lg,
        flexWrap: 'wrap',
    },
    matchBadge: {
        backgroundColor: colors.success,
        paddingHorizontal: spacing.sm,
        paddingVertical: 2,
        borderRadius: 2,
        marginRight: spacing.md,
    },
    matchText: {
        ...typography.styles.caption,
        color: colors.textPrimary,
        fontWeight: typography.fontWeight.bold,
    },
    metadataText: {
        ...typography.styles.bodySmall,
        color: colors.textPrimary,
        marginRight: spacing.md,
        fontWeight: typography.fontWeight.semibold,
    },
    maturityBadge: {
        borderWidth: 1,
        borderColor: colors.textPrimary,
        paddingHorizontal: spacing.sm,
        paddingVertical: 1,
        marginRight: spacing.md,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    maturityText: {
        ...typography.styles.caption,
        color: colors.textPrimary,
        fontWeight: typography.fontWeight.semibold,
    },
    hdBadge: {
        borderWidth: 1,
        borderColor: colors.textPrimary,
        paddingHorizontal: spacing.sm,
        paddingVertical: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    hdText: {
        ...typography.styles.caption,
        color: colors.textPrimary,
        fontWeight: typography.fontWeight.bold,
    },
    buttonGroup: {
        flexDirection: 'row',
        marginBottom: spacing.xl,
        gap: spacing.md,
    },
    playButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.textPrimary,
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.xl,
        borderRadius: spacing.borderRadius.sm,
        flex: 1,
        justifyContent: 'center',
        shadowColor: colors.textPrimary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    playButtonText: {
        ...typography.styles.button,
        color: colors.background,
        fontWeight: typography.fontWeight.bold,
    },
    downloadButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(42, 42, 42, 0.9)',
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.xl,
        borderRadius: spacing.borderRadius.sm,
        flex: 1,
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    downloadButtonText: {
        ...typography.styles.button,
        color: colors.textPrimary,
        fontWeight: typography.fontWeight.semibold,
    },
    iconSpacing: {
        marginRight: spacing.sm,
    },
    synopsis: {
        ...typography.styles.body,
        color: colors.textPrimary,
        lineHeight: typography.lineHeight.relaxed * typography.fontSize.base,
        marginBottom: spacing.lg,
    },
    infoLabel: {
        ...typography.styles.bodySmall,
        color: colors.textSecondary,
        marginBottom: spacing.sm,
        fontWeight: typography.fontWeight.semibold,
    },
    infoText: {
        color: colors.textPrimary,
        fontWeight: typography.fontWeight.normal,
    },
    iconButtonsRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: spacing.xl,
        marginBottom: spacing.xl,
    },
    iconButton: {
        alignItems: 'center',
    },
    iconCircle: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'rgba(42, 42, 42, 0.9)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: spacing.xs,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    iconCircleActive: {
        backgroundColor: 'rgba(220, 38, 38, 0.2)',
        borderColor: colors.primary,
    },
    iconButtonText: {
        ...typography.styles.caption,
        color: colors.textPrimary,
        marginTop: spacing.xs,
        fontWeight: typography.fontWeight.semibold,
    },
    similarSection: {
        marginTop: spacing.xl,
        marginBottom: spacing['6xl'],
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.md,
    },
    sectionIndicator: {
        width: 4,
        height: 20,
        backgroundColor: colors.primary, // Red vertical bar
        marginRight: spacing.sm,
        borderRadius: 2,
    },
    sectionTitle: {
        ...typography.styles.h4,
        color: colors.textPrimary,
        fontWeight: 'bold',
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        gap: 8, // Gap between items
    },
    gridItem: {
        width: (width - 32 - 16) / 3, // (Screen width - padding - gaps) / 3 columns
        aspectRatio: 2 / 3,
        borderRadius: 4,
        backgroundColor: colors.backgroundCard,
        overflow: 'hidden',
        marginBottom: 8,
    },
    gridImage: {
        width: '100%',
        height: '100%',
    },
    gridOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0, // Hidden by default, could show on press
    },
});

export default DetailScreen;