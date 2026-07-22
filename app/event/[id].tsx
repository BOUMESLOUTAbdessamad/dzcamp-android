import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";
import { useLocalSearchParams } from "expo-router";
import DetailHeader from "../../components/event/DetailHeader";
import EventDescription from "../../components/event/EventDescription";
import DetailsGrid from "../../components/event/DetailsGrid";
import RegisterFooter from "../../components/event/RegisterFooter";
import { Colors } from "../../constants/colors";
import { fetchEventById } from "../../lib/api";
import type { Event } from "../../types/database";

function formatBadgeDate(iso: string): { day: string; month: string } {
  const d = new Date(iso);
  return {
    day: d.toLocaleDateString("en-US", { day: "numeric" }),
    month: d.toLocaleDateString("en-US", { month: "short" }),
  };
}

export default function EventDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!id) return;
    fetchEventById(id).then((data) => {
      setEvent(data);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (!event) {
    return (
      <View style={styles.centered}>
        <Text variant="bodyLarge">Event not found</Text>
      </View>
    );
  }

  const { day, month } = formatBadgeDate(event.startsAt);

  return (
    <View style={styles.screen}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <DetailHeader
          event={event}
          saved={saved}
          onToggleSave={() => setSaved((p) => !p)}
        />

        <View style={styles.body}>
          <View style={styles.titleRow}>
            <Text variant="headlineSmall" style={styles.title} numberOfLines={2}>
              {event.title}
            </Text>
            <View style={styles.dateBadge}>
              <Text variant="titleMedium" style={styles.dateDay}>
                {day}
              </Text>
              <Text variant="labelSmall" style={styles.dateMonth}>
                {month}
              </Text>
            </View>
          </View>

          <View style={styles.locationRow}>
            <Text variant="bodyMedium" style={styles.location}>
              {event.location}
            </Text>
          </View>

          <EventDescription text={event.description} />
          <DetailsGrid event={event} />
        </View>
      </ScrollView>

      <RegisterFooter event={event} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 8,
  },
  body: {
    paddingTop: 20,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: 20,
    gap: 12,
  },
  title: {
    flex: 1,
    fontWeight: "700",
    color: Colors.text,
  },
  dateBadge: {
    backgroundColor: "#F0F0F0",
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 10,
    alignItems: "center",
    minWidth: 48,
  },
  dateDay: {
    fontWeight: "700",
    color: Colors.text,
    lineHeight: 20,
  },
  dateMonth: {
    fontWeight: "500",
    color: Colors.text,
    textTransform: "uppercase",
    lineHeight: 14,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 20,
    marginTop: 6,
  },
  location: {
    color: Colors.text,
    opacity: 0.6,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
