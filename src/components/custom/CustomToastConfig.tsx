import colors from "@/constants/theme/colors";
import useColorScheme from "@/hooks/use-color-scheme";
import React from "react";
import { BaseToast, ErrorToast } from "react-native-toast-message";

const SuccessToast = (props: any) => {
    const colorScheme = useColorScheme();
    const theme = colorScheme === "dark" ? colors.dark : colors.light;

    return (
        <BaseToast
            {...props}
            style={{
                borderLeftColor: theme.success,
                backgroundColor: theme.card,
            }}
            contentContainerStyle={{ paddingHorizontal: 15 }}
            text1Style={{
                color: theme.text,
                fontSize: 16,
                fontWeight: "600",
            }}
            text2Style={{
                color: theme.text,
                fontSize: 14,
            }}
        />
    );
};

const ErrorToastStyled = (props: any) => {
    const colorScheme = useColorScheme();
    const theme = colorScheme === "dark" ? colors.dark : colors.light;

    return (
        <ErrorToast
            {...props}
            style={{
                borderLeftColor: theme.error,
                backgroundColor: theme.card,
            }}
            contentContainerStyle={{ paddingHorizontal: 15 }}
            text1Style={{
                color: theme.text,
                fontSize: 16,
                fontWeight: "600",
            }}
            text2Style={{
                color: theme.text,
                fontSize: 14,
            }}
        />
    );
};

export const toastConfig = {
    success: (props: any) => <SuccessToast {...props} />,
    error: (props: any) => <ErrorToastStyled {...props} />,
};
