import { changeUserPassword } from "@/api/core/services/users.services";
import { useUser } from "@/hooks/useUser";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import Toast from "react-native-toast-message";


export default function ChangePassword() {
    const { user } = useUser();
    const [newPassword, setNewPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChangePassword = async () => {
        if (newPassword !== confirmPassword) {
            Toast.show({
                type: "error",
                text1: "Error",
                text2: "Las contraseñas no coinciden.",
            });
            return;
        }
        if (newPassword.length < 6) {
            Alert.alert("Error", "");
            Toast.show({
                type: "error",
                text1: "Error",
                text2: "La nueva contraseña debe tener al menos 6 caracteres.",
            });
            return;
        }
        try {
            setLoading(true)
            const res = await changeUserPassword(user.id, newPassword);

            if (res.success) {
                Toast.show({
                    type: "success",
                    text1: "Éxito",
                    text2: res.message,
                });
                router.back();
            } else {
                Toast.show({
                    type: "error",
                    text1: "Error",
                    text2: res.message || "No se pudo actualizar el perfil.",
                });
            }
        } catch (error) {
            const message =
                error.response?.data?.message ||
                error.message ||
                "Ocurrió un error al actualizar la contraseña.";
            Toast.show({ type: "error", text1: "Error", text2: message });
        } finally {
            setLoading(false)
        }
    };

    return (
        <View className="flex-1 bg-gray-50 dark:bg-gray-900">
            {/* Header */}
            <View className="flex-row items-center px-5 py-4 border-b border-gray-200 dark:border-neutral-700 shadow-sm shadow-gray-300 dark:shadow-neutral-800 bg-gray-50 dark:bg-gray-800">
                <TouchableOpacity
                    onPress={() => router.back()}
                    className="p-2 rounded-full bg-gray-100 dark:bg-neutral-800"
                >
                    <Ionicons name="arrow-back" size={24} color="#3b82f6" />
                </TouchableOpacity>

                <Text className="flex-1 text-center text-xl font-bold text-gray-900 dark:text-white">
                    Cambio de Contraseña
                </Text>

                <View className="p-2 rounded-full bg-gray-100 dark:bg-neutral-800">
                    <Ionicons name="lock-closed-outline" size={25} color="#3b82f6" />
                </View>
            </View>

            {/* Contenido */}
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}

            >
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
                    showsVerticalScrollIndicator={false}
                    className="px-6 py-10"
                >
                    <View className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-neutral-700 rounded-2xl p-6 shadow-md shadow-gray-700 dark:shadow-gray-400">
                        <Text className="text-gray-900 dark:text-white text-lg font-bold mb-6 text-center">
                            Actualiza tu contraseña
                        </Text>


                        <Text className="text-gray-800 dark:text-gray-100 text-base mb-2 font-semibold">
                            Nueva contraseña
                        </Text>
                        <View className="relative w-full mb-4">
                            <TextInput
                                className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 mb-5 text-gray-900 dark:text-white"
                                secureTextEntry={!showPassword}
                                placeholder="Ingresa nueva contraseña"
                                placeholderTextColor="#9ca3af"
                                value={newPassword}
                                onChangeText={setNewPassword}
                            />

                            <TouchableOpacity
                                className="absolute right-2.5 top-3"
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

                        <Text className="text-gray-800 dark:text-gray-100 text-base mb-2 font-semibold">
                            Confirmar nueva contraseña
                        </Text>
                        <View className="relative w-full mb-6">
                            <TextInput
                                className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 mb-5 text-gray-900 dark:text-white"
                                placeholder="Confirma tu contraseña"
                                placeholderTextColor="#9ca3af"
                                secureTextEntry={!showConfirmPassword}
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                            />
                            <TouchableOpacity
                                className="absolute right-2.5 top-3"
                                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                <Ionicons
                                    name={showConfirmPassword ? "eye" : "eye-off"}
                                    size={24}
                                    color="gray"
                                />
                            </TouchableOpacity>

                        </View>
                        <TouchableOpacity
                            disabled={loading}
                            onPress={handleChangePassword}
                            className={`py-4 rounded-xl ${loading ? "bg-blue-300" : "bg-blue-500"
                                }`}
                        >
                            <Text className="text-center text-white font-bold text-lg">
                                {loading ? "Guardando..." : "Guardar cambios"}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}
