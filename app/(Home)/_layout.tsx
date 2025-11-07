import { useUser } from '@/hooks/useUser';
import { Redirect, Stack } from 'expo-router';

export default function AppLayout() {
    const { user, loading } = useUser();


    if (!loading && !user) return <Redirect href={'/(Auth)/login'} />


    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" />
        </Stack>
    );
}
