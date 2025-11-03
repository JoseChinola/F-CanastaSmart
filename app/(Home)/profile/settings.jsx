import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function settings() {
    return (
        <SafeAreaView className="flex-1 bg-white dark:bg-black">
            <View className="flex-row items-center px-5 py-4 border-b border-gray-200 dark:border-neutral-700 shadow-sm shadow-gray-300 dark:shadow-neutral-800">
                <TouchableOpacity
                    onPress={() => router.back()}
                    className="p-2 rounded-full bg-gray-200 dark:bg-neutral-800"
                >
                    <Ionicons name="arrow-back" size={24} color="#3b82f6" />
                </TouchableOpacity>
                <Text className="flex-1 text-center text-2xl font-bold text-gray-900 dark:text-white">
                    Configuración
                </Text>

                <TouchableOpacity                    
                    className="p-2 rounded-full bg-gray-200 dark:bg-neutral-800"
                >
                    <Ionicons name="settings-outline" size={25} color="#3b82f6" />
                </TouchableOpacity>
                {/* <Ionicons name="heart-circle-outline" size={24} /> */}
            </View>
            <Text className="text-black dark:text-gray-50 font-bold text-2xl">
                Pantalla de configuracion
            </Text>
        </SafeAreaView>
    )
}