import { AuthView } from "@clerk/expo/native";
import { SafeAreaView, StyleSheet } from "react-native";
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
