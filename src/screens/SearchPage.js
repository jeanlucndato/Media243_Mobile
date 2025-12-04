import { LinearGradient } from 'expo-linear-gradient';
import { useRef, useState } from 'react';
import { ActivityIndicator, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import NetflixRow from '../components/NetflixRow';
import colors from '../constants/colors';
import { spacing } from '../constants/spacing';
import { typography } from '../constants/typography';
import { api } from '../services/api';

const categories = ['Action', 'Drame', 'Comédie', 'Thriller', 'Documentaire', 'Famille'];

const SearchScreen = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const searchInputRef = useRef(null);
    const searchTimeout = useRef(null);

    const handleSearch = (query) => {
        setSearchTerm(query);

        if (searchTimeout.current) {
            clearTimeout(searchTimeout.current);
        }

        if (query.length > 2) {
            setLoading(true);
            searchTimeout.current = setTimeout(async () => {
                try {
                    const response = await api.searchContent(query);
                    if (response.status === 'success') {
                        // Combine movies and articles if needed, or just show movies for now
                        // The API returns { data: { movies: [], articles: [] } }
                        const movies = response.data.movies || [];
                        setSearchResults(movies);
                    }
                } catch (error) {
                    console.error("Search error:", error);
                } finally {
                    setLoading(false);
                }
            }, 500); // Debounce search
        } else {
            setSearchResults([]);
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="light-content" />

            {/* Netflix-style header */}
            <LinearGradient
                colors={['rgba(0,0,0,0.9)', 'rgba(0,0,0,0.7)', 'transparent']}
                style={styles.header}
            >
                <View style={styles.headerContent}>
                    <Text style={styles.headerTitle}>Recherche</Text>
                </View>
            </LinearGradient>

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {/* Search Bar */}
                <View style={styles.searchContainer}>
                    <View style={styles.searchBar}>
                        <Icon name="search-outline" size={20} color={colors.textTertiary} style={styles.searchIcon} />
                        <TextInput
                            ref={searchInputRef}
                            style={styles.searchInput}
                            placeholder="Titres, personnes, genres"
                            placeholderTextColor={colors.textTertiary}
                            value={searchTerm}
                            onChangeText={handleSearch}
                            autoCapitalize="none"
                        />
                        {searchTerm.length > 0 && (
                            <TouchableOpacity onPress={() => {
                                setSearchTerm('');
                                setSearchResults([]);
                            }}>
                                <Icon name="close-circle" size={20} color={colors.textTertiary} />
                            </TouchableOpacity>
                        )}
                    </View>
                </View>

                {loading ? (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="small" color={colors.primary} />
                    </View>
                ) : searchResults.length > 0 ? (
                    /* Search Results */
                    <View style={styles.resultsContainer}>
                        <NetflixRow
                            title="Résultats de recherche"
                            mediaList={searchResults}
                            size="large"
                        />
                    </View>
                ) : searchTerm.length > 2 ? (
                    <View style={styles.noResultsContainer}>
                        <Text style={styles.noResultsText}>Aucun résultat trouvé pour "{searchTerm}"</Text>
                    </View>
                ) : (
                    /* Categories Grid */
                    <View style={styles.categoriesContainer}>
                        <Text style={styles.sectionTitle}>Parcourir par catégorie</Text>
                        <View style={styles.categoriesGrid}>
                            {categories.map((category, index) => (
                                <TouchableOpacity key={index} style={styles.categoryCard}>
                                    <LinearGradient
                                        colors={[colors.primaryDark, colors.background]}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 1 }}
                                        style={styles.categoryGradient}
                                    >
                                        <Text style={styles.categoryText}>{category}</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                )}

                <View style={styles.bottomSpacer} />
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
    header: {
        paddingTop: spacing['2xl'],
        paddingBottom: spacing.base,
    },
    headerContent: {
        paddingHorizontal: spacing.base,
    },
    headerTitle: {
        ...typography.styles.h3,
        color: colors.textPrimary,
        fontWeight: typography.fontWeight.black,
    },
    searchContainer: {
        paddingHorizontal: spacing.base,
        paddingVertical: spacing.base,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.backgroundCard,
        borderRadius: spacing.borderRadius.sm,
        paddingHorizontal: spacing.base,
        paddingVertical: spacing.xs,
    },
    searchIcon: {
        marginRight: spacing.md,
    },
    searchInput: {
        flex: 1,
        ...typography.styles.body,
        color: colors.textPrimary,
        paddingVertical: spacing.sm,
    },
    resultsContainer: {
        marginTop: spacing.base,
    },
    loadingContainer: {
        marginTop: spacing.xl,
        alignItems: 'center',
    },
    noResultsContainer: {
        marginTop: spacing.xl,
        alignItems: 'center',
        paddingHorizontal: spacing.base,
    },
    noResultsText: {
        ...typography.styles.body,
        color: colors.textSecondary,
    },
    categoriesContainer: {
        paddingHorizontal: spacing.base,
        marginTop: spacing.base,
    },
    sectionTitle: {
        ...typography.styles.h4,
        color: colors.textPrimary,
        fontWeight: typography.fontWeight.bold,
        marginBottom: spacing.lg,
    },
    categoriesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: spacing.md,
    },
    categoryCard: {
        width: '47%',
        height: 80,
        borderRadius: spacing.borderRadius.base,
        overflow: 'hidden',
    },
    categoryGradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: spacing.base,
    },
    categoryText: {
        ...typography.styles.bodyLarge,
        color: colors.textPrimary,
        fontWeight: typography.fontWeight.bold,
        textAlign: 'center',
    },
    bottomSpacer: {
        height: spacing['6xl'],
    },
});

export default SearchScreen;