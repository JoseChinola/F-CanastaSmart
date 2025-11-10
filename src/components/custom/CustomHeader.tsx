import { Text, View } from "react-native";

export default function CustomHeader({ title }: { title: string }) {
    return (
        <View style={{ height: 80, backgroundColor: "#1E40AF", justifyContent: "center", paddingHorizontal: 16 }}>
            <Text style={{ color: "white", fontSize: 22, fontWeight: "bold" }}>{title}</Text>
        </View>
    );
}
