import { sendResetPasswordEmail } from "@/api/core/services/auth.services";
import colors from "@/constants/theme/colors";
import useColorScheme from "@/hooks/use-color-scheme";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Text, TextInput, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [emailSent, setEmailSent] = useState(false);
    const router = useRouter();
    const colorScheme = useColorScheme();
    const theme = colorScheme === "dark" ? colors.dark : colors.light;

    async function handleSendEmail() {
        if (!email.trim()) {
            Toast.show({
                type: "error",
                text1: "Campo vacío",
                text2: "Por favor ingresa tu correo electrónico.",
            });
            return;
        }

        setLoading(true);

        try {
            const res = await sendResetPasswordEmail(email);
            if (res.success) {
                Toast.show({
                    type: "success",
                    text1: "Correo enviado",
                    text2: res.message || "Revisa tu bandeja de entrada para continuar.",
                });
                router.replace({
                    pathname: "/verifyOTP",
                    params: { email }
                })
                setEmailSent(true);
                setEmail("");
            } else {
                Toast.show({
                    type: "error",
                    text1: "Error",
                    text2: res.message || "No se pudo enviar el correo.",
                });
            }
        } catch (error) {
            console.error(error);
            Toast.show({
                type: "error",
                text1: "Error de red",
                text2: "No se pudo enviar el correo de recuperación.",
            });
        } finally {
            setLoading(false);
        }
    }

    return (
        <View className="flex-1 justify-center items-center px-6 bg-white dark:bg-gray-900">
            <View className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
                <Text className="text-2xl font-bold mb-4 text-center text-gray-900 dark:text-white">
                    Recuperar contraseña
                </Text>

                {!emailSent ? (
                    <>
                        <Text className="text-center text-gray-600 dark:text-gray-300 mb-6">
                            Ingresa tu correo y te enviaremos un enlace para restablecer tu contraseña.
                        </Text>

                        <TextInput
                            placeholder="Correo electrónico"
                            placeholderTextColor="#9CA3AF"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            value={email}
                            onChangeText={setEmail}
                            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl p-4 text-gray-900 dark:text-white mb-6 bg-gray-50 dark:bg-gray-700"
                        />

                        {loading ? (
                            <ActivityIndicator size="large" color={theme.primary} />
                        ) : (
                            <TouchableOpacity
                                onPress={handleSendEmail}
                                className="bg-blue-600 py-4 rounded-2xl"
                            >
                                <Text className="text-white text-center font-semibold text-lg">
                                    Enviar enlace
                                </Text>
                            </TouchableOpacity>
                        )}

                        <TouchableOpacity onPress={() => router.replace("/login")}>
                            <Text className="text-blue-600 dark:text-blue-400 text-center mt-6">
                                Volver al inicio de sesión
                            </Text>
                        </TouchableOpacity>
                    </>
                ) : (
                    // ✅ Modo confirmación después de enviar el correo
                    <View className="items-center mt-4">
                        <Text className="text-lg text-center text-gray-700 dark:text-gray-200 mb-4">
                            ✅ ¡Correo enviado con éxito!
                        </Text>
                        <Text className="text-center text-gray-600 dark:text-gray-400 mb-8">
                            Revisa tu bandeja de entrada o la carpeta de spam.
                            <Text className="font-semibold"> Sigue las instrucciones para restablecer tu contraseña.</Text>
                        </Text>

                        <TouchableOpacity onPress={() => router.replace("/login")}>
                            <Text className="text-blue-600 dark:text-blue-400 text-center mt-6">
                                Volver al inicio de sesión
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => router.replace("/login")}
                            className="bg-blue-600 py-4 px-6 rounded-2xl"
                        >
                            <Text className="text-white text-center font-semibold text-lg">
                                Volver al inicio de sesión
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </View>
    );
}