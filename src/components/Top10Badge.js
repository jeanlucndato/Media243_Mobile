import { StyleSheet, Text, View } from 'react-native';
import colors from '../constants/colors';

/**
 * Netflix-style Top 10 Badge
 * Displays large numbered badge for trending content
 */
const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: -20, // Push slightly below card
        left: -15,   // Overlap left edge
        zIndex: 10,
    },
    // Removed badge container background
    badge: {
        // No background
    },
    number: {
        fontSize: 100, // Massive number
        color: colors.black, // Dark fill
        fontWeight: '900',
        textShadowColor: colors.white, // White outline effect simulation
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 1, // Sharp shadow to simulate stroke
        // Note: Proper text stroke requires 'react-native-svg' or platform specific props
        // We will simulate with shadow for now or use the textStroke prop if available (some RN versions support it)
        // Alternative: Use 'color: transparent' and textShadow for cutout look? High contrast is safer.
        includeFontPadding: false,
    },
});
// Since achieving the exact Netflix cutout look without SVG is hard, 
// a high contrast "Big White Number with Shadow" or "Big Outline" is best.
// Let's go with Big White Number with Black Stroke simulation.

const Top10Badge = ({ number }) => {
    return (
        <View style={styles.container}>
            {/* Layered Text for Stroke Effect */}
            <Text style={[styles.number, { position: 'absolute', textShadowColor: colors.white, textShadowRadius: 2, top: 0, left: 0 }]}>{number}</Text>
            <Text style={[styles.number, { color: colors.background, zIndex: 1 }]}>{number}</Text>
            {/* This creates a 'cutout' look if the number color matches background, but the shadow is white. 
                Wait, if text is black and shadow white, it looks like a white outline? 
                Let's stick to Big White Number for readability. 
            */}
        </View>
    );
};

// Re-writing the component for the file content replacement
const RealTop10Badge = ({ number }) => {
    return (
        <View style={localStyles.container}>
            <Text style={localStyles.number}>{number}</Text>
        </View>
    );
};

const localStyles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: -15,
        left: -10,
        zIndex: 10,
        width: 80,
        height: 100,
        justifyContent: 'flex-end',
    },
    number: {
        fontSize: 90,
        fontWeight: '900',
        color: '#FFFFFF', // White text
        textShadowColor: '#000000',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 4,
        includeFontPadding: false,
        textAlign: 'center',
        // On styled components we might do -webkit-text-stroke but here simply big bold white
    }
});

export default RealTop10Badge;
