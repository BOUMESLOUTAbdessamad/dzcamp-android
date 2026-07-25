import { Ionicons } from "@expo/vector-icons";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import EventCard from "../../components/EventCard";
import FilterChipRow from "../../components/FilterChipRow";
import SearchSkeleton from "../../components/SearchSkeleton";
import { Colors } from "../../constants/colors";
import { fetchEvents } from "../../lib/api";
import type { Event } from "../../types/database";

const DATE_OPTIONS = [
  { label: "Any time", value: "__any__" },
  { label: "Today", value: "today" },
  { label: "This Weekend", value: "weekend" },
  { label: "This Week", value: "week" },
  { label: "This Month", value: "month" },
];

const LOAD_DELAY_MS = 350;

function startOfDay(d: Date): Date {
  const r = new Date(d);
  r.setHours(0, 0, 0, 0);
  return r;
}

function endOfDay(d: Date): Date {
  const r = new Date(d);
  r.setHours(23, 59, 59, 999);
  return r;
}

function matchesDateFilter(iso: string, filter: string): boolean {
  if (filter === "__any__") return true;
  const startsAt = new Date(iso);
  const now = new Date();

  switch (filter) {
    case "today": {
      return startsAt >= startOfDay(now) && startsAt <= endOfDay(now);
    }
    case "weekend": {
      const day = now.getDay();
      if (day === 0 || day === 6) {
        return startsAt >= startOfDay(now) && startsAt <= endOfDay(now);
      }
      const daysUntilSat = (6 - day) % 7 || 7;
      const satStart = startOfDay(
        new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate() + daysUntilSat,
        ),
      );
      const sunEnd = endOfDay(
        new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate() + daysUntilSat + 1,
        ),
      );
      return startsAt >= satStart && startsAt <= sunEnd;
    }
    case "week": {
      const weekEnd = endOfDay(
        new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7),
      );
      return startsAt >= startOfDay(now) && startsAt <= weekEnd;
    }
    case "month": {
      const monthEnd = endOfDay(
        new Date(now.getFullYear(), now.getMonth(), now.getDate() + 30),
      );
      return startsAt >= startOfDay(now) && startsAt <= monthEnd;
    }
    default:
      return true;
  }
}

export default function SearchTab() {
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [selectedCity, setSelectedCity] = useState("__all__");
  const [selectedDate, setSelectedDate] = useState("__any__");
  const [searchLoading, setSearchLoading] = useState(false);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    fetchEvents().then((data) => {
      setAllEvents(data);
      setInitialLoading(false);
    });
  }, []);

  const cityOptions = useMemo(() => {
    const cities = Array.from(
      new Set(allEvents.map((e) => e.city).filter(Boolean)),
    ).sort();
    return [
      { label: "All", value: "__all__" },
      ...cities.map((c) => ({ label: c, value: c })),
    ];
  }, [allEvents]);

  const hasQuery = searchText.trim().length > 0;

  useEffect(() => {
    if (!hasQuery) {
      setSearchLoading(false);
      if (timerRef.current) clearTimeout(timerRef.current);
      return;
    }

    setSearchLoading(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setSearchLoading(false), LOAD_DELAY_MS);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [searchText, hasQuery]);

  const events = useMemo(() => {
    if (!hasQuery) return [];

    let result = allEvents;

    const q = searchText.trim().toLowerCase();
    result = result.filter(
      (e) =>
        e.title.toLowerCase().includes(q) ||
        e.city.toLowerCase().includes(q),
    );

    if (selectedCity !== "__all__") {
      result = result.filter((e) => e.city === selectedCity);
    }

    if (selectedDate !== "__any__") {
      result = result.filter((e) =>
        matchesDateFilter(e.startsAt, selectedDate),
      );
    }

    return result;
  }, [allEvents, searchText, selectedCity, selectedDate, hasQuery]);

  const clearAll = useCallback(() => {
    setSearchText("");
    setSelectedCity("__all__");
    setSelectedDate("__any__");
  }, []);

  if (initialLoading) {
    return (
      <SafeAreaView style={styles.safe} edges={["top"]}>
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <EventCard event={item} />}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.title}>Search Events</Text>

            <View style={styles.searchContainer}>
              <Ionicons
                name="search-outline"
                size={18}
                color={Colors.text}
                style={styles.searchIcon}
              />
              <TextInput
                style={styles.searchInput}
                placeholder="Search by title or city"
                placeholderTextColor="#999"
                value={searchText}
                onChangeText={setSearchText}
                autoCorrect={false}
                textContentType="none"
              />
              {searchText.length > 0 && (
                <Pressable
                  onPress={() => setSearchText("")}
                  style={styles.clearButton}
                >
                  <Ionicons name="close-circle" size={18} color="#999" />
                </Pressable>
              )}
            </View>

            {!hasQuery ? (
              <View style={styles.idleState}>
                <Ionicons name="search" size={56} color="#DDD" />
                <Text style={styles.idleTitle}>Search for events</Text>
                <Text style={styles.idleSubtitle}>
                  Find your next outdoor adventure
                </Text>
              </View>
            ) : (
              <>
                <Text style={styles.filterLabel}>City</Text>
                <FilterChipRow
                  options={cityOptions}
                  selectedValue={selectedCity}
                  onSelect={setSelectedCity}
                />

                <Text style={styles.filterLabel}>When</Text>
                <FilterChipRow
                  options={DATE_OPTIONS}
                  selectedValue={selectedDate}
                  onSelect={setSelectedDate}
                />

                {searchLoading ? (
                  <Text style={styles.count}>Searching...</Text>
                ) : (
                  <Text style={styles.count}>
                    {events.length} events found
                  </Text>
                )}
              </>
            )}
          </View>
        }
        ListFooterComponent={
          hasQuery && searchLoading ? (
            <SearchSkeleton />
          ) : hasQuery && !searchLoading && events.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons name="search" size={48} color="#CCC" />
              <Text style={styles.emptyTitle}>
                No events match your filters
              </Text>
              <Pressable onPress={clearAll}>
                <Text style={styles.clearFilters}>Clear filters</Text>
              </Pressable>
            </View>
          ) : null
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    paddingTop: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.text,
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 28,
    paddingHorizontal: 14,
    height: 48,
    backgroundColor: "#FFFFFF",
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: Colors.text,
    padding: 0,
  },
  clearButton: {
    marginLeft: 8,
  },
  filterLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: Colors.text,
    paddingHorizontal: 20,
    marginTop: 4,
    marginBottom: -2,
  },
  count: {
    fontSize: 13,
    color: Colors.text,
    opacity: 0.5,
    paddingHorizontal: 20,
    marginTop: 8,
    marginBottom: 12,
  },
  listContent: {
    paddingBottom: 24,
  },
  idleState: {
    alignItems: "center",
    paddingTop: 80,
    paddingBottom: 48,
    paddingHorizontal: 20,
  },
  idleTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.text,
    marginTop: 16,
    marginBottom: 6,
  },
  idleSubtitle: {
    fontSize: 14,
    color: Colors.text,
    opacity: 0.5,
  },
  emptyState: {
    alignItems: "center",
    paddingTop: 64,
    paddingBottom: 48,
    paddingHorizontal: 20,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text,
    marginTop: 16,
    marginBottom: 12,
    textAlign: "center",
  },
  clearFilters: {
    fontSize: 15,
    fontWeight: "600",
    color: Colors.primary,
  },
});
