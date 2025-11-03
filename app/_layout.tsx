import { toastConfig } from '@/components/custom/CustomToastConfig';
import { AuthProvider } from '@/contexts/AuthContext';
import { Stack } from 'expo-router';
import { StatusBar } from 'react-native';
import Toast from 'react-native-toast-message';
import "./global.css";


export default function RootLayout() {

    return (
        <AuthProvider>
            <StatusBar barStyle="default" />
            <Stack
            >
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="(Auth)" options={{ headerShown: false }} />
                <Stack.Screen name="(Home)" options={{ headerShown: false }} />
            </Stack>
            <Toast config={toastConfig} />
        </AuthProvider>
    );
}


