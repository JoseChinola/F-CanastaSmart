import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    ActivityIndicator,
    Image,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

export default function EditProfile({ user, onSave }) {
    const router = useRouter();
    const [form, setForm] = useState({
        firstname: user?.firstname || "",
        lastname: user?.lastname || "",
        email: user?.email || "",
    });

    const [avatar, setAvatar] = useState(user?.avatarUrl || null);
    const [isSaving, setIsSaving] = useState(false);

    const handleChange = (key, value) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    const handleSelectImage = async () => {
        try {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== "granted") {
                Toast.show({
                    type: "info",
                    text1: "Permiso denegado",
                    text2: "Se requiere acceso a la galería para cambiar la foto de perfil.",
                });
                return;
            }

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.8,
            });

            if (!result.canceled) {
                setAvatar(result.assets[0].uri);
                Toast.show({
                    type: "success",
                    text1: "Foto seleccionada",
                    text2: "Tu nueva foto de perfil ha sido seleccionada.",
                });
            }
        } catch (error) {
            console.error(error);
            Toast.show({
                type: "error",
                text1: "Error",
                text2: "No se pudo abrir la galería.",
            });
        }
    };

    const handleSave = async () => {
        const updatedData = {};

        if (form.firstname.trim() !== user.firstname) updatedData.firstname = form.firstname.trim();
        if (form.lastname.trim() !== user.lastname) updatedData.lastname = form.lastname.trim();
        if (form.email.trim() !== user.email) updatedData.email = form.email.trim();
        if (avatar !== user.avatarUrl) updatedData.avatarUrl = avatar;

        if (Object.keys(updatedData).length === 0) {
            Toast.show({
                type: "info",
                text1: "Sin cambios",
                text2: "No hay campos modificados para actualizar.",
            });
            return;
        }

        setIsSaving(true);
        try {
            await onSave(updatedData);
        } catch (error) {
            console.error(error);
            Toast.show({
                type: "error",
                text1: "Error",
                text2: "Ocurrió un problema al guardar los cambios.",
            });
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900">
            {/* Header */}
            <View className="flex-row items-center px-5 py-4 border-b border-gray-200 dark:border-neutral-700 shadow-sm shadow-gray-300 dark:shadow-neutral-800 bg-gray-50 dark:bg-gray-800">
                <TouchableOpacity
                    onPress={() => router.back()}
                    className="p-2 rounded-full bg-gray-100 dark:bg-neutral-800"
                >
                    <Ionicons name="arrow-back" size={24} color="#3b82f6" />
                </TouchableOpacity>

                <Text className="flex-1 text-center text-xl font-bold text-gray-900 dark:text-white">
                    Editar perfil
                </Text>

                <View className="p-2 rounded-full bg-gray-100 dark:bg-neutral-800">
                    <Ionicons name="create-outline" size={25} color="#3b82f6" />
                </View>
            </View>

            {/* BODY */}
            <ScrollView
                showsVerticalScrollIndicator={false}
                className="flex-1 p-8 pb-10"
            >

                {/* Imagen de perfil */}
                <View className="items-center mb-8">
                    {avatar ? (
                        <Image
                            source={{ uri: avatar }}
                            resizeMode="cover"
                            className="w-28 h-28 rounded-full mb-3 border-2 border-blue-500"
                        />
                    ) : (
                        <View className="w-28 h-28 rounded-full shadow-sm shadow-gray-800 dark:shadow-amber-50 bg-gray-200 dark:bg-gray-700 items-center justify-center mb-3">
                            <Ionicons name="person-outline" size={48} color="#9ca3af" />
                        </View>
                    )}

                    <TouchableOpacity
                        onPress={handleSelectImage}
                        className="flex-row items-center gap-2 shadow-sm shadow-gray-800 dark:shadow-amber-50 bg-blue-100 dark:bg-blue-800/40 px-4 py-2 rounded-full"
                    >
                        <Ionicons name="camera-outline" size={18} color="#2563eb" />
                        <Text className="text-blue-600 dark:text-blue-400 font-medium text-sm ">
                            Cambiar foto
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Formulario */}
                <View className="space-y-5 shadow-sm shadow-gray-800 dark:shadow-amber-50 p-3 rounded-2xl">
                    <View>
                        <Text className="text-gray-500 dark:text-gray-400 mb-2">Nombre</Text>
                        <TextInput
                            value={form.firstname}
                            onChangeText={(text) => handleChange("firstname", text)}
                            placeholder="Tu nombre"
                            className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-xl px-4 py-3 text-base"
                            placeholderTextColor="#9ca3af"
                        />
                    </View>

                    <View>
                        <Text className="text-gray-500 dark:text-gray-400 mb-2">Apellido</Text>
                        <TextInput
                            value={form.lastname}
                            onChangeText={(text) => handleChange("lastname", text)}
                            placeholder="Tu apellido"
                            className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-xl px-4 py-3 text-base"
                            placeholderTextColor="#9ca3af"
                        />
                    </View>

                    <View>
                        <Text className="text-gray-500 dark:text-gray-400 mb-2">
                            Correo electrónico
                        </Text>
                        <TextInput
                            value={form.email}
                            onChangeText={(text) => handleChange("email", text)}
                            placeholder="tucorreo@email.com"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            readOnly
                            className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-xl px-4 py-3 text-base"
                            placeholderTextColor="#9ca3af"
                        />
                    </View>
                </View>

                {/* Botón Guardar */}
                <TouchableOpacity
                    onPress={handleSave}
                    disabled={isSaving}
                    className={`mt-10 py-4 rounded-2xl items-center ${isSaving
                        ? "bg-blue-400"
                        : "bg-blue-600 dark:bg-blue-500 active:opacity-80"
                        }`}
                >
                    {isSaving ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text className="text-white font-semibold text-lg">Guardar cambios</Text>
                    )}
                </TouchableOpacity>

                {/* Botón Cancelar */}
                <TouchableOpacity
                    onPress={() => router.back()}
                    className="mt-4 border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 py-3 rounded-2xl items-center"
                >
                    <Text className="text-gray-700 dark:text-gray-200 font-medium">
                        Cancelar
                    </Text>
                </TouchableOpacity>

            </ScrollView>
        </SafeAreaView>
    );
}
