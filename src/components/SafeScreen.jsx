import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";


const SafeScreen = ({ children }) => {
    const insets = useSafeAreaInsets();

    return (
        <View className="bg-gray-50 dark:bg-gray-900"
            style={{ paddingTop: insets.top, flex: 1 }}
        >
            {children}
        </View>
    );
};
export default SafeScreen;