import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../constants/colors';
import { spacing } from '../constants/spacing';
import { typography } from '../constants/typography';

/**
 * Reusable Button Component with multiple variants
 * 
 * @param {string} variant - 'primary', 'secondary', 'outline', or 'ghost'
 * @param {string} title - Button text
 * @param {function} onPress - Press handler
 * @param {boolean} loading - Show loading spinner
 * @param {boolean} disabled - Disable button
 * @param {string} icon - Ionicons icon name
 * @param {string} iconPosition - 'left' or 'right'
 * @param {object} style - Additional styles
 * @param {boolean} haptic - Enable haptic feedback (default: true)
 */
const Button = ({
    variant = 'primary',
    title,
    onPress,
    loading = false,
    disabled = false,
    icon,
    iconPosition = 'left',
    style,
    haptic = true,
    ...props
}) => {
    const handlePress = () => {
        if (haptic && !disabled && !loading) {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
        if (onPress && !disabled && !loading) {
            onPress();
        }
    };

    const renderContent = () => (
        <View style={styles.contentContainer}>
            {loading ? (
                <ActivityIndicator color={getTextColor()} size="small" />
            ) : (
                <>
                    {icon && iconPosition === 'left' && (
                        <Icon name={icon} size={20} color={getTextColor()} style={styles.iconLeft} />
                    )}
                    <Text style={[styles.text, getTextStyle()]}>{title}</Text>
                    {icon && iconPosition === 'right' && (
                        <Icon name={icon} size={20} color={getTextColor()} style={styles.iconRight} />
                    )}
                </>
            )}
        </View>
    );

    const getTextColor = () => {
        if (disabled) return colors.textDisabled;

        switch (variant) {
            case 'primary':
                return colors.textPrimary;
            case 'secondary':
                return colors.textPrimary;
            case 'outline':
                return colors.primary;
            case 'ghost':
                return colors.textSecondary;
            default:
                return colors.textPrimary;
        }
    };

    const getTextStyle = () => {
        return {
            color: getTextColor(),
            ...typography.styles.button,
        };
    };

    const buttonStyle = [
        styles.button,
        variant === 'outline' && styles.outlineButton,
        variant === 'ghost' && styles.ghostButton,
        variant === 'secondary' && styles.secondaryButton,
        disabled && styles.disabled,
        style,
    ];

    if (variant === 'primary' && !disabled) {
        return (
            <TouchableOpacity onPress={handlePress} disabled={disabled || loading} {...props}>
                <LinearGradient
                    colors={[colors.gradientStart, colors.gradientEnd]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={buttonStyle}
                >
                    {renderContent()}
                </LinearGradient>
            </TouchableOpacity>
        );
    }

    return (
        <TouchableOpacity
            onPress={handlePress}
            disabled={disabled || loading}
            style={buttonStyle}
            {...props}
        >
            {renderContent()}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.xl,
        borderRadius: spacing.borderRadius.base,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 48,
        shadowColor: colors.background,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 6,
    },
    secondaryButton: {
        backgroundColor: colors.backgroundElevated,
    },
    outlineButton: {
        backgroundColor: colors.transparent,
        borderWidth: 2,
        borderColor: colors.primary,
    },
    ghostButton: {
        backgroundColor: colors.transparent,
        shadowOpacity: 0,
        elevation: 0,
    },
    disabled: {
        opacity: 0.5,
        shadowOpacity: 0,
        elevation: 0,
    },
    contentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        textAlign: 'center',
    },
    iconLeft: {
        marginRight: spacing.sm,
    },
    iconRight: {
        marginLeft: spacing.sm,
    },
});

export default Button;
