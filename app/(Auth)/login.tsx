import colors from '@/constants/theme/colors';
import useColorScheme from "@/hooks/use-color-scheme";
import { useUser } from '@/hooks/useUser';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';

export default function LoginScreen() {
    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? colors.dark : colors.light;
    const router = useRouter();
    const { login, loading } = useUser();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
            Toast.show({ type: 'error', text1: "Error", text2: 'Por favor, completa todos los campos.' });
            return;
        }

        try {
            const res = await login(email, password);

            if (!res.success) {
                Toast.show({ type: 'error', text1: 'Error', text2: res.message });
                return;
            }

            // Ahora sí podemos usar res.user
            if (!res.user.verified) {
                Toast.show({
                    type: 'info',
                    text1: 'Verifica tu correo',
                    text2: 'Revisa tu bandeja de entrada para confirmar tu cuenta.'
                });
                router.replace({ pathname: '/verifyEmail', params: { email } });
                return;
            }

            Toast.show({
                type: 'success',
                text1: 'Login exitoso',
                text2: 'Redirigiendo a inicio...'
            });

            router.replace('/(Home)/(tabs)');
        } catch (err: any) {
            const message = err.response?.data?.message || err.message || 'Ocurrió un error al iniciar sesión';
            Toast.show({ type: 'error', text1: 'Error', text2: message });
        }
    };

    return (
        <View
            className='flex-1 bg-gray-50 dark:bg-gray-900'
        >
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0} // ajusta según tu header
            >
                <ScrollView
                    style={{
                        flexGrow: 1,
                        paddingHorizontal: 24,
                        paddingTop: 40,
                    }}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    <View className="w-full bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-lg">
                        {/* Logo e identidad */}
                        <View className="justify-center items-center mb-8">
                            <Image
                                source={require("@/assets/logo.png")}
                                style={{ width: 150, height: 150 }}
                                className="w-24 h-24 mb-4 rounded-full bg-white"
                            />
                            <Text className="text-4xl font-bold text-center text-black dark:text-white">
                                Canasta Smart
                            </Text>
                            <Text className="text-gray-500 dark:text-gray-400 text-center mt-2 text-sm">
                                Accede a tu cuenta para continuar
                            </Text>
                        </View>

                        {/* Inputs */}
                        <View className="mb-4">
                            <TextInput
                                placeholder="Correo electrónico"
                                placeholderTextColor={theme.muted}
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                onFocus={() => setEmailFocus(true)}
                                onBlur={() => setEmailFocus(false)}
                                className={`
                            w-full p-4 mb-4 rounded-2xl bg-gray-50 text-black dark:bg-gray-700 dark:text-white        
                            ${emailFocus ? 'shadow-lg' : 'shadow-md'}
                        `}
                            />

                            <View className="relative w-full mb-4">
                                <TextInput
                                    placeholder="Contraseña"
                                    placeholderTextColor={theme.muted}
                                    secureTextEntry={!showPassword}
                                    value={password}
                                    onChangeText={setPassword}
                                    onFocus={() => setPasswordFocus(true)}
                                    onBlur={() => setPasswordFocus(false)}
                                    className={`
                                w-full p-4 rounded-2xl bg-gray-50 text-black dark:bg-gray-700 dark:text-white                              
                                ${passwordFocus ? 'shadow-lg' : 'shadow-md'}
                            `}
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
                        </View>

                        {/* Forgot password */}
                        <TouchableOpacity className='mb-4 w-fit self-end' onPress={() => router.replace("/forgotPassword")}>
                            <Text className="text-blue-600 dark:text-blue-400 font-medium text-sm text-right">
                                ¿Olvidaste tu contraseña?
                            </Text>
                        </TouchableOpacity>

                        {/* Botón Login */}
                        <TouchableOpacity
                            onPress={handleLogin}
                            disabled={loading}
                            className={`
                        w-full py-4 rounded-2xl mb-4
                        ${theme.primary ? 'bg-blue-600' : 'bg-gray-600'}
                        shadow-md
                        ${loading ? 'opacity-50' : 'opacity-100'}
                    `}
                        >
                            <Text className="text-white text-center font-semibold text-lg">
                                {loading ? 'Cargando...' : 'Iniciar sesión'}
                            </Text>
                        </TouchableOpacity>

                        {/* Registro */}
                        <TouchableOpacity className='mt-2 w-fit self-center' onPress={() => router.push('/register')}>
                            <Text className="text-center text-sm text-gray-500 dark:text-gray-400">
                                ¿No tienes cuenta? <Text className="font-semibold text-blue-600 dark:text-blue-400">Regístrate</Text>
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}
