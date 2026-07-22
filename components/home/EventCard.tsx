import { Ionicons } from '@expo/vector-icons';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../constants/colors';
import type { Event } from '../../mocks/events';

function formatBadgeDate(iso: string): { day: string; month: string } {
  const d = new Date(iso);
  return {
    day: d.toLocaleDateString('en-US', { day: 'numeric' }),
    month: d.toLocaleDateString('en-US', { month: 'short' }),
  };
}

function categoryLabel(c: Event['category']): string {
  return c === 'hiking' ? 'Hiking' : 'Camping';
}

export default function EventCard({ event }: { event: Event }) {
  const { day, month } = formatBadgeDate(event.startsAt);

  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: event.imageUrl }} style={styles.image} />
        <View style={styles.dateBadge}>
          <Text style={styles.dateDay}>{day}</Text>
          <Text style={styles.dateMonth}>{month}</Text>
        </View>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{categoryLabel(event.category)}</Text>
        </View>
      </View>

      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>{event.title}</Text>
        <View style={styles.locationRow}>
          <Ionicons name="location-outline" size={14} color={Colors.text} style={{ opacity: 0.5 }} />
          <Text style={styles.location} numberOfLines={1}>{event.location}</Text>
        </View>
        <Text style={[
          styles.spots,
          event.spotsLeft <= 5 && styles.spotsLow,
        ]}>
          {event.spotsLeft} spots left
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 20,
    marginBottom: 16,
    backgroundColor: Colors.background,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  imageContainer: {
    height: 160,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  dateBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingVertical: 4,
    paddingHorizontal: 8,
    alignItems: 'center',
    minWidth: 40,
  },
  dateDay: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text,
    lineHeight: 18,
  },
  dateMonth: {
    fontSize: 10,
    fontWeight: '500',
    color: Colors.text,
    textTransform: 'uppercase',
    lineHeight: 13,
  },
  categoryBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: Colors.primary,
    borderRadius: 10,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  categoryText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '600',
  },
  info: {
    padding: 14,
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 4,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 6,
  },
  location: {
    fontSize: 13,
    color: Colors.text,
    opacity: 0.6,
  },
  spots: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.primary,
  },
  spotsLow: {
    color: '#D32F2F',
  },
});
