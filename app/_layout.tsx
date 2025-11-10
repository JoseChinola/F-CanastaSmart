import { toastConfig } from '@/components/custom/CustomToastConfig';
import SafeScreen from '@/components/SafeScreen';
import { AuthProvider } from '@/contexts/AuthContext';
import { patchAppearanceForWeb } from "@/hooks/patchAppearanceForWeb";
import { Slot } from 'expo-router';
import { useEffect } from 'react';
import { StatusBar } from 'react-native';
import Toast from 'react-native-toast-message';
import "../global.css";


export default function RootLayout() {

    useEffect(() => {
        patchAppearanceForWeb();
    }, []);

    return (
        <AuthProvider>
            <StatusBar barStyle="default" />
            <SafeScreen>
                <Slot />
            </SafeScreen>
            <Toast config={toastConfig} />
        </AuthProvider>
    );
}


