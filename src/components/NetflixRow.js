import { useNavigation } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';
import { useRef } from 'react';
import { Animated, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../constants/colors';
import { spacing } from '../constants/spacing';
import { typography } from '../constants/typography';
import Top10Badge from './Top10Badge';

const NetflixMediaCard = ({ media, navigation, showTop10, top10Number, size = 'medium' }) => {
    const scaleAnim = useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        Animated.spring(scaleAnim, {
            toValue: 1.05,
            useNativeDriver: true,
            friction: 3,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scaleAnim, {
            toValue: 1,
            useNativeDriver: true,
            friction: 3,
        }).start();
    };

    const cardSizes = {
        small: { width: 100, height: 150 },
        medium: { width: 130, height: 195 },
        large: { width: 160, height: 240 },
    };

    const dimensions = cardSizes[size];

    // Fallback image if poster_url is missing or invalid
    const posterSource = media.poster_url
        ? { uri: media.poster_url }
        : { uri: `https://via.placeholder.com/${dimensions.width}x${dimensions.height}/1a1a1a/DC2626?text=${encodeURIComponent(media.title?.substring(0, 10) || 'Movie')}` };

    return (
        <TouchableOpacity
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={() => navigation.navigate('Detail', { id: media.id })}
            activeOpacity={0.9}
        >
            <Animated.View
                style={[
                    styles.cardContainer,
                    { width: dimensions.width, height: dimensions.height, transform: [{ scale: scaleAnim }] }
                ]}
            >
                {showTop10 && <Top10Badge number={top10Number} />}

                <Image
                    source={posterSource}
                    style={styles.cardImage}
                    resizeMode="cover"
                />

                {/* Enhanced overlay with gradient */}
                <View style={styles.overlay}>
                    <View style={styles.playButton}>
                        <Icon name="play" size={24} color={colors.textPrimary} />
                    </View>
                </View>

                {/* Enhanced rating badge */}
                {media.rating && (
                    <View style={styles.ratingBadge}>
                        <Icon name="star" size={12} color={colors.star} style={styles.starIcon} />
                        <Text style={styles.ratingText}>{media.rating}</Text>
                    </View>
                )}

                {/* Title overlay at bottom */}
                <View style={styles.titleOverlay}>
                    <Text style={styles.titleText} numberOfLines={1}>
                        {media.title}
                    </Text>
                </View>
            </Animated.View>
        </TouchableOpacity>
    );
};

const NetflixRow = ({ title, mediaList = [], showTop10 = false, size = 'medium', onSeeAll }) => {
    const navigation = useNavigation();

    if (!mediaList || mediaList.length === 0) {
        return null;
    }

    return (
        <View style={styles.rowContainer}>
            <View style={styles.rowHeader}>
                <Text style={styles.rowTitle}>{title}</Text>
                {onSeeAll && (
                    <TouchableOpacity onPress={onSeeAll} style={styles.seeAllButton}>
                        <Text style={styles.seeAllText}>Tout voir</Text>
                        <Icon name="chevron-forward" size={16} color={colors.textSecondary} />
                    </TouchableOpacity>
                )}
            </View>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollViewContent}
                decelerationRate="fast"
                snapToInterval={size === 'large' ? 170 : size === 'medium' ? 140 : 110}
            >
                {mediaList.map((media, index) => (
                    <NetflixMediaCard
                        key={media.id}
                        media={media}
                        navigation={navigation}
                        showTop10={showTop10}
                        top10Number={index + 1}
                        size={size}
                    />
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    rowContainer: {
        marginBottom: spacing['2xl'],
    },
    rowHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: spacing.base,
        marginBottom: spacing.md,
    },
    rowTitle: {
        ...typography.styles.h4,
        color: colors.textPrimary,
        fontWeight: typography.fontWeight.bold,
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 2,
    },
    seeAllButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    seeAllText: {
        ...typography.styles.bodySmall,
        color: colors.textSecondary,
        marginRight: spacing.xs,
    },
    scrollViewContent: {
        paddingHorizontal: spacing.base,
        gap: spacing.sm,
    },
    cardContainer: {
        borderRadius: spacing.borderRadius.base,
        overflow: 'hidden',
        marginRight: spacing.sm,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.7,
        shadowRadius: 12,
        elevation: 12,
        backgroundColor: colors.backgroundCard,
    },
    cardImage: {
        width: '100%',
        height: '100%',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0,
    },
    playButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: colors.textPrimary,
    },
    ratingBadge: {
        position: 'absolute',
        top: spacing.sm,
        right: spacing.sm,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.xs,
        borderRadius: spacing.borderRadius.sm,
        borderWidth: 1,
        borderColor: 'rgba(255, 215, 0, 0.3)',
    },
    starIcon: {
        marginRight: 2,
    },
    ratingText: {
        ...typography.styles.caption,
        color: colors.textPrimary,
        fontWeight: typography.fontWeight.bold,
    },
    titleOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.xs,
        borderTopWidth: 1,
        borderTopColor: 'rgba(220, 38, 38, 0.3)',
    },
    titleText: {
        ...typography.styles.caption,
        color: colors.textPrimary,
        fontWeight: typography.fontWeight.semibold,
        textAlign: 'center',
    },
});

export default NetflixRow;
