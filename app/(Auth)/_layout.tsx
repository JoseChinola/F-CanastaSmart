import colors from '@/constants/theme/colors';
import useColorScheme from '@/hooks/use-color-scheme';
import { useUser } from '@/hooks/useUser';
import { Redirect, Stack } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';


export default function AuthLayout() {
    const { user, loading } = useUser();
    const colorScheme = useColorScheme();

    const theme = colorScheme === "dark" ? colors.dark : colors.light;

    if (!loading && user) return <Redirect href={'/'} />

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


    return <Stack screenOptions={{ headerShown: false }} />
}
