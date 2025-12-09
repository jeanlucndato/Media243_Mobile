import { useNavigation } from '@react-navigation/native';
import { Linking, Platform, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../constants/colors';
import { spacing } from '../constants/spacing';
import { typography } from '../constants/typography';

const HelpScreen = () => {
    const navigation = useNavigation();

    const HelpCategory = ({ icon, title, description, onPress }) => (
        <TouchableOpacity style={styles.categoryCard} onPress={onPress}>
            <View style={styles.categoryIcon}>
                <Icon name={icon} size={28} color={colors.primary} />
            </View>
            <View style={styles.categoryContent}>
                <Text style={styles.categoryTitle}>{title}</Text>
                <Text style={styles.categoryDescription}>{description}</Text>
            </View>
            <Icon name="chevron-forward" size={20} color={colors.textTertiary} />
        </TouchableOpacity>
    );

    const FAQItem = ({ question, answer }) => (
        <View style={styles.faqItem}>
            <Text style={styles.faqQuestion}>Q: {question}</Text>
            <Text style={styles.faqAnswer}>A: {answer}</Text>
        </View>
    );

    const ContactOption = ({ icon, label, value, onPress }) => (
        <TouchableOpacity style={styles.contactOption} onPress={onPress}>
            <Icon name={icon} size={24} color={colors.white} style={styles.contactIcon} />
            <View style={styles.contactContent}>
                <Text style={styles.contactLabel}>{label}</Text>
                <Text style={styles.contactValue}>{value}</Text>
            </View>
            <Icon name="arrow-forward" size={20} color={colors.textSecondary} />
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
                <Text style={styles.headerTitle}>Help & Support</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {/* Search Help */}
                <View style={styles.searchSection}>
                    <Icon name="search" size={20} color={colors.textTertiary} style={styles.searchIcon} />
                    <Text style={styles.searchPlaceholder}>Search for help...</Text>
                </View>

                {/* Quick Help Categories */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>How can we help?</Text>
                    <HelpCategory
                        icon="play-outline"
                        title="Playback Issues"
                        description="Video not playing or buffering"
                        onPress={() => {}}
                    />
                    <HelpCategory
                        icon="download-outline"
                        title="Downloads"
                        description="Manage offline content"
                        onPress={() => {}}
                    />
                    <HelpCategory
                        icon="card-outline"
                        title="Billing & Plans"
                        description="Subscriptions and payments"
                        onPress={() => {}}
                    />
                    <HelpCategory
                        icon="settings-outline"
                        title="Account Settings"
                        description="Update your preferences"
                        onPress={() => {}}
                    />
                </View>

                {/* FAQs */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
                    <FAQItem
                        question="How do I download content?"
                        answer="Tap the download icon on any title to save it for offline viewing."
                    />
                    <FAQItem
                        question="How many devices can I use?"
                        answer="You can use Media243 on up to 5 devices simultaneously with a Premium plan."
                    />
                    <FAQItem
                        question="How do I cancel my subscription?"
                        answer="Go to Account > Plan Details and select 'Cancel Subscription'."
                    />
                </View>

                {/* Contact Support */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Contact Us</Text>
                    <ContactOption
                        icon="mail-outline"
                        label="Email Support"
                        value="support@media243.com"
                        onPress={() => Linking.openURL('mailto:support@media243.com')}
                    />
                    <ContactOption
                        icon="chatbubbles-outline"
                        label="Live Chat"
                        value="Available 24/7"
                        onPress={() => {}}
                    />
                    <ContactOption
                        icon="call-outline"
                        label="Phone Support"
                        value="+1 (800) 123-4567"
                        onPress={() => Linking.openURL('tel:+18001234567')}
                    />
                </View>

                {/* Additional Resources */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Additional Resources</Text>
                    <TouchableOpacity style={styles.resourceLink}>
                        <Icon name="document-text-outline" size={20} color={colors.primary} />
                        <Text style={styles.resourceText}>Terms of Service</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.resourceLink}>
                        <Icon name="shield-checkmark-outline" size={20} color={colors.primary} />
                        <Text style={styles.resourceText}>Privacy Policy</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.resourceLink}>
                        <Icon name="information-circle-outline" size={20} color={colors.primary} />
                        <Text style={styles.resourceText}>About Media243</Text>
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
    searchSection: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1a1a1a',
        borderRadius: 8,
        paddingHorizontal: spacing.base,
        paddingVertical: spacing.md,
        marginHorizontal: spacing.base,
        marginBottom: spacing.lg,
    },
    searchIcon: {
        marginRight: spacing.sm,
    },
    searchPlaceholder: {
        ...typography.styles.body,
        color: colors.textTertiary,
    },
    section: {
        marginBottom: spacing.xl,
    },
    sectionTitle: {
        ...typography.styles.h4,
        color: colors.textPrimary,
        paddingHorizontal: spacing.base,
        marginBottom: spacing.md,
        fontWeight: 'bold',
    },
    categoryCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1a1a1a',
        padding: spacing.base,
        marginHorizontal: spacing.base,
        marginBottom: spacing.sm,
        borderRadius: 8,
    },
    categoryIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#262626',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: spacing.md,
    },
    categoryContent: {
        flex: 1,
    },
    categoryTitle: {
        ...typography.styles.bodyLarge,
        color: colors.textPrimary,
        fontWeight: '600',
        marginBottom: 2,
    },
    categoryDescription: {
        ...typography.styles.caption,
        color: colors.textSecondary,
    },
    faqItem: {
        backgroundColor: '#1a1a1a',
        padding: spacing.base,
        marginHorizontal: spacing.base,
        marginBottom: spacing.sm,
        borderRadius: 8,
    },
    faqQuestion: {
        ...typography.styles.body,
        color: colors.textPrimary,
        fontWeight: '600',
        marginBottom: spacing.sm,
    },
    faqAnswer: {
        ...typography.styles.body,
        color: colors.textSecondary,
        lineHeight: 20,
    },
    contactOption: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1a1a1a',
        padding: spacing.base,
        marginHorizontal: spacing.base,
        marginBottom: spacing.sm,
        borderRadius: 8,
    },
    contactIcon: {
        marginRight: spacing.md,
    },
    contactContent: {
        flex: 1,
    },
    contactLabel: {
        ...typography.styles.body,
        color: colors.textPrimary,
        fontWeight: '600',
        marginBottom: 2,
    },
    contactValue: {
        ...typography.styles.caption,
        color: colors.textSecondary,
    },
    resourceLink: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.base,
        marginHorizontal: spacing.base,
        borderBottomWidth: 1,
        borderBottomColor: '#262626',
    },
    resourceText: {
        ...typography.styles.body,
        color: colors.primary,
        marginLeft: spacing.md,
    },
});

export default HelpScreen;
