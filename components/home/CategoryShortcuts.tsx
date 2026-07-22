import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';
import { Surface, Text } from 'react-native-paper';
import { Colors } from '../../constants/colors';

interface CategoryItem {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
}

const CATEGORIES: CategoryItem[] = [
  { label: 'Hiking', icon: 'walk-outline' },
  { label: 'Camping', icon: 'compass-outline' },
  { label: 'Family', icon: 'people-outline' },
  { label: 'Only-Girls', icon: 'female-outline' },
];

export default function CategoryShortcuts() {
  return (
    <View style={styles.container}>
      {CATEGORIES.map((cat) => (
        <View key={cat.label} style={styles.item}>
          <Surface style={styles.circle} elevation={0}>
            <Ionicons name={cat.icon} size={22} color={Colors.primary} />
          </Surface>
          <Text variant="labelSmall" style={styles.label}>
            {cat.label}
          </Text>
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
    fontWeight: '500',
    color: Colors.text,
    textAlign: 'center',
  },
});
