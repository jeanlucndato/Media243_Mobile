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

    const backgroundSource = media?.backgroundImage || media?.poster_url
        ? { uri: media.backgroundImage || media.poster_url }
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
                {/* Enhanced gradient overlay for better text visibility */}
                {/* Bottom-up gradient for content blending */}
                <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.2)', 'rgba(0,0,0,0.8)', '#000000']}
                    locations={[0, 0.4, 0.8, 1]}
                    style={StyleSheet.absoluteFill}
                />

                <View style={styles.contentContainer}>
                    {/* Categories Bar inside Billboard - Optional but common in Netflix */}

                    {/* Hero Title / Logo Area - Moving title down */}
                    <View style={styles.heroInfoContainer}>
                        {/* Genre/Tags Row */}
                        <View style={styles.genreRow}>
                            <Text style={styles.genreText}>Suscense</Text>
                            <Text style={styles.genreDot}>•</Text>
                            <Text style={styles.genreText}>Excitant</Text>
                            <Text style={styles.genreDot}>•</Text>
                            <Text style={styles.genreText}>Drame</Text>
                        </View>

                        {/* Action Buttons Row */}
                        <View style={styles.buttonGroup}>
                            {/* My List (Left) */}
                            <TouchableOpacity onPress={handleMyListPress} style={styles.verticalActionBtn}>
                                <Icon name={inMyList ? "checkmark" : "add"} size={24} color={colors.textPrimary} />
                                <Text style={styles.verticalActionText}>Ma liste</Text>
                            </TouchableOpacity>

                            {/* Play Button (Center - White) */}
                            <TouchableOpacity onPress={handlePlayPress} style={styles.playButton}>
                                <Icon name="play" size={24} color={colors.black} style={styles.playIcon} />
                                <Text style={styles.playButtonText}>Lecture</Text>
                            </TouchableOpacity>

                            {/* Info Button (Right) */}
                            <TouchableOpacity style={styles.verticalActionBtn}>
                                <Icon name="information-circle-outline" size={24} color={colors.textPrimary} />
                                <Text style={styles.verticalActionText}>Infos</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 550, // Significant height for Hero
        backgroundColor: colors.background,
        marginBottom: spacing.lg,
    },
    imageBackground: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    contentContainer: {
        paddingBottom: spacing.lg,
        paddingHorizontal: spacing.lg,
        justifyContent: 'flex-end',
    },
    heroInfoContainer: {
        alignItems: 'center', // Center align everything like Netflix mobile
    },
    genreRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.md,
        justifyContent: 'center',
    },
    genreText: {
        ...typography.styles.bodySmall,
        color: colors.textPrimary,
        fontWeight: typography.fontWeight.medium,
        textShadowColor: 'rgba(0,0,0,0.75)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 2,
    },
    genreDot: {
        color: colors.primary, // Red dots
        marginHorizontal: spacing.sm,
        fontSize: 20, // Bigger dot
        lineHeight: 20,
    },
    buttonGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between', // Distribute buttons
        width: '100%',
        paddingHorizontal: spacing.sm,
    },
    verticalActionBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 60,
    },
    verticalActionText: {
        ...typography.styles.caption,
        color: colors.textSecondary, // Muted text color
        marginTop: 4,
        fontWeight: '500',
    },
    playButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.white, // White Play Button
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 4, // Netflix uses slight rounded corners, not pill
        minWidth: 110,
        justifyContent: 'center',
    },
    playIcon: {
        marginRight: 4,
    },
    playButtonText: {
        ...typography.styles.button,
        color: colors.black, // Black text on White button
        fontWeight: 'bold',
        fontSize: 18,
    },
});

export default NetflixBillboard;
