import colors from "@/constants/theme/colors";
import { useColorSchemeState } from "@/hooks/useColorSchemeState";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";


interface DashboardHeaderProps {
    title: string;
    onMenuPress?: () => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ title, onMenuPress }) => {
    const { currentScheme, toggleColorScheme } = useColorSchemeState();

    const theme = colors[currentScheme === "light" ? "light" : "dark"];

    return (
        <View className="flex-row items-center justify-between px-4 py-3 bg-white dark:bg-gray-800 shadow-md">
            {/* Botón del menú */}
            <TouchableOpacity onPress={onMenuPress}>
                <Ionicons name="menu-outline" size={28} color={theme.primary} />
            </TouchableOpacity>

            {/* Título */}
            <View className="flex-1 ml-4">
                <Text className="text-gray-500 dark:text-gray-400 text-sm">Bienvenido</Text>
                <Text className="text-xl font-bold text-gray-900 dark:text-white">{title}</Text>
            </View>

            {/* Icono toggle */}
            <TouchableOpacity onPress={toggleColorScheme}>
                <Ionicons
                    name={currentScheme === "dark" ? "sunny-outline" : "moon-outline"}
                    size={24}
                    color={currentScheme === "dark" ? "#fbbf24" : "#111"}
                />
            </TouchableOpacity>
        </View>
    );
};