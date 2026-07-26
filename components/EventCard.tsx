import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { Card, Chip, Text } from 'react-native-paper';
import { Colors } from '../constants/colors';
import type { Event } from '../types/database';

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

interface Props {
  event: Event;
  onUnsave?: () => void;
}

export default function EventCard({ event, onUnsave }: Props) {
  const router = useRouter();
  const { day, month } = formatBadgeDate(event.startsAt);

  return (
    <Card
      style={styles.card}
      mode="contained"
      onPress={() => router.push(`/event/${event.id}`)}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: event.imageUrl }} style={styles.image} />
        <View style={styles.dateBadge}>
          <Text variant="titleMedium" style={styles.dateDay}>
            {day}
          </Text>
          <Text variant="labelSmall" style={styles.dateMonth}>
            {month}
          </Text>
        </View>
        <Chip
          compact
          style={styles.categoryBadge}
          textStyle={styles.categoryText}
        >
          {categoryLabel(event.category)}
        </Chip>
        {onUnsave && (
          <Pressable style={styles.unsaveButton} onPress={onUnsave}>
            <Ionicons name="bookmark" size={18} color={Colors.primary} />
          </Pressable>
        )}
      </View>

      <Card.Content style={styles.info}>
        <Text variant="titleMedium" style={styles.title} numberOfLines={1}>
          {event.title}
        </Text>
        <View style={styles.locationRow}>
          <Ionicons
            name="location-outline"
            size={14}
            color={Colors.text}
            style={{ opacity: 0.5 }}
          />
          <Text variant="bodySmall" style={styles.location} numberOfLines={1}>
            {event.location}
          </Text>
        </View>
        <Text
          variant="bodySmall"
          style={[styles.spots, event.spotsLeft <= 5 && styles.spotsLow]}
        >
          {event.spotsLeft} spots left
        </Text>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: Colors.background,
    elevation: 0,
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
    fontWeight: '700',
    color: Colors.text,
    lineHeight: 18,
  },
  dateMonth: {
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
    height: 28,
  },
  categoryText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '600',
  },
  unsaveButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
  info: {
    padding: 14,
  },
  title: {
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
    color: Colors.text,
    opacity: 0.6,
  },
  spots: {
    fontWeight: '600',
    color: Colors.primary,
  },
  spotsLow: {
    color: '#D32F2F',
  },
});
