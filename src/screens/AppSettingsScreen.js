import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Platform, SafeAreaView, ScrollView, StatusBar, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../constants/colors';
import { spacing } from '../constants/spacing';
import { typography } from '../constants/typography';

const AppSettingsScreen = () => {
    const navigation = useNavigation();
    const [settings, setSettings] = useState({
        autoPlay: true,
        downloadWifiOnly: true,
        notifications: true,
        mobileDataWarning: true,
        videoQuality: 'Auto',
    });

    const SettingToggle = ({ icon, label, description, value, onValueChange }) => (
        <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
                <Icon name={icon} size={22} color={colors.textSecondary} style={styles.settingIcon} />
                <View style={styles.settingText}>
                    <Text style={styles.settingLabel}>{label}</Text>
                    {description && <Text style={styles.settingDescription}>{description}</Text>}
                </View>
            </View>
            <Switch
                value={value}
                onValueChange={onValueChange}
                trackColor={{ false: '#3e3e3e', true: colors.primary }}
                thumbColor={colors.white}
            />
        </View>
    );

    const SettingOption = ({ icon, label, value, onPress }) => (
        <TouchableOpacity style={styles.settingRow} onPress={onPress}>
            <View style={styles.settingLeft}>
                <Icon name={icon} size={22} color={colors.textSecondary} style={styles.settingIcon} />
                <View style={styles.settingText}>
                    <Text style={styles.settingLabel}>{label}</Text>
                    {value && <Text style={styles.settingValue}>{value}</Text>}
                </View>
            </View>
            <Icon name="chevron-forward" size={16} color={colors.textTertiary} />
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="light-content" />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Icon name="arrow-back" size={24} color={colors.textPrimary} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>App Settings</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {/* Playback Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Playback</Text>
                    <SettingToggle
                        icon="play-circle-outline"
                        label="Auto-Play Next Episode"
                        description="Automatically play the next episode"
                        value={settings.autoPlay}
                        onValueChange={(value) => setSettings({ ...settings, autoPlay: value })}
                    />
                    <SettingOption
                        icon="videocam-outline"
                        label="Video Quality"
                        value={settings.videoQuality}
                        onPress={() => { }}
                    />
                </View>

                {/* Downloads Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Downloads</Text>
                    <SettingToggle
                        icon="wifi-outline"
                        label="Wi-Fi Only"
                        description="Download only when connected to Wi-Fi"
                        value={settings.downloadWifiOnly}
                        onValueChange={(value) => setSettings({ ...settings, downloadWifiOnly: value })}
                    />
                    <SettingOption icon="folder-outline" label="Download Location" value="Internal Storage" onPress={() => { }} />
                </View>

                {/* Notifications Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Notifications</Text>
                    <SettingToggle
                        icon="notifications-outline"
                        label="Push Notifications"
                        description="Receive alerts about new content"
                        value={settings.notifications}
                        onValueChange={(value) => setSettings({ ...settings, notifications: value })}
                    />
                </View>

                {/* Data Usage Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Data Usage</Text>
                    <SettingToggle
                        icon="cellular-outline"
                        label="Mobile Data Warning"
                        description="Warn before using mobile data"
                        value={settings.mobileDataWarning}
                        onValueChange={(value) => setSettings({ ...settings, mobileDataWarning: value })}
                    />
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
    section: {
        marginBottom: spacing.xl,
    },
    sectionTitle: {
        ...typography.styles.h4,
        color: colors.textSecondary,
        paddingHorizontal: spacing.base,
        marginBottom: spacing.md,
        textTransform: 'uppercase',
        fontSize: 12,
        letterSpacing: 1,
        fontWeight: '600',
    },
    settingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: spacing.base,
        paddingHorizontal: spacing.base,
        backgroundColor: '#1a1a1a',
        borderBottomWidth: 1,
        borderBottomColor: '#262626',
    },
    settingLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    settingIcon: {
        marginRight: spacing.md,
    },
    settingText: {
        flex: 1,
    },
    settingLabel: {
        ...typography.styles.body,
        color: colors.textPrimary,
        marginBottom: 2,
    },
    settingDescription: {
        ...typography.styles.caption,
        color: colors.textSecondary,
    },
    settingValue: {
        ...typography.styles.caption,
        color: colors.textTertiary,
    },
});

export default AppSettingsScreen;
