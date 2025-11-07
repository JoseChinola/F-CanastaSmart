import { Appearance, ColorSchemeName, Platform } from "react-native";

export function patchAppearanceForWeb() {
    if (Platform.OS !== "web") return;
    
    const initTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";


        
    if (!document.documentElement.getAttribute("data-theme")) {
        document.documentElement.setAttribute("data-theme", initTheme);
    }

    Appearance.setColorScheme = (scheme: ColorSchemeName) => {
        if (!scheme) return;
        document.documentElement.setAttribute("data-theme", scheme);
    };

    Appearance.getColorScheme = (): ColorSchemeName => {
        const systemValue = window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light";
        const userValue = document.documentElement.getAttribute("data-theme");
        return userValue && userValue !== "null" ? (userValue as ColorSchemeName) : systemValue;
    };

    Appearance.addChangeListener = (
        listener: ({ colorScheme }: { colorScheme: ColorSchemeName }) => void
    ) => {
        const systemQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const systemListener = (e: MediaQueryListEvent) => {
            const newSystem = e.matches ? "dark" : "light";
            const userValue = document.documentElement.getAttribute("data-theme");
            listener({ colorScheme: userValue && userValue !== "null" ? (userValue as ColorSchemeName) : newSystem });
        };
        systemQuery.addEventListener("change", systemListener);

        const observer = new MutationObserver(() => {
            listener({ colorScheme: Appearance.getColorScheme() });
        });
        observer.observe(document.documentElement, { attributes: true });

        return {
            remove: () => {
                systemQuery.removeEventListener("change", systemListener);
                observer.disconnect();
            },
        };
    };
}
