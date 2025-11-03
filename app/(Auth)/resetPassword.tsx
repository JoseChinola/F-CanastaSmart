import { resetPassword } from "@/api/core/services/auth.services";
import colors from "@/constants/theme/colors";
import useColorScheme from "@/hooks/use-color-scheme";
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, TextInput, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";

export default function ResetPassword() {
    const { userId } = useLocalSearchParams<{ userId?: string }>();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const colorScheme = useColorScheme();
    const theme = colorScheme === "dark" ? colors.dark : colors.light;

    useEffect(() => {
        if (!userId) {
            Toast.show({
                type: "error",
                text1: "Campo vacío",
                text2: "Usuario vacío, vuelve a reenviar el código.",
            });
            router.replace("/forgotPassword");
        }
    }, [userId, router]);


    async function handleResetPassword() {
        if (!userId) {
            Toast.show({
                type: "error",
                text1: "Usuario inválido",
                text2: "El enlace no es válido o ha expirado.",
            });            
            return;
        }

        if (!password || !confirmPassword) {
            Toast.show({
                type: "error",
                text1: "Campos vacíos",
                text2: "Por favor completa ambos campos.",
            });
            return;
        }

        if (password !== confirmPassword) {
            Toast.show({
                type: "error",
                text1: "Contraseñas no coinciden",
                text2: "Verifica que ambas contraseñas sean iguales.",
            });
            return;
        }

        setLoading(true);
        try {
            const res = await resetPassword({ userId, password });
            if (res.success) {
                Toast.show({
                    type: "success",
                    text1: "Contraseña cambiada",
                    text2: "Ya puedes iniciar sesión con tu nueva contraseña.",
                });
                router.replace("/login");
            } else {
                Toast.show({
                    type: "error",
                    text1: "Error",
                    text2: res.message || "No se pudo cambiar la contraseña.",
                });
            }
        } catch (error) {
            console.log(error);
            Toast.show({
                type: "error",
                text1: "Error de red",
                text2: "No se pudo conectar con el servidor.",
            });
        } finally {
            setLoading(false);
        }
    }

    return (
        <View className="flex-1 justify-center items-center px-6 bg-white dark:bg-gray-900">
            <View className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
                <Text className="text-2xl font-bold mb-4 text-center text-gray-900 dark:text-white">
                    Restablecer contraseña
                </Text>

                <Text className="text-center text-gray-500 dark:text-gray-400 mb-6">
                    Ingresa tu nueva contraseña para continuar.
                </Text>

                <View className="relative w-full mb-4">
                    <TextInput
                        placeholder="Nueva contraseña"
                        placeholderTextColor="#9CA3AF"
                        secureTextEntry={!showPassword} // depende del estado
                        value={password}
                        onChangeText={setPassword}
                        className="w-full border border-gray-300 dark:border-gray-600 rounded-xl p-4 text-gray-900 dark:text-white"
                    />
                    <TouchableOpacity
                        className="absolute right-4 top-4"
                        onPress={() => setShowPassword(!showPassword)}
                    >
                        <Ionicons
                            name={showPassword ? "eye" : "eye-off"}
                            size={24}
                            color="gray"
                        />
                    </TouchableOpacity>
                </View>

                {/* Confirmar contraseña */}
                <View className="relative w-full mb-6">
                    <TextInput
                        placeholder="Confirmar nueva contraseña"
                        placeholderTextColor="#9CA3AF"
                        secureTextEntry={!showConfirmPassword}
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        className="w-full border border-gray-300 dark:border-gray-600 rounded-xl p-4 text-gray-900 dark:text-white"
                    />
                    <TouchableOpacity
                        className="absolute right-4 top-4"
                        onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                        <Ionicons
                            name={showConfirmPassword ? "eye" : "eye-off"}
                            size={24}
                            color="gray"
                        />
                    </TouchableOpacity>
                </View>

                {loading ? (
                    <ActivityIndicator size="large" color={theme.primary} />
                ) : (
                    <TouchableOpacity
                        onPress={handleResetPassword}
                        className="bg-blue-600 py-4 rounded-2xl"
                    >
                        <Text className="text-white text-center font-semibold text-lg">
                            Cambiar contraseña
                        </Text>
                    </TouchableOpacity>
                )}

                <TouchableOpacity onPress={() => router.replace("/login")}>
                    <Text className="text-blue-600 dark:text-blue-400 text-center mt-6">
                        Volver al inicio de sesión
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}