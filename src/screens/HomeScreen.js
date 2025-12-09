import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Animated, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import NetflixBillboard from '../components/NetflixBillboard';
import NetflixRow from '../components/NetflixRow';
import colors from '../constants/colors';
import { spacing } from '../constants/spacing';
import { typography } from '../constants/typography';
import { useAuth } from '../contexts/AuthContext';
import { useMedia } from '../contexts/MediaContext';

const HomePage = () => {
    const navigation = useNavigation();
    const scrollY = useRef(new Animated.Value(0)).current;
    const [headerOpacity] = useState(new Animated.Value(0));
    const { mediaCatalogue, loading, fetchCatalogue, addToWatchlist } = useMedia();
    const { user } = useAuth();

    useEffect(() => {
        fetchCatalogue();
    }, []);

    const heroMedia = mediaCatalogue.length > 0 ? mediaCatalogue[0] : null;

    const navigateToDetail = (id) => {
        navigation.navigate('Detail', { id });
    };

    const handleAddToWatchlist = async (media) => {
        if (user) {
            await addToWatchlist(media);
        } else {
            // Prompt login or show toast
            console.log("Please login to add to watchlist");
            navigation.navigate('Login');
        }
    };

    // Netflix-style transparent header that appears on scroll
    const headerAnimatedStyle = {
        opacity: scrollY.interpolate({
            inputRange: [0, 100],
            outputRange: [0, 1],
            extrapolate: 'clamp',
        }),
    };

    if (loading && mediaCatalogue.length === 0) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={colors.primary} />
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

            {/* Netflix-style transparent header */}
            <Animated.View style={[styles.headerAbsolute, headerAnimatedStyle]}>
                <LinearGradient
                    colors={[colors.gradientBlackEnd, colors.gradientBlackStart]} // Using new color constants
                    style={styles.headerGradient}
                >
                    <View style={styles.headerContent}>
                        {/* Logo - In real app, use Image. For now, styled text */}
                        <Text style={styles.headerLogo}>
                            M<Text style={styles.headerLogoAccent}>EDIA</Text>
                        </Text>

                        <View style={styles.headerIcons}>
                            {/* Cast Icon Placeholder */}
                            <TouchableOpacity style={styles.headerIcon}>
                                <Icon name="tv-outline" size={24} color={colors.textPrimary} />
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.headerIcon}
                                onPress={() => navigation.navigate('Search')}
                            >
                                <Icon name="search" size={24} color={colors.textPrimary} />
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.headerIcon}
                                onPress={() => navigation.navigate('Menu')} // Navigate to Menu/Profile
                            >
                                {/* Avatar Placeholder */}
                                <View style={styles.avatarPlaceholder}>
                                    <Icon name="person" size={16} color={colors.white} />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </LinearGradient>
            </Animated.View>

            <Animated.ScrollView
                style={styles.scrollView}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: false }
                )}
                scrollEventThrottle={16}
                showsVerticalScrollIndicator={false}
            >
                {/* Netflix Billboard */}
                {heroMedia && (
                    <NetflixBillboard
                        media={heroMedia}
                        onPlayPress={() => navigateToDetail(heroMedia.id)}
                        onMyListPress={() => handleAddToWatchlist(heroMedia)}
                    />
                )}

                {/* Content Rows */}
                <View style={styles.rowsContainer}>
                    {/* Top 10 Row */}
                    <NetflixRow
                        title="🔥 Top 10 en RDC"
                        mediaList={mediaCatalogue.slice(0, 10)}
                        showTop10={true}
                        size="large"
                    />

                    {/* Trending Now */}
                    <NetflixRow
                        title="Tendances actuelles"
                        mediaList={mediaCatalogue}
                        size="medium"
                        onSeeAll={() => console.log('See all trending')}
                    />

                    {/* New Releases */}
                    <NetflixRow
                        title="Nouveautés"
                        mediaList={[...mediaCatalogue].reverse()}
                        size="medium"
                    />

                    {/* Popular on Media243 */}
                    <NetflixRow
                        title="Populaire sur Media243"
                        mediaList={mediaCatalogue.slice(2)}
                        size="medium"
                    />

                    {/* African Cinema */}
                    <NetflixRow
                        title="Cinéma Africain"
                        mediaList={mediaCatalogue}
                        size="medium"
                    />

                    {/* Series */}
                    <NetflixRow
                        title="Séries à succès"
                        mediaList={mediaCatalogue.slice(1)}
                        size="medium"
                    />

                    {/* Documentaries */}
                    <NetflixRow
                        title="Documentaires"
                        mediaList={mediaCatalogue.slice(3)}
                        size="small"
                    />

                    <View style={styles.bottomSpacer} />
                </View>
            </Animated.ScrollView>
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
    scrollView: {
        flex: 1,
    },
    headerAbsolute: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
    },
    headerGradient: {
        paddingTop: spacing['2xl'],
        paddingBottom: spacing.base,
    },
    headerContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: spacing.base,
    },
    headerLogo: {
        ...typography.styles.h4,
        color: colors.textPrimary,
        fontWeight: typography.fontWeight.black,
        letterSpacing: 1,
    },
    headerLogoAccent: {
        color: colors.primary,
    },
    headerIcons: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerIcon: {
        marginLeft: spacing.lg,
    },
    rowsContainer: {
        marginTop: -spacing['4xl'],
        paddingTop: spacing.xl,
    },
    bottomSpacer: {
        height: spacing['6xl'],
    },
});

export default HomePage;