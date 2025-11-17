import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

const CastMember = ({ member }) => (
    <TouchableOpacity className="items-center mr-4 w-20">
        <Image
            source={{ uri: member.photo_url }}
            className="w-16 h-16 rounded-full border-2 border-red-600 mb-1" // Cercle + bordure rouge
            resizeMode="cover"
        />
        <Text
            className="text-white text-center text-xs font-semibold"
            numberOfLines={2}
        >
            {member.name}
        </Text>
    </TouchableOpacity>
);

const CastRow = ({ cast }) => {
    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="py-2"
        >
            <View className="flex-row">
                {cast.map(member => (
                    <CastMember key={member.id} member={member} />
                ))}
            </View>
        </ScrollView>
    );
};

export default CastRow;