import { LinearGradient } from 'expo-linear-gradient';
import { useRef, useState } from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import NetflixRow from '../components/NetflixRow';
import colors from '../constants/colors';
import { spacing } from '../constants/spacing';
import { typography } from '../constants/typography';

// MOCK DATA
const mockResults = [
    { id: 1, title: "Résultat 1", poster_url: 'https://via.placeholder.com/150x225/333/fff?text=R1', rating: 8.5 },
    { id: 2, title: "Résultat 2", poster_url: 'https://via.placeholder.com/150x225/444/fff?text=R2', rating: 9.0 },
    { id: 3, title: "Résultat 3", poster_url: 'https://via.placeholder.com/150x225/555/fff?text=R3', rating: 7.8 },
];

const categories = ['Action', 'Drame', 'Comédie', 'Thriller', 'Documentaire', 'Famille'];

const SearchScreen = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const searchInputRef = useRef(null);

    const handleSearch = (query) => {
        setSearchTerm(query);
        if (query.length > 2) {
            setSearchResults(mockResults);
        } else {
            setSearchResults([]);
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
                            <TouchableOpacity onPress={() => setSearchTerm('')}>
                                <Icon name="close-circle" size={20} color={colors.textTertiary} />
                            </TouchableOpacity>
                        )}
                    </View>
                </View>

                {searchResults.length > 0 ? (
                    /* Search Results */
                    <View style={styles.resultsContainer}>
                        <NetflixRow
                            title="Résultats de recherche"
                            mediaList={searchResults}
                            size="large"
                        />
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