import { useNavigation } from '@react-navigation/native';
import { Image, Platform, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../constants/colors';
import { spacing } from '../constants/spacing';
import { typography } from '../constants/typography';
import { useAuth } from '../contexts/AuthContext';

const AccountScreen = () => {
    const navigation = useNavigation();
    const { user } = useAuth();

    const AccountRow = ({ icon, label, value, onPress }) => (
        <TouchableOpacity style={styles.accountRow} onPress={onPress}>
            <View style={styles.rowLeft}>
                <Icon name={icon} size={22} color={colors.textSecondary} style={styles.rowIcon} />
                <View style={styles.rowContent}>
                    <Text style={styles.rowLabel}>{label}</Text>
                    {value && <Text style={styles.rowValue}>{value}</Text>}
                </View>
            </View>
            <Icon name="chevron-forward" size={16} color={colors.textTertiary} />
        </TouchableOpacity>
    );

    const SectionHeader = ({ title }) => (
        <Text style={styles.sectionHeader}>{title}</Text>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="light-content" />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Icon name="arrow-back" size={24} color={colors.textPrimary} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Account</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {/* Profile Section */}
                <View style={styles.profileSection}>
                    <Image
                        source={{ uri: 'https://via.placeholder.com/120/E50914/FFFFFF?text=U' }}
                        style={styles.profileAvatar}
                    />
                    <Text style={styles.profileName}>{user?.name || 'User Name'}</Text>
                    <Text style={styles.profileEmail}>{user?.email || 'user@example.com'}</Text>
                    <TouchableOpacity style={styles.editProfileButton}>
                        <Icon name="create-outline" size={16} color={colors.white} style={{ marginRight: 6 }} />
                        <Text style={styles.editProfileText}>Edit Profile</Text>
                    </TouchableOpacity>
                </View>

                {/* Membership Section */}
                <View style={styles.section}>
                    <SectionHeader title="Membership & Billing" />
                    <AccountRow icon="card-outline" label="Payment Method" value="•••• 1234" onPress={() => { }} />
                    <AccountRow icon="calendar-outline" label="Billing Date" value="Next billing: Jan 9, 2026" onPress={() => { }} />
                    <AccountRow icon="pricetag-outline" label="Plan Details" value="Premium" onPress={() => { }} />
                </View>

                {/* Security Section */}
                <View style={styles.section}>
                    <SectionHeader title="Security" />
                    <AccountRow icon="lock-closed-outline" label="Change Password" onPress={() => { }} />
                    <AccountRow icon="shield-checkmark-outline" label="Two-Factor Authentication" value="Enabled" onPress={() => { }} />
                    <AccountRow icon="phone-portrait-outline" label="Manage Devices" value="3 devices" onPress={() => { }} />
                </View>

                {/* Preferences Section */}
                <View style={styles.section}>
                    <SectionHeader title="Preferences" />
                    <AccountRow icon="language-outline" label="Language" value="English" onPress={() => { }} />
                    <AccountRow icon="accessibility-outline" label="Subtitles & Audio" onPress={() => { }} />
                    <AccountRow icon="eye-off-outline" label="Viewing Restrictions" onPress={() => { }} />
                </View>

                {/* Account Management */}
                <View style={styles.section}>
                    <SectionHeader title="Account Management" />
                    <TouchableOpacity style={styles.dangerRow}>
                        <Icon name="trash-outline" size={22} color={colors.error} style={styles.rowIcon} />
                        <Text style={styles.dangerText}>Delete Account</Text>
                    </TouchableOpacity>
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
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: spacing.base,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 10 : spacing.xl,
        paddingBottom: spacing.base,
    },
    backButton: {
        padding: spacing.xs,
    },
    headerTitle: {
        ...typography.styles.h3,
        color: colors.textPrimary,
        fontWeight: 'bold',
    },
    scrollView: {
        flex: 1,
    },
    profileSection: {
        alignItems: 'center',
        paddingVertical: spacing.xl,
        borderBottomWidth: 1,
        borderBottomColor: '#262626',
    },
    profileAvatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: spacing.md,
    },
    profileName: {
        ...typography.styles.h3,
        color: colors.textPrimary,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    profileEmail: {
        ...typography.styles.body,
        color: colors.textSecondary,
        marginBottom: spacing.lg,
    },
    editProfileButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#262626',
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.sm,
        borderRadius: 20,
    },
    editProfileText: {
        ...typography.styles.body,
        color: colors.white,
        fontWeight: '600',
    },
    section: {
        marginTop: spacing.lg,
    },
    sectionHeader: {
        ...typography.styles.h4,
        color: colors.textSecondary,
        paddingHorizontal: spacing.base,
        marginBottom: spacing.sm,
        textTransform: 'uppercase',
        fontSize: 12,
        letterSpacing: 1,
        fontWeight: '600',
    },
    accountRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: spacing.base,
        paddingHorizontal: spacing.base,
        backgroundColor: '#1a1a1a',
        borderBottomWidth: 1,
        borderBottomColor: '#262626',
    },
    rowLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    rowIcon: {
        marginRight: spacing.md,
    },
    rowContent: {
        flex: 1,
    },
    rowLabel: {
        ...typography.styles.body,
        color: colors.textPrimary,
        marginBottom: 2,
    },
    rowValue: {
        ...typography.styles.caption,
        color: colors.textSecondary,
    },
    dangerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: spacing.base,
        paddingHorizontal: spacing.base,
        backgroundColor: '#1a1a1a',
    },
    dangerText: {
        ...typography.styles.body,
        color: colors.error,
        marginLeft: spacing.md,
    },
});

export default AccountScreen;
