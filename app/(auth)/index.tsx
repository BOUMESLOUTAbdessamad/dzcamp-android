import { AuthView } from "@clerk/expo/native";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Colors } from "../../constants/colors";

export default function AuthScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <AuthView isDismissible={false} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});
