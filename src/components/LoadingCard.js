import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import colors from '../constants/colors';
import { spacing } from '../constants/spacing';

/**
 * Skeleton Loading Card with Shimmer Animation
 * Displays a placeholder while content is loading
 * 
 * @param {number} width - Card width (default: 112)
 * @param {number} height - Card height (default: 176)
 * @param {object} style - Additional styles
 */
const LoadingCard = ({ width = 112, height = 176, style }) => {
    const shimmerAnimation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const shimmer = Animated.loop(
            Animated.sequence([
                Animated.timing(shimmerAnimation, {
                    toValue: 1,
                    duration: 1500,
                    useNativeDriver: true,
                }),
                Animated.timing(shimmerAnimation, {
                    toValue: 0,
                    duration: 1500,
                    useNativeDriver: true,
                }),
            ])
        );

        shimmer.start();

        return () => shimmer.stop();
    }, []);

    const opacity = shimmerAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [0.3, 0.7],
    });

    return (
        <View style={[styles.container, { width, height }, style]}>
            <Animated.View style={[styles.shimmer, { opacity }]} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.backgroundCard,
        borderRadius: spacing.borderRadius.base,
        overflow: 'hidden',
        marginRight: spacing.md,
    },
    shimmer: {
        flex: 1,
        backgroundColor: colors.borderLight,
    },
});

export default LoadingCard;
