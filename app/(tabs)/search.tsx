import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../constants/colors';

export default function SearchTab() {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Search</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  label: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.text,
  },
});
