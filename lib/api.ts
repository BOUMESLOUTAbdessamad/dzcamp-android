import type { SupabaseClient } from "@supabase/supabase-js";
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

/** Check whether the user has saved a specific event. */
export async function isEventSaved(
  client: SupabaseClient,
  userId: string,
  eventId: string,
): Promise<boolean> {
  const { data, error } = await client
    .from("saved_events")
    .select("event_id")
    .eq("user_id", userId)
    .eq("event_id", eventId)
    .maybeSingle();

  if (error) {
    console.error("Failed to check saved status:", error.message);
    return false;
  }
  return data !== null;
}

/** Save or unsave an event. Returns the new saved state. */
export async function toggleSaveEvent(
  client: SupabaseClient,
  userId: string,
  eventId: string,
  currentlySaved: boolean,
): Promise<boolean> {
  if (currentlySaved) {
    const { error } = await client
      .from("saved_events")
      .delete()
      .eq("user_id", userId)
      .eq("event_id", eventId);

    if (error) {
      console.error("Failed to unsave event:", error.message);
      return true;
    }
    return false;
  }

  const { error } = await client
    .from("saved_events")
    .insert({ user_id: userId, event_id: eventId });

  if (error) {
    console.error("Failed to save event:", error.message);
    return false;
  }
  return true;
}

/** Fetch all saved events for a user, with full event data joined. */
export async function fetchSavedEvents(
  client: SupabaseClient,
): Promise<Event[]> {
  const { data, error } = await client
    .from("saved_events")
    .select("event_id, events(*)")
    .order("saved_at", { ascending: false });

  if (error) {
    console.error("Failed to fetch saved events:", error.message);
    return [];
  }

  return data
    .map((row: { events: any }) => row.events)
    .filter(Boolean)
    .map(rowToEvent);
}
