import { Redirect, Stack } from "expo-router";
import { useAuth } from "@clerk/expo";
import type { Href } from "expo-router";

export default function AuthLayout() {
  const { isLoaded, isSignedIn } = useAuth({ treatPendingAsSignedOut: false });

  if (!isLoaded) return null;

  if (isSignedIn) {
    return <Redirect href={"/(tabs)" as Href} />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
