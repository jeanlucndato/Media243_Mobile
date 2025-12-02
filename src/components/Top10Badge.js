import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View } from 'react-native';
import colors from '../constants/colors';
import { typography } from '../constants/typography';

/**
 * Netflix-style Top 10 Badge
 * Displays large numbered badge for trending content
 */
const Top10Badge = ({ number }) => {
    return (
        <View style={styles.container}>
            <LinearGradient
                colors={[colors.primary, colors.primaryDark]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.badge}
            >
                <Text style={styles.number}>{number}</Text>
            </LinearGradient>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: -10,
        left: -5,
        zIndex: 10,
    },
    badge: {
        width: 50,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        shadowColor: colors.background,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.6,
        shadowRadius: 8,
        elevation: 10,
    },
    number: {
        ...typography.styles.h1,
        fontSize: 40,
        color: colors.textPrimary,
        fontWeight: typography.fontWeight.black,
        textShadowColor: colors.background,
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 4,
    },
});

export default Top10Badge;
