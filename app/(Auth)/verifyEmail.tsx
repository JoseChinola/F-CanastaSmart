import { confirmEmail, resendVerifyEmail } from '@/api/core/services/auth.services';
import colors from '@/constants/theme/colors';
import useColorScheme from "@/hooks/use-color-scheme";
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';

export default function VerifyEmail() {
    const { email, token } = useLocalSearchParams<{ email?: string; token?: string }>();
    const [loading, setLoading] = useState(false);
    const [isResent, setIsResent] = useState(false); // 👈 nuevo estado
    const router = useRouter();

    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? colors.dark : colors.light;

    // Función para reenviar el correo
    async function resendVerification() {
        if (!email) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'No se encontró un correo válido para reenviar el enlace.',
            });
            return;
        }

        setLoading(true);
        try {
            const data = await resendVerifyEmail(email);
            if (data.success) {
                Toast.show({
                    type: 'success',
                    text1: 'Correo reenviado',
                    text2: 'Revisa tu bandeja de entrada para verificar tu cuenta.',
                });
                setIsResent(true); // 👈 marcamos que ya se reenvió
            } else {
                Toast.show({ type: 'error', text1: 'Error', text2: data.message });
            }
        } catch (error) {
            console.log(error);
            Toast.show({
                type: 'error',
                text1: 'Error de red',
                text2: 'No se pudo conectar con el servidor.',
            });
        } finally {
            setLoading(false);
        }
    }

    // Función para confirmar correo con token
    async function confirmEmailWithToken(token: string) {
        setLoading(true);
        try {
            const response = await confirmEmail(token);
            if (response.success) {
                Toast.show({
                    type: 'success',
                    text1: 'Correo verificado',
                    text2: response.message,
                });
                router.replace('/login');
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: response.message || 'No se pudo verificar el correo.',
                });
            }
        } catch (error: any) {
            console.log(error);
            Toast.show({
                type: 'error',
                text1: 'Error de verificación',
                text2: error.response?.data?.message || 'Ocurrió un error al verificar el correo.',
            });
        } finally {
            setLoading(false);
        }
    }

    // Si viene token, verificar automáticamente
    useEffect(() => {
        if (token) {
            confirmEmailWithToken(token);
        }
    }, [token]);

    return (
        <View className={`flex-1 justify-center items-center px-6`} style={{ backgroundColor: theme.background }}>
            <View className="bg-white dark:bg-gray-800 rounded-2xl p-8 w-full max-w-md shadow-lg">
                <Text className="text-2xl font-bold mb-4 text-center" style={{ color: theme.text }}>
                    Verifica tu correo electrónico
                </Text>

                <Text className="text-center text-gray-500 dark:text-gray-400 mb-6">
                    {token
                        ? 'Confirmando tu correo...'
                        : 'Hemos enviado un enlace de verificación al correo:'}
                </Text>

                {email && (
                    <Text className="font-semibold text-center text-gray-700 dark:text-gray-200 mb-8">
                        {email}
                    </Text>
                )}

                {loading ? (
                    <ActivityIndicator size="large" color={theme.primary} className="my-4" />
                ) : (
                    !token && !isResent && (
                        <TouchableOpacity
                            style={{
                                width: '100%',
                                paddingVertical: 16,
                                borderRadius: 24,
                                backgroundColor: theme.primary,
                                marginBottom: 16,
                            }}
                            onPress={resendVerification}
                        >
                            <Text
                                style={{
                                    textAlign: 'center',
                                    color: '#FFF',
                                    fontFamily: 'Montserrat_600SemiBold',
                                    fontSize: 16,
                                }}
                            >
                                Reenviar correo de verificación
                            </Text>
                        </TouchableOpacity>
                    )
                )}

                {/* 👇 Mostrar mensaje de éxito si ya se reenviaron */}
                {isResent && (
                    <View style={{ alignItems: 'center', marginBottom: 16 }}>
                        <Text
                            style={{
                                color: theme.success || '#22c55e',
                                fontSize: 18,
                                textAlign: 'center',
                                marginBottom: 8,
                            }}
                        >
                            ✅ ¡Correo reenviado con éxito!
                        </Text>

                        <Text className='mt-4' style={{ color: theme.text, textAlign: 'center' }}>
                            Revisa tu bandeja de entrada para verificar tu cuenta.
                        </Text>
                    </View>
                )}

            </View>
        </View>
    );
}
