import { useNavigation } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { Alert, Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Button from '../components/Button';
import colors from '../constants/colors';
import { spacing } from '../constants/spacing';
import { typography } from '../constants/typography';
import { useAuth } from '../contexts/AuthContext';
import { useMedia } from '../contexts/MediaContext';

const ProfileScreen = () => {
    const navigation = useNavigation();
    const { user, logout } = useAuth();
    const { watchlist, clearWatchlist } = useMedia();

    const handleLogout = () => {
        Alert.alert(
            'Se Déconnecter',
            'Êtes-vous sûr de vouloir vous déconnecter?',
            [
                { text: 'Annuler', style: 'cancel' },
                {
                    text: 'Déconnexion',
                    style: 'destructive',
                    onPress: async () => {
                        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                        await logout();
                    },
                },
            ]
        );
    };

    const handleClearWatchlist = () => {
        Alert.alert(
            'Vider Ma Liste',
            'Voulez-vous vraiment supprimer tous les éléments de votre liste?',
            [
                { text: 'Annuler', style: 'cancel' },
                {
                    text: 'Vider',
                    style: 'destructive',
                    onPress: async () => {
                        const result = await clearWatchlist();
                        if (result.success) {
                            Alert.alert('Succès', 'Votre liste a été vidée');
                        }
                    },
                },
            ]
        );
    };

    const SettingItem = ({ icon, title, onPress, showBadge, badgeCount, iconColor = colors.textSecondary }) => (
        <TouchableOpacity
            style={styles.settingItem}
            onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                onPress();
            }}
        >
            <View style={styles.settingLeft}>
                <Icon name={icon} size={24} color={iconColor} style={styles.settingIcon} />
                <Text style={styles.settingTitle}>{title}</Text>
            </View>
            <View style={styles.settingRight}>
                {showBadge && badgeCount > 0 && (
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>{badgeCount}</Text>
                    </View>
                )}
                <Icon name="chevron-forward" size={20} color={colors.textTertiary} />
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="light-content" />

            <ScrollView style={styles.scrollView}>
                {/* Header with Gradient */}
                <LinearGradient
                    colors={[colors.gradientStart, colors.gradientEnd]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.header}
                >
                    <View style={styles.profileSection}>
                        <Image
                            source={{ uri: user?.avatar || 'https://via.placeholder.com/100/DC2626/FFFFFF?text=U' }}
                            style={styles.avatar}
                        />
                        <Text style={styles.userName}>{user?.name || 'Utilisateur'}</Text>
                        <Text style={styles.userEmail}>{user?.email || 'email@example.com'}</Text>

                        <View style={styles.subscriptionBadge}>
                            <Icon name="star" size={16} color={colors.star} style={styles.starIcon} />
                            <Text style={styles.subscriptionText}>
                                {user?.subscription === 'premium' ? 'Premium' : 'Free'}
                            </Text>
                        </View>
                    </View>
                </LinearGradient>

                {/* My List Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Ma Liste</Text>
                    <SettingItem
                        icon="list-outline"
                        title="Voir Ma Liste"
                        onPress={() => navigation.navigate('MyList')}
                        showBadge={true}
                        badgeCount={watchlist.length}
                    />
                    {watchlist.length > 0 && (
                        <SettingItem
                            icon="trash-outline"
                            title="Vider Ma Liste"
                            onPress={handleClearWatchlist}
                            iconColor={colors.error}
                        />
                    )}
                </View>

                {/* Account Settings */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Compte</Text>
                    <SettingItem
                        icon="person-outline"
                        title="Informations du Profil"
                        onPress={() => Alert.alert('Info', 'Feature coming soon!')}
                    />
                    <SettingItem
                        icon="key-outline"
                        title="Changer le Mot de Passe"
                        onPress={() => Alert.alert('Info', 'Feature coming soon!')}
                    />
                    <SettingItem
                        icon="card-outline"
                        title="Abonnement & Paiement"
                        onPress={() => Alert.alert('Info', 'Feature coming soon!')}
                    />
                </View>

                {/* App Settings */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Paramètres</Text>
                    <SettingItem
                        icon="notifications-outline"
                        title="Notifications"
                        onPress={() => Alert.alert('Info', 'Feature coming soon!')}
                    />
                    <SettingItem
                        icon="download-outline"
                        title="Téléchargements"
                        onPress={() => Alert.alert('Info', 'Feature coming soon!')}
                    />
                    <SettingItem
                        icon="language-outline"
                        title="Langue"
                        onPress={() => Alert.alert('Info', 'Feature coming soon!')}
                    />
                    <SettingItem
                        icon="contrast-outline"
                        title="Apparence"
                        onPress={() => Alert.alert('Info', 'Feature coming soon!')}
                    />
                </View>

                {/* Help & Support */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Aide & Support</Text>
                    <SettingItem
                        icon="help-circle-outline"
                        title="Centre d'Aide"
                        onPress={() => Alert.alert('Info', 'Feature coming soon!')}
                    />
                    <SettingItem
                        icon="mail-outline"
                        title="Nous Contacter"
                        onPress={() => Alert.alert('Info', 'Feature coming soon!')}
                    />
                    <SettingItem
                        icon="document-text-outline"
                        title="Conditions d'Utilisation"
                        onPress={() => Alert.alert('Info', 'Feature coming soon!')}
                    />
                    <SettingItem
                        icon="shield-checkmark-outline"
                        title="Politique de Confidentialité"
                        onPress={() => Alert.alert('Info', 'Feature coming soon!')}
                    />
                </View>

                {/* Logout Button */}
                <View style={styles.logoutSection}>
                    <Button
                        variant="outline"
                        title="Se Déconnecter"
                        icon="log-out-outline"
                        iconPosition="left"
                        onPress={handleLogout}
                        style={styles.logoutButton}
                    />

                    <Text style={styles.versionText}>Version 1.0.0</Text>
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
    header: {
        paddingVertical: spacing['4xl'],
        paddingHorizontal: spacing.base,
    },
    profileSection: {
        alignItems: 'center',
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 4,
        borderColor: colors.textPrimary,
        marginBottom: spacing.base,
    },
    userName: {
        ...typography.styles.h3,
        color: colors.textPrimary,
        marginBottom: spacing.xs,
    },
    userEmail: {
        ...typography.styles.body,
        color: colors.white20,
        marginBottom: spacing.base,
    },
    subscriptionBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.black50,
        paddingHorizontal: spacing.base,
        paddingVertical: spacing.sm,
        borderRadius: spacing.borderRadius.full,
    },
    starIcon: {
        marginRight: spacing.xs,
    },
    subscriptionText: {
        ...typography.styles.bodySmall,
        color: colors.textPrimary,
        fontWeight: typography.fontWeight.bold,
        textTransform: 'uppercase',
    },
    section: {
        paddingTop: spacing.xl,
        paddingBottom: spacing.base,
    },
    sectionTitle: {
        ...typography.styles.h4,
        color: colors.textSecondary,
        paddingHorizontal: spacing.base,
        marginBottom: spacing.md,
    },
    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: spacing.base,
        paddingHorizontal: spacing.base,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },
    settingLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    settingIcon: {
        marginRight: spacing.md,
    },
    settingTitle: {
        ...typography.styles.body,
        color: colors.textPrimary,
    },
    settingRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    badge: {
        backgroundColor: colors.primary,
        borderRadius: spacing.borderRadius.full,
        minWidth: 24,
        height: 24,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: spacing.sm,
        paddingHorizontal: spacing.xs,
    },
    badgeText: {
        ...typography.styles.caption,
        color: colors.textPrimary,
        fontWeight: typography.fontWeight.bold,
    },
    logoutSection: {
        paddingHorizontal: spacing.base,
        paddingVertical: spacing['2xl'],
        alignItems: 'center',
    },
    logoutButton: {
        width: '100%',
        borderColor: colors.error,
    },
    versionText: {
        ...typography.styles.caption,
        color: colors.textTertiary,
        marginTop: spacing.xl,
    },
});

export default ProfileScreen;
