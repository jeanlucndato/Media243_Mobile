import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../constants/colors';
import { spacing } from '../constants/spacing';
import { typography } from '../constants/typography';
import Button from './Button';

/**
 * Reusable Empty State Component
 * 
 * @param {string} icon - Ionicons icon name
 * @param {string} title - Empty state title
 * @param {string} message - Empty state message
 * @param {string} actionLabel - Action button label (optional)
 * @param {function} onAction - Action button handler (optional)
 * @param {object} style - Additional container styles
 */
const EmptyState = ({
    icon = 'alert-circle-outline',
    title = 'Nothing Here',
    message = 'There\'s no content to display at the moment.',
    actionLabel,
    onAction,
    style,
}) => {
    return (
        <View style={[styles.container, style]}>
            <Icon name={icon} size={80} color={colors.textTertiary} />

            <Text style={styles.title}>{title}</Text>

            <Text style={styles.message}>{message}</Text>

            {actionLabel && onAction && (
                <Button
                    variant="primary"
                    title={actionLabel}
                    onPress={onAction}
                    style={styles.button}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: spacing['2xl'],
        paddingVertical: spacing['4xl'],
    },
    title: {
        ...typography.styles.h3,
        color: colors.textSecondary,
        marginTop: spacing.xl,
        textAlign: 'center',
    },
    message: {
        ...typography.styles.body,
        color: colors.textTertiary,
        textAlign: 'center',
        marginTop: spacing.md,
        lineHeight: typography.lineHeight.relaxed * typography.fontSize.base,
    },
    button: {
        marginTop: spacing.xl,
        minWidth: 200,
    },
});

export default EmptyState;
