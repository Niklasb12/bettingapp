import { View, Text } from "react-native";
import ProfileInfo from "@/components/ProfileInfo";

export default function ProfileScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Välkommen till Profile 🎉</Text>
      <ProfileInfo />
    </View>
  );
}
