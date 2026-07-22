import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';
import { Surface, Text } from 'react-native-paper';
import { Colors } from '../../constants/colors';
import type { Event } from '../../types/database';

interface DetailItem {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
}

function buildDetails(event: Event): DetailItem[] {
  if (event.category === 'hiking') {
    return [
      { icon: 'walk-outline', label: 'Distance', value: `${event.distanceKm} km` },
      { icon: 'speedometer-outline', label: 'Difficulty', value: event.difficulty ?? '—' },
      { icon: 'time-outline', label: 'Duration', value: event.durationLabel ?? '—' },
      { icon: 'trending-up-outline', label: 'Elevation Gain', value: `${event.elevationGainM} m` },
    ];
  }
  return [
    { icon: 'calendar-outline', label: 'Duration', value: event.durationLabel ?? '—' },
    { icon: 'speedometer-outline', label: 'Difficulty', value: event.difficulty ?? '—' },
    { icon: 'restaurant-outline', label: 'Meals Provided', value: event.mealsProvided ? 'Yes' : 'No' },
    { icon: 'home-outline', label: 'Facilities', value: event.facilities ?? '—' },
  ];
}

export default function DetailsGrid({ event }: { event: Event }) {
  const details = buildDetails(event);
  const heading = event.category === 'hiking' ? 'Hike Details' : 'Camp Details';

  return (
    <View style={styles.container}>
      <Text variant="titleMedium" style={styles.heading}>
        {heading}
      </Text>
      <View style={styles.grid}>
        {details.map((d) => (
          <Surface key={d.label} style={styles.card} elevation={0}>
            <Ionicons name={d.icon} size={20} color={Colors.primary} />
            <Text variant="labelSmall" style={styles.label}>
              {d.label}
            </Text>
            <Text variant="bodyMedium" style={styles.value}>
              {d.value}
            </Text>
          </Surface>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  heading: {
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 12,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  card: {
    width: '47%',
    backgroundColor: '#F5F5F5',
    borderRadius: 14,
    padding: 14,
  },
  label: {
    color: Colors.text,
    opacity: 0.5,
    marginTop: 8,
    marginBottom: 2,
  },
  value: {
    fontWeight: '700',
    color: Colors.text,
  },
});
