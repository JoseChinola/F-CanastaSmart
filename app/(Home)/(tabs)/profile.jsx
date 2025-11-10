import DashboardLayout from "@/components/dashboard/DashboardLayout";
import colors from "@/constants/theme/colors";
import useColorScheme from "@/hooks/use-color-scheme";
import { useUser } from "@/hooks/useUser";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { ActivityIndicator, Image, Text, TouchableOpacity, View } from "react-native";

export default function Profile() {
    const colorScheme = useColorScheme();
    const { user, loading, logout } = useUser();
    const theme = colorScheme === "dark" ? colors.dark : colors.light;

    if (loading) {
        return (
            <View className="flex-1 justify-center items-center bg-white dark:bg-black">
                <Image
                    resizeMode="cover"
                    source={{
                        uri: "https://png.pngtree.com/png-clipart/20190611/original/pngtree-wolf-logo-png-image_2306634.jpg",
                    }}
                    style={{ width: 150, height: 150, marginBottom: 20 }}
                />
                <ActivityIndicator size="large" color={theme.primary} />
            </View>
        );
    }

    if (!user) {
        return (
            <View className="flex-1 items-center justify-center bg-white dark:bg-gray-900">
                <Text className="text-gray-500 dark:text-gray-400">Cargando perfil...</Text>
            </View>
        );
    }

    // Formatear fecha de creación
    const formattedDate = new Date(user.createdAt).toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    const handleLogout = async () => {
        try {
            await logout();
            router.replace("/login");
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    };

    return (
        <DashboardLayout title="Mi perfil">
            {/* --- Encabezado del perfil --- */}
            <View className="items-center mb-6">
                {user.avatarUrl ? (
                    <Image
                        source={{ uri: user.avatarUrl }}
                        className="w-24 h-24 rounded-full mb-3"
                    />
                ) : (
                    <View className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 items-center justify-center mb-3">
                        <Text className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                            {user.firstname?.charAt(0)}
                            {user.lastname?.charAt(0)}
                        </Text>
                    </View>
                )}

                <Text className="text-xl font-bold text-gray-900 dark:text-white">
                    {user.firstname} {user.lastname}
                </Text>
                <Text className="text-gray-500 dark:text-gray-400 text-sm">
                    {user.email}
                </Text>
            </View>

            {/* --- Información general --- */}
            <View className="mb-6 shadow-sm shadow-gray-800 dark:shadow-amber-50 p-3 rounded-2xl">
                <Text className="text-gray-400 dark:text-gray-500 text-xs uppercase mb-2 tracking-wide">
                    Información general
                </Text>

                <View className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-4 mb-2">
                    <View className="flex-row justify-between mb-3">
                        <Text className="text-gray-500 dark:text-gray-400">Rol</Text>
                        <Text className="text-gray-900 dark:text-gray-100 font-medium">
                            {user.role?.name || "Sin rol"}
                        </Text>
                    </View>

                    <View className="flex-row justify-between mb-3">
                        <Text className="text-gray-500 dark:text-gray-400">Verificado</Text>
                        <Text
                            className={`font-medium ${user.verified ? "text-green-500" : "text-red-500"
                                }`}
                        >
                            {user.verified ? "Sí" : "No"}
                        </Text>
                    </View>

                    <View className="flex-row justify-between mb-3">
                        <Text className="text-gray-500 dark:text-gray-400">Activo</Text>
                        <Text
                            className={`font-medium ${user.isActive ? "text-green-500" : "text-red-500"
                                }`}
                        >
                            {user.isActive ? "Sí" : "No"}
                        </Text>
                    </View>

                    <View className="flex-row justify-between">
                        <Text className="text-gray-500 dark:text-gray-400">
                            Fecha de registro
                        </Text>
                        <Text className="text-gray-900 dark:text-gray-100 font-medium">
                            {formattedDate}
                        </Text>
                    </View>
                </View>
            </View>


            {/* --- Sección: Acciones --- */}
            <View className="mb-6 shadow-sm shadow-gray-800 dark:shadow-amber-50 p-3 rounded-2xl">
                <Text className="text-gray-400 dark:text-gray-500 text-xs uppercase mb-2 tracking-wide">
                    Acciones
                </Text>

                <TouchableOpacity
                    onPress={() => router.push("/(Home)/profile/edit-profile")}
                    className="flex-row items-center justify-between bg-gray-50 dark:bg-gray-800 rounded-2xl p-4 mb-3 shadow-sm shadow-gray-200 dark:shadow-black">
                    <View className="flex-row gap-2 items-center space-x-3">
                        <Ionicons name="create-outline" size={22} color={theme.primary} />
                        <Text className="text-gray-900 dark:text-white font-medium">
                            Editar perfil
                        </Text>
                    </View>
                    <Ionicons name="chevron-forward" size={18} color={theme.primary} />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => router.push("/(Home)/profile/changePassword")}
                    className="flex-row items-center justify-between bg-gray-50 dark:bg-gray-800 rounded-2xl p-4 mb-3 shadow-sm shadow-gray-200 dark:shadow-black">
                    <View className="flex-row gap-2 items-center space-x-3">
                        <Ionicons name="lock-closed-outline" size={22} color={theme.primary} />
                        <Text className="text-gray-900 dark:text-white font-medium">
                            Cambiar de contraseña
                        </Text>
                    </View>
                    <Ionicons name="chevron-forward" size={18} color={theme.primary} />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => router.push("/(Home)/profile/achievements")}
                    className="flex-row items-center justify-between bg-gray-50 dark:bg-gray-800 rounded-2xl p-4 mb-3 shadow-sm shadow-gray-200 dark:shadow-black"
                >
                    <View className="flex-row gap-2 items-center space-x-3">
                        <Ionicons name="heart-circle-outline" size={22} color={theme.primary} />
                        <Text className="text-gray-900 dark:text-white font-medium">
                            Logros
                        </Text>
                    </View>
                    <Ionicons name="chevron-forward" size={18} color={theme.primary} />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => router.push("/(Home)/profile/settings")}
                    className="flex-row items-center justify-between mb-5 bg-gray-50 dark:bg-gray-800 rounded-2xl p-4 shadow-sm shadow-gray-200 dark:shadow-black">
                    <View className="flex-row gap-2 items-center space-x-3">
                        <Ionicons name="settings-outline" size={22} color={theme.primary} />
                        <Text className="text-gray-900 dark:text-white font-medium">
                            Ajustes
                        </Text>
                    </View>
                    <Ionicons name="chevron-forward" size={18} color={theme.primary} />
                </TouchableOpacity>

                <TouchableOpacity
                    className="flex-row items-center justify-center bg-red-50 dark:bg-red-900 rounded-2xl p-4 shadow-sm shadow-red-300 dark:shadow-red-800 active:opacity-80"
                    onPress={handleLogout}
                >
                    <Ionicons name="log-out-outline" size={22} color="#EF4444" />
                    <Text className="ml-2 text-red-600 dark:text-red-400 font-medium text-base">
                        Cerrar sesión
                    </Text>
                </TouchableOpacity>
            </View>

        </DashboardLayout >
    );
}
