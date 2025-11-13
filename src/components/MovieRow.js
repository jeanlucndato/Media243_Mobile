import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function MovieRow({ title, movies }) {
    return (
        <View className="mb-6">
            <Text className="text-white text-lg font-bold mb-2 px-4">{title}</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {movies.map((movie) => (
                    <TouchableOpacity key={movie.id} className="mr-3">
                        <Image
                            source={{ uri: movie.poster }}
                            className="w-32 h-48 rounded-xl"
                        />
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
}
