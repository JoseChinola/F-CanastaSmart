import { Stack } from 'expo-router';
import { StatusBar } from 'react-native';

export default function AppLayout() {
    return (
        <>
            <StatusBar barStyle="default" />
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="(tabs)" />
            </Stack>
        </>
    );
}
