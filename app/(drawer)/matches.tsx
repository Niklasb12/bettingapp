import { View, Text } from "react-native";
import LiveOdds from "@/components/LiveMatches";
import UpcomingMatches from "@/components/UpComingMatches";

export default function matches() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Välkommen till Matches 🎉</Text>
      <Text>LIVE</Text>
      <LiveOdds />
      <Text>Kommande matcher</Text>
      <UpcomingMatches />
    </View>
  );
}
