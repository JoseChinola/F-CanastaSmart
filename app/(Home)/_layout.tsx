import { useUser } from '@/hooks/useUser';
import { Redirect, Stack } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';

export default function AppLayout() {
    const { user, loading } = useUser();

    
    // ⏳ Mientras se carga el usuario (token, perfil, etc.)
    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#000" />
            </View>
        );
    }

    // 🔒 Si no hay usuario -> ir a login
    if (!user) {
        return <Redirect href="/(Auth)/login" />;
    }

    // ✅ Si hay usuario -> mostrar la app
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" />
        </Stack>
    );
}