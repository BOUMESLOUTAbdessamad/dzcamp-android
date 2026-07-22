import { Ionicons } from '@expo/vector-icons';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/colors';
import { MOCK_EVENTS, type Event } from '../../mocks/events';
import Header from '../../components/home/Header';
import SearchBar from '../../components/home/SearchBar';
import FeaturedBanner from '../../components/home/FeaturedBanner';
import LocationPromptCard from '../../components/home/LocationPromptCard';
import CategoryShortcuts from '../../components/home/CategoryShortcuts';
import EventCard from '../../components/home/EventCard';

function SectionHeader() {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>Upcoming Events</Text>
      <View style={styles.mapPill}>
        <Ionicons name="map-outline" size={16} color={Colors.primary} />
        <Text style={styles.mapPillText}>Map</Text>
      </View>
    </View>
  );
}

export default function HomeTab() {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <FlatList
        data={MOCK_EVENTS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <EventCard event={item} />}
        ListHeaderComponent={
          <View>
            <Header />
            <SearchBar />
            <FeaturedBanner />
            <LocationPromptCard />
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 24,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text,
  },
  mapPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 4,
  },
  mapPillText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.primary,
  },
});
