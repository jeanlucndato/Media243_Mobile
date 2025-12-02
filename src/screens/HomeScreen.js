import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRef, useState } from 'react';
import { Animated, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import NetflixBillboard from '../components/NetflixBillboard';
import NetflixRow from '../components/NetflixRow';
import colors from '../constants/colors';
import { spacing } from '../constants/spacing';
import { typography } from '../constants/typography';

// MOCK DATA
const mockMedia = [
    { id: 1, title: "Héritage 243", poster_url: 'https://via.placeholder.com/150x225/B82329/FFFFFF?text=F1', rating: 9.2 },
    { id: 2, title: "Kin Nights", poster_url: 'https://via.placeholder.com/150x225/404040/FFFFFF?text=F2', rating: 8.5 },
    { id: 3, title: "La Nuit du Congo", poster_url: 'https://via.placeholder.com/150x225/222222/FFFFFF?text=F3', rating: 8.8 },
    { id: 4, title: "RDC Stories", poster_url: 'https://via.placeholder.com/150x225/555555/FFFFFF?text=F4', rating: 7.9 },
    { id: 5, title: "Saga de Goma", poster_url: 'https://via.placeholder.com/150x225/888888/FFFFFF?text=F5', rating: 8.1 },
    { id: 6, title: "Kinshasa Dreams", poster_url: 'https://via.placeholder.com/150x225/666666/FFFFFF?text=F6', rating: 8.7 },
    { id: 7, title: "Congo Tales", poster_url: 'https://via.placeholder.com/150x225/333333/FFFFFF?text=F7', rating: 9.0 },
];

const HomePage = () => {
    const navigation = useNavigation();
    const scrollY = useRef(new Animated.Value(0)).current;
    const [headerOpacity] = useState(new Animated.Value(0));

    const heroMedia = {
        id: 99,
        title: "Le Cœur de l'Afrique",
        backgroundImage: 'https://via.placeholder.com/1080x600/1C1C1C/FFFFFF?text=Bannière+Principale',
        rating: 9.5,
    };

    const navigateToDetail = (id) => {
        navigation.navigate('Detail', { id });
    };

    // Netflix-style transparent header that appears on scroll
    const headerAnimatedStyle = {
        opacity: scrollY.interpolate({
            inputRange: [0, 100],
            outputRange: [0, 1],
            extrapolate: 'clamp',
        }),
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

            {/* Netflix-style transparent header */}
            <Animated.View style={[styles.headerAbsolute, headerAnimatedStyle]}>
                <LinearGradient
                    colors={['rgba(0,0,0,0.9)', 'rgba(0,0,0,0.7)', 'transparent']}
                    style={styles.headerGradient}
                >
                    <View style={styles.headerContent}>
                        <Text style={styles.headerLogo}>
                            MEDIA<Text style={styles.headerLogoAccent}>243</Text>
                        </Text>

                        <View style={styles.headerIcons}>
                            <TouchableOpacity style={styles.headerIcon}>
                                <Icon name="search-outline" size={24} color={colors.textPrimary} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.headerIcon}>
                                <Icon name="notifications-outline" size={24} color={colors.textPrimary} />
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
                <NetflixBillboard
                    media={heroMedia}
                    onPlayPress={() => navigateToDetail(heroMedia.id)}
                    onMyListPress={() => console.log('Add to list')}
                />

                {/* Content Rows */}
                <View style={styles.rowsContainer}>
                    {/* Top 10 Row */}
                    <NetflixRow
                        title="🔥 Top 10 en RDC"
                        mediaList={mockMedia.slice(0, 10)}
                        showTop10={true}
                        size="large"
                    />

                    {/* Trending Now */}
                    <NetflixRow
                        title="Tendances actuelles"
                        mediaList={mockMedia}
                        size="medium"
                        onSeeAll={() => console.log('See all trending')}
                    />

                    {/* New Releases */}
                    <NetflixRow
                        title="Nouveautés"
                        mediaList={[...mockMedia].reverse()}
                        size="medium"
                    />

                    {/* Popular on Media243 */}
                    <NetflixRow
                        title="Populaire sur Media243"
                        mediaList={mockMedia.slice(2)}
                        size="medium"
                    />

                    {/* African Cinema */}
                    <NetflixRow
                        title="Cinéma Africain"
                        mediaList={mockMedia}
                        size="medium"
                    />

                    {/* Series */}
                    <NetflixRow
                        title="Séries à succès"
                        mediaList={mockMedia.slice(1)}
                        size="medium"
                    />

                    {/* Documentaries */}
                    <NetflixRow
                        title="Documentaires"
                        mediaList={mockMedia.slice(3)}
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