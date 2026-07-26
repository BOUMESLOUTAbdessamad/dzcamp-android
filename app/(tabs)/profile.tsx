import { UserProfileView } from "@clerk/expo/native";
import { StyleSheet, View } from "react-native";
import { Colors } from "../../constants/colors";
import { fetchSavedEvents, unsaveEvent } from "../../lib/api";
import type { Event } from "../../types/database";
import { createSupabaseClerkClient } from "../../utils/supabase";

export default function ProfileTab() {
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
