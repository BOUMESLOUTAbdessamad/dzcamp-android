import { useRouter } from "expo-router";

import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Avatar, Text } from "react-native-paper";
import { Colors } from "../../constants/colors";
import { currentUser } from "../../mocks/events";

export default function Header() {
  const navigation = useRouter();

  return (
    <View style={styles.container}>
      <View>
        <Text variant="headlineMedium" style={styles.greeting}>
          Hello, {currentUser.name}
        </Text>
        <Text variant="bodyMedium" style={styles.subtitle}>
          Find your next adventure
        </Text>
      </View>
      <TouchableOpacity onPress={() => navigation.push("/profile")}>
        <Avatar.Icon
          size={44}
          icon="account"
          style={styles.avatar}
          color={Colors.primary}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  greeting: {
    fontWeight: "700",
    color: Colors.text,
  },
  subtitle: {
    color: Colors.text,
    opacity: 0.6,
    marginTop: 2,
  },
  avatar: {
    backgroundColor: "#E8F5E9",
  },
});
