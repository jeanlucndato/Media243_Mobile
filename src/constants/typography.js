// Media243 Typography System
export const typography = {
    // Font Sizes
    fontSize: {
        xs: 10,
        sm: 12,
        base: 14,
        lg: 16,
        xl: 20,
        '2xl': 24,
        '3xl': 32,
        '4xl': 40,
        '5xl': 48,
    },

    // Font Weights
    fontWeight: {
        regular: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extraBold: '800', // Common for Netflix Titles
        black: '900',
    },

    // Line Heights
    lineHeight: {
        tight: 1.1, // Closer for titles
        normal: 1.4,
        relaxed: 1.6,
    },

    // Predefined Text Styles
    styles: {
        h1: {
            fontSize: 40,
            fontWeight: '900',
            lineHeight: 44,
        },
        h2: {
            fontSize: 32,
            fontWeight: '700',
            lineHeight: 36,
        },
        h3: {
            fontSize: 24,
            fontWeight: '700',
            lineHeight: 28,
        },
        h4: {
            fontSize: 20,
            fontWeight: '600',
            lineHeight: 24,
        },
        body: {
            fontSize: 14,
            fontWeight: '400',
            lineHeight: 20,
        },
        bodyLarge: {
            fontSize: 16,
            fontWeight: '400',
            lineHeight: 24,
        },
        bodySmall: {
            fontSize: 12,
            fontWeight: '400',
            lineHeight: 16,
        },
        caption: {
            fontSize: 10,
            fontWeight: '500', // Netflix uses slightly bolder captions often
            lineHeight: 14,
            letterSpacing: 0.2,
        },
        button: {
            fontSize: 16,
            fontWeight: '600',
            lineHeight: 20,
            letterSpacing: 0.5,
        },
    },
};

export default typography;
