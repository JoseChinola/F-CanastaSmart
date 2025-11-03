import { verifyForgotPasswordOtp } from "@/api/core/services/auth.services";
import colors from "@/constants/theme/colors";
import useColorScheme from "@/hooks/use-color-scheme";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Text, TextInput, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";

export default function VerifyOtp() {
    const { email } = useLocalSearchParams<{ email: string }>();
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const colorScheme = useColorScheme();
    const theme = colorScheme === "dark" ? colors.dark : colors.light;

    useEffect(() => {
        if (!email) {
            Toast.show({
                type: "error",
                text1: "Campo vacío",
                text2: "Correo vacío, vuelve a reenviar el código.",
            });
            router.replace("/forgotPassword");
        }
    }, [email, router]);

    
    async function handleVerifyOtp() {
        if (!otp) {
            Toast.show({
                type: "error",
                text1: "Campo vacio",
                text2: "Por favor ingresa el código OTP."
            })
            return
        }
        setLoading(true)
        try {
            const res = await verifyForgotPasswordOtp({ email, otp })
            if (res.success) {
                Toast.show({
                    type: "success",
                    text1: "OTP verificado",
                    text2: "Ahora puedes cambiar tu contraseña."
                });

                router.replace({
                    pathname: "/resetPassword",
                    params: { userId: res.userId },
                })
            } else {
                Toast.show({
                    type: "error",
                    text1: "Error",
                    text2: res.message || "OTP inválido o expirado.",
                });
            }

        } catch (error) {
            console.log(error);
            Toast.show({
                type: "error",
                text1: "Error de red",
                text2: "No se pudo verificar el código.",
            });
        } finally {
            setLoading(false)
        }
    }

    return (
        <View className="flex-1 justify-center items-center px-6 bg-white dark:bg-gray-900">
            <View className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
                <Text className="text-2xl font-bold mb-4 text-center text-gray-900 dark:text-white">
                    Verificar código OTP
                </Text>

                <Text className="text-center text-gray-500 dark:text-gray-400 mb-6">
                    Ingresa el código de 6 dígitos que enviamos al correo:
                </Text>

                <Text className="text-center text-xl font-semibold text-gray-700 dark:text-gray-300 mb-6 italic">
                    {email}
                </Text>

                <TextInput
                    placeholder="Ej: 123456"
                    placeholderTextColor="#9CA3AF"
                    keyboardType="number-pad"
                    maxLength={6}
                    value={otp}
                    onChangeText={setOtp}
                    className="flex mx-auto w-1/2 border border-gray-300 dark:border-blue-400 rounded-xl p-3 text-center text-lg tracking-widest text-gray-900 dark:text-white mb-6"
                />

                {loading ? (
                    <ActivityIndicator size="large" color={theme.primary} />
                ) : (
                    <TouchableOpacity
                        onPress={handleVerifyOtp}
                        className="bg-blue-600 py-4 rounded-2xl"
                    >
                        <Text
                            className="text-white text-center font-semibold text-lg"
                        >
                            Verificar código
                        </Text>
                    </TouchableOpacity>
                )}


                <TouchableOpacity onPress={() => router.replace("/forgotPassword")}>
                    <Text className="text-blue-600 dark:text-blue-400 text-center mt-6">
                        Reenviar código
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}