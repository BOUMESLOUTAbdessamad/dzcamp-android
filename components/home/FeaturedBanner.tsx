import { Ionicons } from '@expo/vector-icons';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../constants/colors';
import { MOCK_EVENTS } from '../../mocks/events';

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

const featured = MOCK_EVENTS[0];

export default function FeaturedBanner() {
  return (
    <View style={styles.container}>
      <Image source={{ uri: featured.imageUrl }} style={styles.image} />
      <View style={styles.scrim} />
      <View style={styles.overlay}>
        <View style={styles.badge}>
          <Ionicons name="flame-outline" size={14} color="#FFF" />
          <Text style={styles.badgeText}>Featured</Text>
        </View>
        <Text style={styles.title}>{featured.title}</Text>
        <Text style={styles.date}>{formatDate(featured.startsAt)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 12,
    borderRadius: 16,
    overflow: 'hidden',
    height: 200,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  scrim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.secondary,
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 8,
    gap: 4,
  },
  badgeText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
  },
  date: {
    color: '#FFFFFF',
    fontSize: 13,
    opacity: 0.85,
    marginTop: 2,
  },
});
