import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../constants/colors';
import { currentUser } from '../../mocks/events';

export default function Header() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.greeting}>Hello, {currentUser.name}</Text>
        <Text style={styles.subtitle}>Find your next adventure</Text>
      </View>
      <TouchableOpacity
        style={styles.avatar}
        onPress={() => navigation.navigate('profile' as never)}
        activeOpacity={0.7}
      >
        <Ionicons name="person" size={20} color={Colors.primary} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  greeting: {
    fontSize: 26,
    fontWeight: '700',
    color: Colors.text,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.text,
    opacity: 0.6,
    marginTop: 2,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
