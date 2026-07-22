import { rowToEvent, type Event } from "../types/database";
import { supabase } from "./supabase";

/** Fetch all upcoming events, ordered by start date. */
export async function fetchEvents(): Promise<Event[]> {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .order("starts_at", { ascending: true });

  if (error) {
    console.error("Failed to fetch events:", error.message);
    return [];
  }

  return data.map(rowToEvent);
}

/** Fetch a single event by id. Returns null if not found. */
export async function fetchEventById(id: string): Promise<Event | null> {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Failed to fetch event:", error.message);
    return null;
  }
  return rowToEvent(data);
}
