import { Ionicons } from "@expo/vector-icons";
import { FlatList, StyleSheet, View } from "react-native";
import { Surface, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import CategoryShortcuts from "../../components/home/CategoryShortcuts";
import EventCard from "../../components/home/EventCard";
import FeaturedBanner from "../../components/home/FeaturedBanner";
import Header from "../../components/home/Header";
import SearchBar from "../../components/home/SearchBar";
import { Colors } from "../../constants/colors";
import { MOCK_EVENTS } from "../../mocks/events";

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
  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <FlatList
        data={MOCK_EVENTS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <EventCard event={item} />}
        ListHeaderComponent={
          <View>
            <Header />
            <SearchBar />
            <FeaturedBanner />
            {/* <LocationPromptCard /> */}
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
