import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// --- Composant 1: CastMember (Élément Individuel) ---
const CastMember = ({ member }) => (
    // Remplacement de la classe Tailwind par style={styles.memberContainer}
    <TouchableOpacity style={styles.memberContainer}>
        <Image
            source={{ uri: member.photo_url }}
            // Remplacement de la classe Tailwind par style={styles.memberImage}
            style={styles.memberImage}
            resizeMode="cover"
        />
        <Text
            // Remplacement de la classe Tailwind par style={styles.memberName}
            style={styles.memberName}
            numberOfLines={2}
        >
            {member.name}
        </Text>
    </TouchableOpacity>
);

// --- Composant 2: CastRow (Ligne de distribution) ---
const CastRow = ({ cast }) => {
    return (
        // Remplacement de la classe Tailwind par style={styles.castRowScroll}
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.castRowScroll}
        >
            {/* Remplacement de la classe Tailwind par style={styles.castRowContent} */}
            <View style={styles.castRowContent}>
                {cast.map(member => (
                    <CastMember key={member.id} member={member} />
                ))}
            </View>
        </ScrollView>
    );
};

// --- Définition des Styles (équivalents CSS) ---
const styles = StyleSheet.create({
    // Styles pour CastMember
    // Équivalent de: items-center mr-4 w-20
    memberContainer: {
        alignItems: 'center', // items-center
        marginRight: 16,     // mr-4 (environ 16 unités par défaut)
        width: 80,           // w-20 (environ 80 unités par défaut)
    },

    // Équivalent de: w-16 h-16 rounded-full border-2 border-red-600 mb-1
    memberImage: {
        width: 64,             // w-16
        height: 64,            // h-16
        borderRadius: 32,      // rounded-full (moitié de la largeur/hauteur)
        borderWidth: 2,        // border-2
        borderColor: '#DC2626', // border-red-600 (code hex. approximatif)
        marginBottom: 4,       // mb-1 (environ 4 unités par défaut)
    },

    // Équivalent de: text-white text-center text-xs font-semibold
    memberName: {
        color: 'white',        // text-white
        textAlign: 'center',   // text-center
        fontSize: 12,          // text-xs (environ 12px)
        fontWeight: '600',     // font-semibold
    },

    // Styles pour CastRow
    // Équivalent de: py-2
    castRowScroll: {
        paddingVertical: 8, // py-2 (environ 8 unités par défaut)
    },

    // Équivalent de: flex-row
    castRowContent: {
        flexDirection: 'row', // flex-row
    }
});

export default CastRow;