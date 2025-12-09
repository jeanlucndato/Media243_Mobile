import { useRef, useState } from 'react';
import { ActivityIndicator, Platform, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
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
            <View style={styles.header}>
                <View style={styles.searchBar}>
                    <Icon name="search" size={20} color={colors.textSecondary} style={styles.searchIcon} />
                    <TextInput
                        ref={searchInputRef}
                        style={styles.searchInput}
                        placeholder="Search games, show, movies..."
                        placeholderTextColor={colors.textSecondary}
                        value={searchTerm}
                        onChangeText={handleSearch}
                        autoCapitalize="none"
                        selectionColor={colors.primary}
                    />
                    {searchTerm.length > 0 ? (
                        <TouchableOpacity onPress={() => {
                            setSearchTerm('');
                            setSearchResults([]);
                        }}>
                            <Icon name="close-circle" size={20} color={colors.textSecondary} />
                        </TouchableOpacity>
                    ) : (
                        <Icon name="mic-outline" size={20} color={colors.textSecondary} />
                    )}
                </View>
            </View>

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {loading ? (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color={colors.primary} />
                    </View>
                ) : searchResults.length > 0 ? (
                    /* Search Results - Grid or List? Netflix uses Grid for browse, List for Top Search 
                       BUT when typing, it shows "Top Results" or "Movies & TV".
                       Let's stick to Grid for results as it's more visual.
                    */
                    <View style={styles.resultsContainer}>
                        <Text style={styles.sectionTitle}>Movies & TV</Text>
                        {/* Reusing the Grid Layout from DetailPage roughly */}
                        <View style={styles.gridContainer}>
                            {searchResults.map((item) => (
                                <TouchableOpacity
                                    key={item.id}
                                    style={styles.gridItem}
                                    onPress={() => navigation.push('Detail', { id: item.id })} // Assuming Detail stack
                                >
                                    <View style={styles.rowItemContent}>
                                        {/* Horizontal List View for Search Results is also common but Grid is better for Volume */}
                                        <Image
                                            source={{ uri: item.poster_url || 'https://via.placeholder.com/150' }}
                                            style={styles.gridImage}
                                            resizeMode="cover"
                                        />
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                ) : searchTerm.length > 2 ? (
                    <View style={styles.noResultsContainer}>
                        <Text style={styles.noResultsText}>Oh darn. We don't have that.</Text>
                        <Text style={styles.noResultsSubText}>Try searching for something else.</Text>
                    </View>
                ) : (
                    /* Default View: Top Searches (List View) */
                    <View style={styles.topSearchesContainer}>
                        <Text style={styles.sectionTitle}>Top Searches</Text>
                        {/* Mock Top Searches using categories or catalogue (if available) */}
                        {/* For now, using categories as a placeholder for "Top Search" items visually */}
                        {categories.map((category, index) => (
                            <TouchableOpacity key={index} style={styles.topSearchItem}>
                                <Image
                                    source={{ uri: `https://via.placeholder.com/150x85/202020/FFFFFF?text=${category}` }}
                                    style={styles.topSearchImage}
                                />
                                <Text style={styles.topSearchText}>{category}</Text>
                                <Icon name="play-circle-outline" size={28} color={colors.white} style={styles.playIcon} />
                            </TouchableOpacity>
                        ))}
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
        backgroundColor: colors.background, // Solid black header
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 10 : 50,
        paddingBottom: spacing.sm,
        paddingHorizontal: spacing.sm,
        zIndex: 100,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#262626', // Darker grey like Netflix search bar
        height: 50, // Standard height
        borderRadius: 4, // Netflix search bar is mostly square
        paddingHorizontal: spacing.sm,
    },
    searchIcon: {
        marginRight: spacing.sm,
    },
    searchInput: {
        flex: 1,
        ...typography.styles.body,
        color: colors.textPrimary,
        height: '100%',
    },
    loadingContainer: {
        marginTop: spacing.xl,
        alignItems: 'center',
    },
    resultsContainer: {
        padding: spacing.sm,
    },
    sectionTitle: {
        ...typography.styles.h4,
        color: colors.textPrimary,
        fontWeight: 'bold',
        marginBottom: spacing.md,
        marginTop: spacing.sm,
        marginLeft: spacing.sm,
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        gap: 8,
    },
    gridItem: {
        width: '31%', // 3 columns
        aspectRatio: 2 / 3,
        marginBottom: 8,
        borderRadius: 4,
        overflow: 'hidden',
        backgroundColor: colors.backgroundCard,
    },
    gridImage: {
        width: '100%',
        height: '100%',
    },
    noResultsContainer: {
        marginTop: spacing['3xl'],
        alignItems: 'center',
        paddingHorizontal: spacing.xl,
    },
    noResultsText: {
        ...typography.styles.h3,
        color: colors.textPrimary,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: spacing.sm,
    },
    noResultsSubText: {
        ...typography.styles.body,
        color: colors.textSecondary,
        textAlign: 'center',
    },
    topSearchesContainer: {
        marginTop: spacing.sm,
    },
    topSearchItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 2, // Tiny gap
        backgroundColor: '#121212',
    },
    topSearchImage: {
        width: 130, // Landscape
        height: 70,
        marginRight: spacing.md,
    },
    topSearchText: {
        ...typography.styles.bodyLarge,
        color: colors.textPrimary,
        fontWeight: 'bold',
        flex: 1,
    },
    playIcon: {
        marginRight: spacing.md,
    },
    bottomSpacer: {
        height: 80,
    },
});

export default SearchScreen;