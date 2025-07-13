import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { odds } from "@/api/liveMatches";
import { ScheduleItem } from "@/types/matches";

const LiveOdds = () => {
  const [matches, setMatches] = useState<ScheduleItem[]>([]);
  const [loading, setLoading] = useState(true);

  const topLeagues = [
    { name: "Premier League", country: "England" },
    { name: "UEFA Champions League", country: "International Clubs" },
    { name: "Allsvenskan", country: "Sweden" },
    { name: "LaLiga", country: "Spain" },
    { name: "Bundesliga", country: "Germany" },
    { name: "Serie A", country: "Italy" },
    { name: "Ligue 1", country: "France" },
    { name: "Europa League", country: "International Clubs" },
    { name: "Superettan", country: "Sweden" },
  ];

  const filteredMatches = matches.filter((item) => {
    const comp = item.sport_event.sport_event_context.competition.name;
    const country = item.sport_event.sport_event_context.category.name;
    return topLeagues.some((l) => l.name === comp && l.country === country);
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await odds();
        setMatches(data);
      } catch (err) {
        console.error("Error fetching user:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);
  return (
    <View>
      {filteredMatches.length === 0 ? (
        <Text>Inga matcher i utvalda ligor just nu.</Text>
      ) : (
        filteredMatches.map((item) => {
          const competitors = item.sport_event.competitors;
          const home =
            competitors.find((c) => c.qualifier === "home")?.name ?? "Hemmalag";
          const away =
            competitors.find((c) => c.qualifier === "away")?.name ?? "Bortalag";
          const score = item.sport_event_status;
          const league = item.sport_event.sport_event_context.competition.name;

          return (
            <View key={item.sport_event.id} style={{ marginBottom: 12 }}>
              <Text style={{ fontWeight: "bold" }}>
                {home} vs {away}
              </Text>
              <Text>
                Ställning: {score.home_score} - {score.away_score}
              </Text>
              <Text style={{ color: "gray", fontSize: 12 }}>{league}</Text>
            </View>
          );
        })
      )}
    </View>
  );
};

export default LiveOdds;
