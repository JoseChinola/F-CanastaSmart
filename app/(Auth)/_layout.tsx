import colors from '@/constants/theme/colors';
import useColorScheme from '@/hooks/use-color-scheme';
import { useUser } from '@/hooks/useUser';
import { Stack, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, StatusBar, View } from 'react-native';


export default function AuthLayout() {
    const { user, loading } = useUser();
    const colorScheme = useColorScheme();

    const theme = colorScheme === "dark" ? colors.dark : colors.light;

    const router = useRouter();

    useEffect(() => {
        if (!loading && user) {
            router.replace('/(Home)');
        }
    }, [user, loading, router]);

    // Mientras carga user, mostrar loader para evitar "flash" de auth screens
    if (loading || user) {
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


    return (
        <>
            <StatusBar barStyle="default" />
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="login" options={{ headerShown: false }} />
                <Stack.Screen name="register" options={{ headerShown: false }} />
                <Stack.Screen name="forgotPassword" options={{ headerShown: false }} />
                <Stack.Screen name="resetPassword" options={{ headerShown: false }} />
                <Stack.Screen name="verifyOTP" options={{ headerShown: false }} />
                <Stack.Screen name="verifyEmail" options={{ headerShown: false }} />
            </Stack>
        </>
    );
}
