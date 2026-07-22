import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import { Surface, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import CategoryShortcuts from "../../components/home/CategoryShortcuts";
import EventCard from "../../components/home/EventCard";
import FeaturedBanner from "../../components/home/FeaturedBanner";
import Header from "../../components/home/Header";
import SearchBar from "../../components/home/SearchBar";
import { Colors } from "../../constants/colors";
import { fetchEvents } from "../../lib/api";
import type { Event } from "../../types/database";

function SectionHeader() {
  return (
    <View style={styles.sectionHeader}>
      <Text variant="titleLarge" style={styles.sectionTitle}>
        Upcoming Events
      </Text>
      <Surface style={styles.mapPill} elevation={0}>
        <Ionicons name="map-outline" size={16} color={Colors.primary} />
        <Text variant="labelMedium" style={styles.mapPillText}>
          Map
        </Text>
      </Surface>
    </View>
  );
}

export default function HomeTab() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents().then((data) => {
      setEvents(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.safe} edges={["top"]}>
        <View style={styles.loadingContainer}>
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
          <View>
            <Header />
            <SearchBar />
            <FeaturedBanner events={events} />
            <CategoryShortcuts />
            <SectionHeader />
          </View>
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  listContent: {
    paddingBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 24,
    marginBottom: 12,
  },
  sectionTitle: {
    fontWeight: "700",
    color: Colors.text,
  },
  mapPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E8F5E9",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 4,
  },
  mapPillText: {
    fontWeight: "600",
    color: Colors.primary,
  },
});
