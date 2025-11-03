import EditProfile from "@/components/EditProfile";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import Toast from "react-native-toast-message";

export default function EditProfileScreen() {
    const { user, updateUser, loading } = useUser();
    const router = useRouter();


    const handleSave = async (updatedData) => {
        try {
            // Solo enviamos los campos modificados
            const patchData = {};
            for (const key in updatedData) {
                if (updatedData[key] !== user[key]) patchData[key] = updatedData[key];
            }

            if (Object.keys(patchData).length === 0) {
                Toast.show({
                    type: "info",
                    text1: "Sin cambios",
                    text2: "No modificaste ningún campo.",
                });
                return;
            }

            const res = await updateUser(user.id, patchData);

            if (res.success) {
                Toast.show({
                    type: "success",
                    text1: "Éxito",
                    text2: "Perfil actualizado con éxito.",
                });
                router.back();
            } else {
                Toast.show({
                    type: "error",
                    text1: "Error",
                    text2: res.message || "No se pudo actualizar el perfil.",
                });
            }
        } catch (err) {
            const message =
                err.response?.data?.message ||
                err.message ||
                "Ocurrió un error al actualizar el perfil.";
            Toast.show({ type: "error", text1: "Error", text2: message });
        }
    };

    // Si el usuario o los datos no están listos, mostramos un indicador
    if (loading) {
        return (
            <View className="flex-1 justify-center items-center bg-gray-50 dark:bg-gray-900">
                <ActivityIndicator size="large" color="#3b82f6" />
            </View>
        );
    }

    return <EditProfile user={user} onSave={handleSave} />;
}