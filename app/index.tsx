import { Redirect } from "expo-router";
import { useAuth } from "@clerk/expo";
import type { Href } from "expo-router";

export default function Index() {
  const { isLoaded, isSignedIn } = useAuth({ treatPendingAsSignedOut: false });

  if (!isLoaded) return null;

  return (
    <Redirect href={(isSignedIn ? "/(tabs)" : "/(auth)") as Href} />
  );
}
