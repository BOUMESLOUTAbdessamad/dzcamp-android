import { ActivityIndicator, StyleSheet, View } from "react-native";
import { Stack } from "expo-router";
import { ClerkProvider, ClerkLoading, ClerkLoaded } from "@clerk/expo";
import { tokenCache } from "@clerk/expo/token-cache";

const rawKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;
if (!rawKey) {
  throw new Error(
    "Missing EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY — add it to your .env file",
  );
}
const publishableKey: string = rawKey;

export default function RootLayout() {
  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <ClerkLoading>
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#2E6F40" />
        </View>
      </ClerkLoading>
      <ClerkLoaded>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="event/[id]" options={{ headerShown: false }} />
        </Stack>
      </ClerkLoaded>
    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
