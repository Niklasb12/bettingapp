export const odds = async (): Promise<any[]> => {
  const API_KEY = "mLP5T6M1CmHTKrw6rwURk769h1JCPBwCTDPhd3D7";
  const res = await fetch(
    `https://api.sportradar.com/soccer/trial/v4/en/schedules/live/schedules.json?api_key=${API_KEY}`
  );
  if (!res.ok) throw new Error("API error");
  const data = await res.json();
  return data.schedules ?? [];
};
