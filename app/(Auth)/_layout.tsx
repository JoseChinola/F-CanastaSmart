import colors from '@/constants/theme/colors';
import useColorScheme from '@/hooks/use-color-scheme';
import { useUser } from '@/hooks/useUser';
import { Redirect, Stack } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';

export default function AuthLayout() {
    const { user, loading } = useUser();
    const colorScheme = useColorScheme();

    const theme = colorScheme === "dark" ? colors.dark : colors.light;

    // 🚀 Si el usuario ya está logueado -> redirigir al root o dashboard
    if (!loading && user) {
        return <Redirect href="/" />;
    }

    // ⏳ Mientras carga (o si aún no sabemos si hay user) -> loader
    if (loading) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: theme.background,
                }}
            >
                <ActivityIndicator size="large" color={theme.primary} />
            </View>
        );
    }

    // 🧑‍💻 Si no hay usuario -> mostrar pantallas de autenticación
    return <Stack screenOptions={{ headerShown: false }} />;
}