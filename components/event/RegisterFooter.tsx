import { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { Colors } from "../../constants/colors";
import type { Event } from "../../mocks/events";

export default function RegisterFooter({ event }: { event: Event }) {
  const [registered, setRegistered] = useState(false);

  if (event.spotsLeft === 0 && !registered) {
    return (
      <View style={styles.container}>
        <View style={styles.fullBanner}>
          <Text variant="bodyMedium" style={styles.fullText}>
            Event Full
          </Text>
        </View>
      </View>
    );
  }

  if (registered) {
    return (
      <View style={styles.container}>
        <View style={styles.registeredBanner}>
          <Text variant="bodyMedium" style={styles.registeredText}>
            You're registered ✓
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text variant="bodySmall" style={styles.spotsText}>
        {event.spotsLeft} spots left
      </Text>
      <Button
        mode="contained"
        buttonColor={Colors.primary}
        textColor="#FFFFFF"
        style={styles.button}
        labelStyle={styles.buttonLabel}
        onPress={() => {
          Alert.alert("Confirm Registration", `Register for ${event.title}?`, [
            { text: "Cancel", style: "cancel" },
            { text: "Register", onPress: () => setRegistered(true) },
          ]);
        }}
      >
        Register
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: 48,
  },
  spotsText: {
    color: Colors.text,
    opacity: 0.6,
    textAlign: "center",
    marginBottom: 10,
  },
  button: {
    borderRadius: 28,
    paddingVertical: 4,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: "600",
  },
  fullBanner: {
    backgroundColor: "#F0F0F0",
    borderRadius: 28,
    paddingVertical: 14,
    alignItems: "center",
  },
  fullText: {
    color: Colors.text,
    opacity: 0.5,
    fontWeight: "600",
  },
  registeredBanner: {
    backgroundColor: "#E8F5E9",
    borderRadius: 28,
    paddingVertical: 14,
    alignItems: "center",
  },
  registeredText: {
    color: Colors.primary,
    fontWeight: "600",
  },
});
