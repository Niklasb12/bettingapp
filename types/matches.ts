// types/Schedule.ts

export type Competitor = {
  id: string;
  name: string;
  qualifier: "home" | "away";
};

export type SportEvent = {
  id: string;
  competitors: Competitor[];
  start_time: string;
  sport_event_context: {
    competition: {
      name: string;
    };
    category: {
      name: string;
      country_code: string;
    };
  };
};

export type SportEventStatus = {
  home_score: number;
  away_score: number;
  status: string;
};

export type ScheduleItem = {
  sport_event: SportEvent;
  sport_event_status: SportEventStatus;
};
