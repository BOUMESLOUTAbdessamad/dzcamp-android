import { useNavigation } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { Colors } from '../../constants/colors';

export default function SearchBar() {
  const navigation = useNavigation();

  return (
    <Searchbar
      placeholder="Search events"
      value=""
      onPress={() => navigation.navigate('search' as never)}
      editable={false}
      style={styles.bar}
      inputStyle={styles.input}
      icon="magnify"
      iconColor={Colors.text}
      traileringIcon="tune-variant"
      traileringIconColor={Colors.primary}
      theme={{ colors: { onSurfaceVariant: '#999' } }}
    />
  );
}

const styles = StyleSheet.create({
  bar: {
    marginHorizontal: 20,
    marginTop: 12,
    marginBottom: 8,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    elevation: 0,
    backgroundColor: Colors.background,
    height: 48,
  },
  input: {
    fontSize: 15,
    color: Colors.text,
    minHeight: 48,
  },
});
