import { useNavigation, useRoute } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { Dimensions, Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import NetflixRow from '../components/NetflixRow';
import colors from '../constants/colors';
import { spacing } from '../constants/spacing';
import { typography } from '../constants/typography';

const { width } = Dimensions.get('window');

// MOCK DATA
const mockDetail = {
    id: 1,
    title: "Le Cœur de l'Afrique",
    year: 2024,
    rating: 9.2,
    backdrop_url: 'https://via.placeholder.com/1080x600/1C1C1C/FFFFFF?text=Détails+Background',
    synopsis: "Un jeune guerrier congolais doit s'unir à ses rivaux pour protéger leur terre ancestrale d'une menace inconnue. Ce film épique explore les thèmes de l'unité, du sacrifice et de la richesse culturelle de la RDC.",
    director: "Jean-Luc Ndato",
    cast: [
        { id: 1, name: "Actor 1", photo_url: 'https://via.placeholder.com/100x100/333/fff?text=A1' },
        { id: 2, name: "Actress 2", photo_url: 'https://via.placeholder.com/100x100/444/fff?text=A2' },
    ],
};

const mockSimilar = [
    { id: 10, title: "Film Similaire 1", poster_url: 'https://via.placeholder.com/150x225/B82329/FFFFFF?text=S1', rating: 8.5 },
    { id: 11, title: "Série Similaire 2", poster_url: 'https://via.placeholder.com/150x225/404040/FFFFFF?text=S2', rating: 9.0 },
    { id: 12, title: "Docu Similaire 3", poster_url: 'https://via.placeholder.com/150x225/222222/FFFFFF?text=S3', rating: 8.8 },
];

const DetailScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const media = mockDetail;

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {/* Hero Image with Gradient */}
                <View style={styles.heroContainer}>
                    <Image
                        source={{ uri: media.backdrop_url }}
                        style={styles.heroImage}
                        resizeMode="cover"
                    />

                    <LinearGradient
                        colors={['transparent', 'rgba(0,0,0,0.7)', colors.background]}
                        locations={[0, 0.6, 1]}
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
                        <Text style={styles.logoSubtext}>ORIGINAL</Text>
                    </View>

                    {/* Title */}
                    <Text style={styles.title}>{media.title}</Text>

                    {/* Metadata Row */}
                    <View style={styles.metadataRow}>
                        <View style={styles.matchBadge}>
                            <Text style={styles.matchText}>{Math.round(media.rating * 10)}% Match</Text>
                        </View>
                        <Text style={styles.metadataText}>{media.year}</Text>
                        <View style={styles.maturityBadge}>
                            <Text style={styles.maturityText}>16+</Text>
                        </View>
                        <Text style={styles.metadataText}>2h 15m</Text>
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
                    <Text style={styles.synopsis}>{media.synopsis}</Text>

                    {/* Cast */}
                    <Text style={styles.castLabel}>
                        Avec: <Text style={styles.castText}>Actor 1, Actress 2, Actor 3</Text>
                    </Text>

                    {/* Director */}
                    <Text style={styles.castLabel}>
                        Réalisateur: <Text style={styles.castText}>{media.director}</Text>
                    </Text>

                    {/* Genres */}
                    <Text style={styles.castLabel}>
                        Genres: <Text style={styles.castText}>Action, Drame, Aventure</Text>
                    </Text>

                    {/* Icon Buttons Row */}
                    <View style={styles.iconButtonsRow}>
                        <TouchableOpacity style={styles.iconButton}>
                            <Icon name="add" size={28} color={colors.textPrimary} />
                            <Text style={styles.iconButtonText}>Ma liste</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.iconButton}>
                            <Icon name="thumbs-up-outline" size={28} color={colors.textPrimary} />
                            <Text style={styles.iconButtonText}>J'aime</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.iconButton}>
                            <Icon name="share-social-outline" size={28} color={colors.textPrimary} />
                            <Text style={styles.iconButtonText}>Partager</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Similar Content */}
                    <View style={styles.similarSection}>
                        <NetflixRow
                            title="Titres similaires"
                            mediaList={mockSimilar}
                            size="medium"
                        />
                    </View>
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
        backgroundColor: colors.black70,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
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
    },
    logoAccent: {
        ...typography.styles.bodySmall,
        color: colors.primary,
        fontWeight: typography.fontWeight.black,
        letterSpacing: 2,
        marginLeft: 2,
    },
    logoSubtext: {
        ...typography.styles.caption,
        color: colors.textSecondary,
        fontWeight: typography.fontWeight.semibold,
        marginLeft: spacing.sm,
    },
    title: {
        ...typography.styles.h2,
        color: colors.textPrimary,
        marginBottom: spacing.md,
        fontWeight: typography.fontWeight.black,
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
    hdBadge: {
        borderWidth: 1,
        borderColor: colors.textSecondary,
        paddingHorizontal: spacing.sm,
        paddingVertical: 1,
    },
    hdText: {
        ...typography.styles.caption,
        color: colors.textSecondary,
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
    },
    playButtonText: {
        ...typography.styles.button,
        color: colors.background,
        fontWeight: typography.fontWeight.bold,
    },
    downloadButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.backgroundCard,
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.xl,
        borderRadius: spacing.borderRadius.sm,
        flex: 1,
        justifyContent: 'center',
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
    castLabel: {
        ...typography.styles.bodySmall,
        color: colors.textTertiary,
        marginBottom: spacing.sm,
    },
    castText: {
        color: colors.textSecondary,
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
    iconButtonText: {
        ...typography.styles.caption,
        color: colors.textSecondary,
        marginTop: spacing.xs,
    },
    similarSection: {
        marginTop: spacing.lg,
        marginBottom: spacing['6xl'],
    },
});

export default DetailScreen;