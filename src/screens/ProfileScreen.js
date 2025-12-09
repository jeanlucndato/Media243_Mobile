import { useNavigation } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';
import { Image, Platform, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../constants/colors';
import { spacing } from '../constants/spacing';
import { typography } from '../constants/typography';
import { useAuth } from '../contexts/AuthContext';
import { useMedia } from '../contexts/MediaContext';

import NetflixRow from '../components/NetflixRow'; // Reuse for horizontal lists

const ProfileScreen = () => {
    const navigation = useNavigation();
    const { user, logout } = useAuth();
    const { watchlist } = useMedia();

    // Mock data for "liked" or history if not available
    const notifications = [];

    const handleLogout = async () => {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        logout();
    };

    const ActionButton = ({ icon, label, onPress, badge }) => (
        <TouchableOpacity style={styles.actionButton} onPress={onPress}>
            <View style={[styles.actionIconContainer, badge && styles.badgeContainer]}>
                <Icon name={icon} size={24} color={colors.white} />
                {badge > 0 && (
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>{badge}</Text>
                    </View>
                )}
            </View>
            <Text style={styles.actionLabel}>{label}</Text>
        </TouchableOpacity>
    );

    const MenuRow = ({ icon, label, onPress }) => (
        <TouchableOpacity style={styles.menuRow} onPress={onPress}>
            <View style={styles.menuRowLeft}>
                <Icon name={icon} size={24} color={colors.textSecondary} style={styles.menuIcon} />
                <Text style={styles.menuLabel}>{label}</Text>
            </View>
            <Icon name="chevron-forward" size={16} color={colors.textTertiary} />
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="light-content" />

            {/* Header / Profile Summary */}
            <View style={styles.header}>
                <View style={styles.headerTop}>
                    <Text style={styles.headerTitle}>My Media243</Text>
                    <View style={styles.headerIcons}>
                        <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                            <Icon name="search" size={24} color={colors.white} style={{ marginRight: 20 }} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { }}>
                            <Icon name="menu" size={24} color={colors.white} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.profileCard}>
                    <Image
                        source={{ uri: 'https://via.placeholder.com/100/E50914/FFFFFF?text=U' }} // Default avatar
                        style={styles.avatar}
                    />
                    <View style={styles.profileInfo}>
                        <Text style={styles.profileName}>{user?.name || 'User'}</Text>
                        <Text style={styles.profileHandle}>{user?.email || 'user@example.com'}</Text>
                    </View>
                    <Icon name="chevron-forward" size={20} color={colors.textSecondary} />
                </View>
            </View>

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>

                {/* Quick Actions Row */}
                <View style={styles.actionsRow}>
                    <ActionButton
                        icon="notifications"
                        label="Notifications"
                        badge={2}
                        onPress={() => navigation.navigate('Notifications')}
                    />
                    <ActionButton
                        icon="download"
                        label="Downloads"
                        onPress={() => navigation.navigate('Downloads')}
                    />
                </View>

                {/* Content Sections */}

                {/* My List Preview */}
                <View style={styles.sectionContainer}>
                    <NetflixRow
                        title="My List"
                        mediaList={watchlist}
                        size="medium"
                        onSeeAll={() => navigation.navigate('MyList')}
                    />
                </View>

                {/* Settings & More */}
                <View style={styles.menuContainer}>
                    <MenuRow
                        icon="settings-outline"
                        label="App Settings"
                        onPress={() => navigation.navigate('AppSettings')}
                    />
                    <MenuRow
                        icon="person-outline"
                        label="Account"
                        onPress={() => navigation.navigate('Account')}
                    />
                    <MenuRow
                        icon="help-circle-outline"
                        label="Help"
                        onPress={() => navigation.navigate('Help')}
                    />
                    <MenuRow icon="log-out-outline" label="Sign Out" onPress={handleLogout} />
                </View>

                <View style={styles.footer}>
                    <Text style={styles.versionText}>Version 1.0.1 • Media243 Mobile</Text>
                </View>

                <View style={{ height: 100 }} />
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.background,
    },
    header: {
        paddingHorizontal: spacing.base,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 10 : spacing.xl,
        paddingBottom: spacing.lg,
    },
    headerTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.xl,
    },
    headerTitle: {
        ...typography.styles.h2,
        color: colors.white,
    },
    headerIcons: {
        flexDirection: 'row',
    },
    profileCard: {
        flexDirection: 'row',
        alignItems: 'center',
        // No background, just clean layout
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 4, // Netflix uses square-ish avatars now
        marginRight: spacing.base,
    },
    profileInfo: {
        flex: 1,
    },
    profileName: {
        ...typography.styles.h4,
        color: colors.white,
        marginBottom: 2,
    },
    profileHandle: {
        ...typography.styles.caption,
        color: colors.textSecondary,
    },
    scrollView: {
        flex: 1,
    },
    actionsRow: {
        flexDirection: 'row',
        paddingHorizontal: spacing.base,
        marginBottom: spacing.xl,
        gap: spacing.base,
    },
    actionButton: {
        flex: 1, // Equal width
        backgroundColor: '#262626', // Dark button color
        borderRadius: 30, // Pill shape
        paddingVertical: 10,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 48,
    },
    actionIconContainer: {
        marginRight: spacing.sm,
    },
    badge: {
        position: 'absolute',
        top: -4,
        right: -6,
        backgroundColor: colors.primary,
        width: 16,
        height: 16,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: '#262626',
    },
    badgeText: {
        fontSize: 9,
        fontWeight: 'bold',
        color: colors.white,
    },
    actionLabel: {
        ...typography.styles.body,
        fontWeight: '600',
        color: colors.white,
    },
    sectionContainer: {
        marginBottom: spacing.md,
    },
    menuContainer: {
        paddingHorizontal: spacing.base,
    },
    menuRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: spacing.lg,
        borderBottomWidth: 1,
        borderBottomColor: '#262626',
    },
    menuRowLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    menuIcon: {
        marginRight: spacing.lg,
    },
    menuLabel: {
        ...typography.styles.bodyLarge,
        color: colors.textPrimary,
    },
    footer: {
        paddingVertical: spacing.xl,
        alignItems: 'center',
    },
    versionText: {
        color: colors.textTertiary,
        fontSize: 12,
    },
});

export default ProfileScreen;
