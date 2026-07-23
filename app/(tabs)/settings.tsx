import { StyleSheet, View } from "react-native";
import { UserProfileView } from "@clerk/expo/native";
import { Colors } from "../../constants/colors";

export default function SettingsTab() {
  return (
    <View style={styles.container}>
      <UserProfileView isDismissible={false} style={styles.profile} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  profile: {
    flex: 1,
  },
});
