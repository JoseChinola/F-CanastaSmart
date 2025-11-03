import colors from "@/constants/theme/colors";
import useAppFonts from "@/constants/theme/fonts";
import { patchAppearanceForWeb } from "@/hooks/patchAppearanceForWeb";
import useColorScheme from "@/hooks/use-color-scheme";
import { useColorSchemeState } from "@/hooks/useColorSchemeState";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, Image, View } from "react-native";

export default function Index() {
    const { user, loading } = useUser();
    const { currentScheme } = useColorSchemeState();
    const fontsLoaded = useAppFonts();
    const colorScheme = useColorScheme();
    const theme = colorScheme === "dark" ? colors.dark : colors.light;
    const router = useRouter();

    useEffect(() => {
        patchAppearanceForWeb();
    }, []);

    // Redirigir automáticamente si ya hay un usuario logueado
    useEffect(() => {
        if (!loading && fontsLoaded) {
            if (user) {
                router.replace("/(Home)/(tabs)"); // redirige a home
            } else {
                router.replace("/login"); // si no hay usuario, a login
            }
        }
    }, [user, loading, fontsLoaded, router]);

    // 👇 pantalla de carga mientras carga fonts o user
    if (!currentScheme || loading || !fontsLoaded) {
        return (
            <View className="flex-1 justify-center items-center bg-white dark:bg-black">
                <Image
                    source={{
                        uri: "https://png.pngtree.com/png-clipart/20190611/original/pngtree-wolf-logo-png-image_2306634.jpg",
                    }}
                    style={{ width: 150, height: 150, marginBottom: 20 }}
                />
                <ActivityIndicator size="large" color={theme.primary} />
            </View>
        );
    }

    return <View />; // nunca se verá si hay redirección
}
