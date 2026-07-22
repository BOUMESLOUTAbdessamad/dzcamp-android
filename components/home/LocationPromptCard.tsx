import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';
import { Button, Surface, Text } from 'react-native-paper';
import { Colors } from '../../constants/colors';

export default function LocationPromptCard() {
  return (
    <Surface style={styles.container} elevation={0}>
      <View style={styles.iconCircle}>
        <Ionicons name="location-outline" size={22} color={Colors.primary} />
      </View>
      <Text variant="bodyMedium" style={styles.text}>
        Discover hikes & campsites{'\n'}near you
      </Text>
      <Button
        mode="contained"
        buttonColor={Colors.primary}
        textColor="#FFFFFF"
        style={styles.button}
        labelStyle={styles.buttonLabel}
      >
        Enable Location
      </Button>
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 16,
    backgroundColor: '#E8F5E9',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  text: {
    fontWeight: '600',
    color: Colors.text,
    textAlign: 'center',
    lineHeight: 21,
    marginBottom: 16,
  },
  button: {
    borderRadius: 24,
    paddingHorizontal: 28,
  },
  buttonLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
});
