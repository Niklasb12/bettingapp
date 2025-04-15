import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import { getMatchesNext7Days } from "@/api/getMatchesNext7Days";

const Next7Days = () => {
  const [matches, setMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMatchesNext7Days()
      .then(setMatches)
      .finally(() => setLoading(false));
  }, []);

  return (
    <ScrollView style={{ padding: 16 }}>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : matches.length === 0 ? (
        <Text>Inga matcher de kommande 7 dagarna.</Text>
      ) : (
        matches.map((match) => {
          const home =
            match.competitors?.find((c: any) => c.qualifier === "home")?.name ??
            "Hemmalag";
          const away =
            match.competitors?.find((c: any) => c.qualifier === "away")?.name ??
            "Bortalag";
          const time = new Date(match.scheduled).toLocaleString("sv-SE", {
            weekday: "short",
            hour: "2-digit",
            minute: "2-digit",
            day: "2-digit",
            month: "2-digit",
          });
          const league = match.sport_event_context?.competition?.name;

          return (
            <View key={match.id} style={{ marginBottom: 16 }}>
              <Text style={{ fontWeight: "bold" }}>
                {home} vs {away}
              </Text>
              <Text style={{ color: "gray" }}>{time}</Text>
              <Text style={{ color: "gray" }}>{league}</Text>
            </View>
          );
        })
      )}
    </ScrollView>
  );
};

export default Next7Days;
