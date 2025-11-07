import { Appearance, ColorSchemeName, Platform } from "react-native";

export function patchAppearanceForWeb() {
    if (Platform.OS !== "web") return;

    const initTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";

    const html = document.documentElement;
    if (!html.classList.contains("dark") && initTheme === "dark") {
        html.classList.add("dark");
    }

    Appearance.setColorScheme = (scheme: ColorSchemeName) => {
        if (!scheme) return;
        if (scheme === "dark") {
            html.classList.add("dark");
        } else {
            html.classList.remove("dark");
        }
    };

    Appearance.getColorScheme = (): ColorSchemeName => {
        return html.classList.contains("dark") ? "dark" : "light";
    };

    Appearance.addChangeListener = (
        listener: ({ colorScheme }: { colorScheme: ColorSchemeName }) => void
    ) => {
        const observer = new MutationObserver(() => {
            listener({ colorScheme: Appearance.getColorScheme() });
        });
        observer.observe(html, { attributes: true, attributeFilter: ["class"] });
        return { remove: () => observer.disconnect() };
    };
}
