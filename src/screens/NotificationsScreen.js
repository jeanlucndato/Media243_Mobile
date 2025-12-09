import { useNavigation } from '@react-navigation/native';
import { FlatList, Platform, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../constants/colors';
import { spacing } from '../constants/spacing';
import { typography } from '../constants/typography';

// Mock notification data
const mockNotifications = [
    {
        id: '1',
        type: 'new_release',
        title: 'New Movies Added',
        message: 'Check out the latest releases in your favorite genres',
        time: '2 hours ago',
        read: false,
        icon: 'film-outline',
    },
    {
        id: '2',
        type: 'recommendation',
        title: 'Recommended for You',
        message: 'Based on your watch history, we think you\'ll love these',
        time: '1 day ago',
        read: false,
        icon: 'star-outline',
    },
    {
        id: '3',
        type: 'download',
        title: 'Download Complete',
        message: 'Your download is ready to watch offline',
        time: '2 days ago',
        read: true,
        icon: 'download-outline',
    },
    {
        id: '4',
        type: 'reminder',
        title: 'Continue Watching',
        message: 'Pick up where you left off on your favorite shows',
        time: '3 days ago',
        read: true,
        icon: 'play-circle-outline',
    },
];

const NotificationsScreen = () => {
    const navigation = useNavigation();

    const renderNotification = ({ item }) => (
        <TouchableOpacity style={[styles.notificationItem, !item.read && styles.unread]}>
            <View style={[styles.iconContainer, !item.read && styles.unreadIcon]}>
                <Icon name={item.icon} size={24} color={!item.read ? colors.white : colors.textSecondary} />
            </View>
            <View style={styles.notificationContent}>
                <Text style={styles.notificationTitle}>{item.title}</Text>
                <Text style={styles.notificationMessage}>{item.message}</Text>
                <Text style={styles.notificationTime}>{item.time}</Text>
            </View>
            {!item.read && <View style={styles.unreadDot} />}
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
                <Text style={styles.headerTitle}>Notifications</Text>
                <TouchableOpacity style={styles.headerAction}>
                    <Text style={styles.markAllRead}>Mark all read</Text>
                </TouchableOpacity>
            </View>

            {/* Notifications List */}
            <FlatList
                data={mockNotifications}
                renderItem={renderNotification}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
            />
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
    headerAction: {
        padding: spacing.xs,
    },
    markAllRead: {
        ...typography.styles.caption,
        color: colors.primary,
        fontWeight: '600',
    },
    listContent: {
        paddingHorizontal: spacing.base,
        paddingTop: spacing.md,
        paddingBottom: spacing['6xl'],
    },
    notificationItem: {
        flexDirection: 'row',
        backgroundColor: '#1a1a1a',
        borderRadius: 8,
        padding: spacing.base,
        marginBottom: spacing.md,
        alignItems: 'center',
    },
    unread: {
        backgroundColor: '#262626',
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#333',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: spacing.md,
    },
    unreadIcon: {
        backgroundColor: colors.primary,
    },
    notificationContent: {
        flex: 1,
    },
    notificationTitle: {
        ...typography.styles.bodyLarge,
        color: colors.textPrimary,
        fontWeight: '600',
        marginBottom: 4,
    },
    notificationMessage: {
        ...typography.styles.body,
        color: colors.textSecondary,
        marginBottom: 4,
    },
    notificationTime: {
        ...typography.styles.caption,
        color: colors.textTertiary,
    },
    unreadDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: colors.primary,
        marginLeft: spacing.sm,
    },
});

export default NotificationsScreen;
