const API_KEY = "mLP5T6M1CmHTKrw6rwURk769h1JCPBwCTDPhd3D7";

const getFormattedDate = (date: Date): string =>
  date.toISOString().split("T")[0]; // YYYY-MM-DD

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

export const getMatchesNext7Days = async (): Promise<any[]> => {
  const today = new Date();
  const results: any[] = [];

  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    const formatted = getFormattedDate(date);

    const url = `https://api.sportradar.com/soccer/trial/v4/en/schedules/${formatted}/schedules.json?api_key=${API_KEY}`;

    try {
      const res = await fetch(url);
      const data = await res.json();

      if (Array.isArray(data.schedules)) {
        const filtered = data.schedules.filter((match: any) => {
          const comp =
            match.sport_event?.sport_event_context?.competition?.name;
          const cat = match.sport_event?.sport_event_context?.category?.name;
          const matchStatus = match.sport_event_status?.status;

          const isTopLeague = topLeagues.some(
            (l) => l.name === comp && l.country === cat
          );

          const isFutureMatch =
            matchStatus === "not_started" || matchStatus === "scheduled";

          return isTopLeague && isFutureMatch;
        });

        results.push(
          ...filtered.map((match: any) => ({
            ...match.sport_event,
            scheduled: match.sport_event.start_time,
            competitors: match.sport_event.competitors,
            sport_event_context: match.sport_event.sport_event_context,
          }))
        );
      }
    } catch (err) {
      console.error("Fel för datum:", formatted, err);
    }
  }

  return results.sort(
    (a, b) =>
      new Date(a.scheduled ?? "").getTime() -
      new Date(b.scheduled ?? "").getTime()
  );
};
