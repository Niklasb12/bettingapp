import { View, Text, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();

  const onLogOut = async () => {
    // Ta bort token från AsyncStorage
    await AsyncStorage.removeItem("token");
    // Navigera tillbaka till inloggningssidan
    router.replace("/login");
  };
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Välkommen till appen 🎉</Text>
      <TouchableOpacity onPress={onLogOut}>
        <Text>Logga ut</Text>
      </TouchableOpacity>
    </View>
  );
}
