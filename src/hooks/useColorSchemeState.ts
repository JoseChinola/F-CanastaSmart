import { useEffect, useState } from "react";
import { Appearance, ColorSchemeName } from "react-native";

export function useColorSchemeState() {
    const valueInitials = Appearance.getColorScheme() ?? "light"
    const [currentScheme, setCurrentScheme] = useState<ColorSchemeName>(valueInitials);

    useEffect(() => {
        const subscription = Appearance.addChangeListener(({ colorScheme }) => {
            setCurrentScheme(colorScheme ?? "light");
        });
        return () => subscription.remove();
    }, []);

    const toggleColorScheme = () => {
        const newScheme: ColorSchemeName = currentScheme === "light" ? "dark" : "light";
        Appearance.setColorScheme(newScheme);
        setCurrentScheme(newScheme);
    };

    return { currentScheme, toggleColorScheme };
}
