import { Image, TouchableOpacity, View } from "react-native";

export default function Header() {
    return (
        <View className="flex-row items-center justify-between px-4 py-2 bg-black">
            <Image
                source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" }}
                className="w-20 h-10"
                resizeMode="contain"
            />
            <TouchableOpacity>
                <Image
                    source={{ uri: "https://i.pravatar.cc/100" }}
                    className="w-8 h-8 rounded-full"
                />
            </TouchableOpacity>
        </View>
    );
}
