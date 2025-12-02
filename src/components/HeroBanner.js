import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../constants/colors';
import { spacing } from '../constants/spacing';
import { typography } from '../constants/typography';

const HeroBanner = ({ media, onPlayPress, onInfoPress }) => {
    const backgroundSource = media.backgroundImage
        ? { uri: media.backgroundImage }
        : require('../../assets/images/SNORT.jpg');

    const handlePress = (callback) => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        if (callback) callback();
    };

    return (
        <View style={styles.mainContainer}>
            <ImageBackground
                source={backgroundSource}
                resizeMode="cover"
                style={styles.imageBackground}
            >
                {/* Gradient Overlays for better text readability */}
                <LinearGradient
                    colors={['rgba(0,0,0,0.8)', 'transparent', 'rgba(0,0,0,0.95)']}
                    locations={[0, 0.3, 1]}
                    style={StyleSheet.absoluteFill}
                />

                <View style={styles.contentContainer}>
                    {/* Title */}
                    <Text style={styles.titleText} numberOfLines={2}>
                        {media.title || "Titre du Média"}
                    </Text>

                    {/* Subtitle/Description */}
                    {media.description && (
                        <Text style={styles.descriptionText} numberOfLines={2}>
                            {media.description}
                        </Text>
                    )}

                    {/* Button Group */}
                    <View style={styles.buttonGroup}>
                        {/* Play Now Button with Gradient */}
                        <TouchableOpacity
                            onPress={() => handlePress(onPlayPress)}
                            activeOpacity={0.8}
                        >
                            <LinearGradient
                                colors={[colors.gradientStart, colors.gradientEnd]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.playButton}
                            >
                                <Icon name="play" size={20} color={colors.textPrimary} style={styles.iconMargin} />
                                <Text style={styles.playButtonText}>Play Now</Text>
                            </LinearGradient>
                        </TouchableOpacity>

                        {/* Add to List Button */}
                        <TouchableOpacity
                            onPress={() => handlePress(onInfoPress)}
                            style={styles.infoButton}
                            activeOpacity={0.8}
                        >
                            <Icon name="add" size={20} color={colors.textPrimary} style={styles.iconMargin} />
                            <Text style={styles.infoButtonText}>Ma Liste</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        width: '100%',
        height: spacing.dimensions.heroBannerHeight,
        backgroundColor: colors.backgroundElevated,
    },
    imageBackground: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        padding: spacing.xl,
        paddingBottom: spacing['2xl'],
    },
    titleText: {
        ...typography.styles.h1,
        color: colors.textPrimary,
        marginBottom: spacing.md,
        textShadowColor: colors.black70,
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 10,
    },
    descriptionText: {
        ...typography.styles.body,
        color: colors.textSecondary,
        marginBottom: spacing.base,
        lineHeight: typography.lineHeight.relaxed * typography.fontSize.base,
    },
    buttonGroup: {
        flexDirection: 'row',
        marginTop: spacing.base,
    },
    playButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: spacing.borderRadius.base,
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.xl,
        minWidth: 140,
        marginRight: spacing.md,
        shadowColor: colors.background,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 8,
        elevation: 8,
    },
    playButtonText: {
        ...typography.styles.button,
        color: colors.textPrimary,
    },
    infoButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.black70,
        borderRadius: spacing.borderRadius.base,
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.lg,
        borderWidth: 1,
        borderColor: colors.borderLight,
    },
    infoButtonText: {
        ...typography.styles.button,
        color: colors.textPrimary,
        fontWeight: typography.fontWeight.semibold,
    },
    iconMargin: {
        marginRight: spacing.sm,
    },
});

export default HeroBanner;