import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../constants/colors';

export default function SearchBar() {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.8}
      onPress={() => navigation.navigate('search' as never)}
    >
      <Ionicons name="search-outline" size={20} color={Colors.text} style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder="Search events"
        placeholderTextColor="#999"
        editable={false}
        pointerEvents="none"
      />
      <TouchableOpacity style={styles.filterButton} activeOpacity={0.6}>
        <Ionicons name="options-outline" size={20} color={Colors.primary} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 12,
    marginBottom: 8,
    backgroundColor: Colors.background,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    paddingHorizontal: 16,
    height: 48,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: Colors.text,
  },
  filterButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
