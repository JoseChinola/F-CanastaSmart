import colors from '@/constants/theme/colors';
import useColorScheme from "@/hooks/use-color-scheme";
import { useUser } from '@/hooks/useUser';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';

export default function RegisterScreen() {
    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? colors.dark : colors.light;
    const router = useRouter();
    const { register, loading } = useUser();

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');


    const handleRegister = async () => {

        if (!firstname || !lastname || !email || !password || !confirmPassword) {
            Toast.show({ type: 'error', text1: 'Campos vacios', text2: "Por favor, completa todos los campos." });
            return;
        }

        if (password !== confirmPassword) {
            Toast.show({ type: 'error', text1: 'Error', text2: "Las contraseñas no coinciden." });
            return;
        }

        try {
            const res = await register(firstname, lastname, email, password);

            if (!res.success) {
                Toast.show({ type: 'error', text1: 'Error', text2: res.message });
                return;
            }

            if (res.success) {
                Toast.show({ type: 'success', text1: 'Registro exitoso', text2: 'Redirigiendo al login...' });
                setTimeout(() => router.push('/login'), 1500);

            }
        } catch (err: any) {
            Toast.show({ type: 'error', text1: 'Error', text2: err.message });
        }

    };

    return (
        <KeyboardAvoidingView
            className="flex-1 justify-center items-center bg-white dark:bg-gray-900"
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <View className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-lg" style={{ width: Platform.OS === 'web' ? 450 : '100%' }}>

                {/* Cabecera */}
                <View className="flex-1 justify-center items-center mb-6">
                    <Image
                        source={{ uri: 'https://png.pngtree.com/png-clipart/20190611/original/pngtree-wolf-logo-png-image_2306634.jpg' }}
                        className="w-24 h-24 mb-4 rounded-full"
                    />
                    <Text className="text-3xl font-bold text-center text-black dark:text-white">
                        Crea tu cuenta
                    </Text>
                    <Text className="text-gray-500 dark:text-gray-400 text-center mt-2 text-sm">
                        Regístrate para comenzar a disfrutar de todos nuestros servicios.
                    </Text>
                </View>
                <View className='flex flex-row gap-2 mb-3'>
                    {/* Inputs */}
                    <TextInput
                        placeholder="Nombre"
                        placeholderTextColor={theme.muted}
                        className="w-full p-4 rounded-2xl bg-white text-black dark:bg-gray-700 dark:text-white"
                        value={firstname}
                        onChangeText={setFirstname}
                    />

                    <TextInput
                        placeholder="Apellido"
                        placeholderTextColor={theme.muted}
                        className="w-full p-4 rounded-2xl bg-white text-black dark:bg-gray-700 dark:text-white"
                        value={lastname}
                        onChangeText={setLastname}
                    />
                </View>

                <TextInput
                    placeholder="Correo electrónico"
                    placeholderTextColor={theme.muted}
                    keyboardType="email-address"
                    className="w-full p-4 mb-3 rounded-2xl bg-white text-black dark:bg-gray-700 dark:text-white"
                    value={email}
                    onChangeText={setEmail}
                />

                <TextInput
                    placeholder="Contraseña"
                    placeholderTextColor={theme.muted}
                    secureTextEntry
                    className="w-full p-4 mb-3 rounded-2xl bg-white text-black dark:bg-gray-700 dark:text-white"
                    value={password}
                    onChangeText={setPassword}
                />

                <TextInput
                    placeholder="Confirmar contraseña"
                    placeholderTextColor={theme.muted}
                    secureTextEntry
                    className="w-full p-4 mb-3 rounded-2xl bg-white text-black dark:bg-gray-700 dark:text-white"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                />



                {/* Botón Registrarse */}
                <TouchableOpacity
                    onPress={handleRegister}
                    disabled={loading}
                    className={`
                        w-full py-4 rounded-2xl mb-4 mt-2
                        ${theme.primary ? 'bg-blue-600' : 'bg-gray-600'}
                        shadow-md
                        ${loading ? 'opacity-50' : 'opacity-100'}
                    `}
                >
                    <Text className="text-white text-center font-semibold text-lg">
                        {loading ? 'Cargando...' : ' Registrarse'}
                    </Text>
                </TouchableOpacity>

                {/* Link a Login */}
                <TouchableOpacity className='w-fit self-center' onPress={() => router.push('/login')}>
                    <Text className="text-center text-sm text-gray-500 dark:text-gray-400">
                        ¿Ya tienes cuenta? <Text className="font-semibold text-blue-600 dark:text-blue-400">Iniciar sesión</Text>
                    </Text>
                </TouchableOpacity>

            </View>
        </KeyboardAvoidingView>
    );
}
