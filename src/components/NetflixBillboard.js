import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { Dimensions, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../constants/colors';
import { spacing } from '../constants/spacing';
import { typography } from '../constants/typography';

const { width } = Dimensions.get('window');

/**
 * Netflix-style Billboard Hero Banner
 * Large, cinematic banner similar to Netflix's main feature
 */
const NetflixBillboard = ({ media, onPlayPress, onMyListPress }) => {
    const [inMyList, setInMyList] = useState(false);

    const backgroundSource = media.backgroundImage
        ? { uri: media.backgroundImage }
        : require('../../assets/images/SNORT.jpg');

    const handleMyListPress = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        setInMyList(!inMyList);
        if (onMyListPress) onMyListPress();
    };

    const handlePlayPress = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        if (onPlayPress) onPlayPress();
    };

    return (
        <View style={styles.container}>
            <ImageBackground
                source={backgroundSource}
                style={styles.imageBackground}
                resizeMode="cover"
            >
                {/* Triple gradient overlay for Netflix look */}
                <LinearGradient
                    colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0)', 'rgba(0,0,0,0.95)']}
                    locations={[0, 0.4, 1]}
                    style={StyleSheet.absoluteFill}
                />

                <View style={styles.contentContainer}>
                    {/* Netflix-style logo badge */}
                    <View style={styles.logoBadge}>
                        <Text style={styles.logoText}>MEDIA</Text>
                        <Text style={styles.logoAccent}>243</Text>
                    </View>

                    {/* Title */}
                    <Text style={styles.title} numberOfLines={2}>
                        {media.title || "Titre du Média"}
                    </Text>

                    {/* Metadata row */}
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
                        <Text style={styles.metadataText}>2h 15m</Text>
                    </View>

                    {/* Genres */}
                    <View style={styles.genreRow}>
                        <Text style={styles.genreText}>Action</Text>
                        <Text style={styles.genreDot}>•</Text>
                        <Text style={styles.genreText}>Drame</Text>
                        <Text style={styles.genreDot}>•</Text>
                        <Text style={styles.genreText}>Aventure</Text>
                    </View>

                    {/* Action Buttons */}
                    <View style={styles.buttonGroup}>
                        {/* Play Button */}
                        <TouchableOpacity onPress={handlePlayPress} style={styles.playButton}>
                            <Icon name="play" size={24} color={colors.background} style={styles.playIcon} />
                            <Text style={styles.playButtonText}>Lecture</Text>
                        </TouchableOpacity>

                        {/* My List Button */}
                        <TouchableOpacity onPress={handleMyListPress} style={styles.myListButton}>
                            <Icon
                                name={inMyList ? "checkmark" : "add"}
                                size={24}
                                color={colors.textPrimary}
                                style={styles.iconSpacing}
                            />
                            <Text style={styles.myListButtonText}>Ma liste</Text>
                        </TouchableOpacity>

                        {/* Info Button */}
                        <TouchableOpacity style={styles.infoButton}>
                            <Icon name="information-circle-outline" size={24} color={colors.textPrimary} style={styles.iconSpacing} />
                            <Text style={styles.infoButtonText}>Infos</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 600,
        backgroundColor: colors.background,
    },
    imageBackground: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    contentContainer: {
        padding: spacing.base,
        paddingBottom: spacing.xl,
    },
    logoBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.md,
    },
    logoText: {
        ...typography.styles.h4,
        color: colors.textPrimary,
        fontWeight: typography.fontWeight.black,
        letterSpacing: 2,
    },
    logoAccent: {
        ...typography.styles.h4,
        color: colors.primary,
        fontWeight: typography.fontWeight.black,
        letterSpacing: 2,
    },
    title: {
        ...typography.styles.h1,
        fontSize: 36,
        color: colors.textPrimary,
        marginBottom: spacing.md,
        fontWeight: typography.fontWeight.black,
    },
    metadataRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.sm,
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
        color: colors.textSecondary,
        marginRight: spacing.md,
    },
    maturityBadge: {
        borderWidth: 1,
        borderColor: colors.textSecondary,
        paddingHorizontal: spacing.sm,
        paddingVertical: 1,
        marginRight: spacing.md,
    },
    maturityText: {
        ...typography.styles.caption,
        color: colors.textSecondary,
        fontWeight: typography.fontWeight.semibold,
    },
    genreRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.lg,
    },
    genreText: {
        ...typography.styles.bodySmall,
        color: colors.textPrimary,
        fontWeight: typography.fontWeight.semibold,
    },
    genreDot: {
        ...typography.styles.bodySmall,
        color: colors.textTertiary,
        marginHorizontal: spacing.sm,
    },
    buttonGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.md,
    },
    playButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.textPrimary,
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.xl,
        borderRadius: spacing.borderRadius.sm,
        marginRight: spacing.md,
        flex: 1,
        justifyContent: 'center',
    },
    playIcon: {
        marginRight: spacing.sm,
    },
    playButtonText: {
        ...typography.styles.button,
        color: colors.background,
        fontWeight: typography.fontWeight.bold,
    },
    myListButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.backgroundCard,
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.lg,
        borderRadius: spacing.borderRadius.sm,
        marginRight: spacing.md,
    },
    myListButtonText: {
        ...typography.styles.bodySmall,
        color: colors.textPrimary,
        fontWeight: typography.fontWeight.semibold,
    },
    infoButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.backgroundCard,
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.lg,
        borderRadius: spacing.borderRadius.sm,
    },
    infoButtonText: {
        ...typography.styles.bodySmall,
        color: colors.textPrimary,
        fontWeight: typography.fontWeight.semibold,
    },
    iconSpacing: {
        marginRight: spacing.xs,
    },
});

export default NetflixBillboard;
