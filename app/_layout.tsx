import { toastConfig } from '@/components/custom/CustomToastConfig';
import { AuthProvider } from '@/contexts/AuthContext';
import { Slot } from 'expo-router';
import { StatusBar } from 'react-native';
import Toast from 'react-native-toast-message';
import "../global.css";


export default function RootLayout() {

    // useEffect(() => {
    //     patchAppearanceForWeb();
    // }, []);

    return (
        <AuthProvider>
            <StatusBar barStyle="default" />
            {/* <SafeAreaView className='flex-1 dark:bg-gray-900 bg-gray-50'>
            </SafeAreaView> */}
            <Slot />
            <Toast config={toastConfig} />
        </AuthProvider>
    );
}


