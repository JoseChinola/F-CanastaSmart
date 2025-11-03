import { USER_LEVELS } from "@/constants/levels";
import { useUser } from "@/hooks/useUser";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
    Pressable,
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Achievements() {
    const { dashboard } = useUser();
    const userPoints = dashboard?.overview?.points;

    return (
        <SafeAreaView className="flex-1 bg-white dark:bg-gray-900">
            {/* HEADER */}
            <View className="flex-row items-center px-5 py-4 border-b border-gray-200 dark:border-neutral-700 shadow-sm shadow-gray-300 dark:shadow-neutral-800">
                <TouchableOpacity
                    onPress={() => router.back()}
                    className="p-2 rounded-full bg-gray-200 dark:bg-neutral-800"
                >
                    <Ionicons name="arrow-back" size={24} color="#3b82f6" />
                </TouchableOpacity>
                <Text className="flex-1 text-center text-2xl font-bold text-gray-900 dark:text-white">
                    Logros
                </Text>

                <TouchableOpacity
                    className="p-2 rounded-full bg-gray-200 dark:bg-neutral-800"
                >
                    <Ionicons name="heart-circle-outline" size={25} color="#3b82f6" />
                </TouchableOpacity>
            </View>

            {/* BODY */}
            <ScrollView
                showsVerticalScrollIndicator={false}
                className="flex-1 p-8 pb-10"
            >
                {/* Introducción */}
                <View className="mb-6 bg-gray-50 dark:bg-gray-800 rounded-xl p-4 shadow-sm shadow-gray-800 dark:shadow-gray-400">
                    <Text className="text-gray-900 dark:text-gray-100 text-base font-medium text-center">
                        Sube de nivel completando acciones y gana recompensas 🎯
                    </Text>
                </View>

                {/* NIVELES */}
                {USER_LEVELS.map((level) => {
                    const isUnlocked = userPoints >= level.minPoints;
                    const isCurrent =
                        userPoints >= level.minPoints && userPoints <= level.maxPoints;
                    const progress =
                        isCurrent && level.maxPoints !== Infinity
                            ? (userPoints - level.minPoints) /
                            (level.maxPoints - level.minPoints)
                            : isUnlocked
                                ? 1
                                : 0;

                    return (
                        <Pressable
                            key={level.id}
                            className={`mb-6 rounded-2xl p-4 shadow-md ${isUnlocked
                                ? "bg-white dark:bg-neutral-800 shadow-gray-800 dark:shadow-gray-400"
                                : "bg-gray-200/30 dark:bg-neutral-700/50"
                                }`}
                            style={{
                                transform: [{ scale: isCurrent ? 1.03 : 1 }],
                            }}
                        >

                            {/* Badge completado */}
                            {isUnlocked && (
                                <View className="absolute top-3 right-3 bg-green-500 px-2 py-2 rounded-full shadow-md">
                                    <Text className="text-white text-xs font-bold">Completado ✅</Text>
                                </View>
                            )}
                            {/* Emoji */}
                            <Text
                                className="text-center mb-2 mt-5"
                                style={{ fontSize: 60, opacity: isUnlocked ? 1 : 0.5 }}
                            >
                                {level.emoji}
                            </Text>

                            {/* Nombre del nivel */}
                            <Text
                                className={`text-center text-2xl font-bold mb-2 ${isUnlocked
                                    ? "text-gray-900 dark:text-white"
                                    : "text-gray-500 dark:text-gray-400"
                                    }`}
                            >
                                {level.name}
                            </Text>

                            {/* Descripción */}
                            <Text className="text-center text-gray-600 dark:text-gray-300 mb-3 text-sm">
                                {level.description}
                            </Text>

                            {/* Recompensas */}
                            {isUnlocked && (
                                <View className="mb-3 space-y-1 w-full">
                                    <Text className="text-gray-500 dark:text-gray-400 text-md mb-1.5 font-bold">
                                        Recompensas
                                    </Text>
                                    {level.rewards.map((r, i) => (
                                        <Text
                                            key={i}
                                            className="text-gray-500 dark:text-gray-400 text-sm px-2"
                                        >
                                            • {r}
                                        </Text>
                                    ))}
                                </View>
                            )}

                            {/* Barra de progreso */}
                            <View className="h-2 w-full bg-gray-300 dark:bg-neutral-700 rounded-full">
                                <View
                                    className="h-full rounded-full"
                                    style={{ width: `${progress * 100}%`, backgroundColor: level.color }}
                                />
                            </View>

                            {isCurrent && (
                                <View className="flex-row justify-between mt-1">
                                    <Text className="text-xs text-indigo-500 dark:text-indigo-400 text-left font-medium">
                                        Puntos actuales: {userPoints}
                                    </Text>
                                    <Text className="text-xs text-indigo-500 dark:text-indigo-400 text-right font-medium">
                                        Nivel actual ⭐
                                    </Text>
                                </View>
                            )}


                        </Pressable>
                    );
                })}
            </ScrollView>
        </SafeAreaView>
    );
}
