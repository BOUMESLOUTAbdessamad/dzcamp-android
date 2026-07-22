import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../constants/colors';

interface CategoryItem {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
}

const CATEGORIES: CategoryItem[] = [
  { label: 'Hiking', icon: 'walk-outline' },
  { label: 'Camping', icon: 'bonfire-outline' },
  { label: 'Family', icon: 'people-outline' },
  { label: 'Multi-Day', icon: 'calendar-outline' },
];

export default function CategoryShortcuts() {
  return (
    <View style={styles.container}>
      {CATEGORIES.map((cat) => (
        <View key={cat.label} style={styles.item}>
          <View style={styles.circle}>
            <Ionicons name={cat.icon} size={22} color={Colors.primary} />
          </View>
          <Text style={styles.label}>{cat.label}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  item: {
    alignItems: 'center',
    width: 72,
  },
  circle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.text,
    textAlign: 'center',
  },
});
