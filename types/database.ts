export type EventCategory = "hiking" | "camping";
export type Difficulty = "Easy" | "Moderate" | "Hard";

/** Row shape returned by Supabase (snake_case columns). */
export interface EventRow {
  id: string;
  title: string;
  category: EventCategory;
  location: string;
  starts_at: string;
  max_attendees: number;
  spots_left: number;
  image_url: string;
  description: string;
  difficulty: Difficulty | null;
  duration_label: string | null;
  distance_km: number | null;
  elevation_gain_m: number | null;
  meals_provided: boolean | null;
  facilities: string | null;
  created_at: string;
}

/** App-level event shape (camelCase) consumed by UI components. */
export interface Event {
  id: string;
  title: string;
  category: EventCategory;
  location: string;
  startsAt: string;
  maxAttendees: number;
  spotsLeft: number;
  imageUrl: string;
  description: string;
  difficulty?: Difficulty;
  durationLabel?: string;
  distanceKm?: number;
  elevationGainM?: number;
  mealsProvided?: boolean;
  facilities?: string;
}

/** Map a raw Supabase row to the app-level Event type. */
export function rowToEvent(row: EventRow): Event {
  return {
    id: row.id,
    title: row.title,
    category: row.category,
    location: row.location,
    startsAt: row.starts_at,
    maxAttendees: row.max_attendees,
    spotsLeft: row.spots_left,
    imageUrl: row.image_url,
    description: row.description,
    difficulty: row.difficulty ?? undefined,
    durationLabel: row.duration_label ?? undefined,
    distanceKm: row.distance_km ?? undefined,
    elevationGainM: row.elevation_gain_m ?? undefined,
    mealsProvided: row.meals_provided ?? undefined,
    facilities: row.facilities ?? undefined,
  };
}
