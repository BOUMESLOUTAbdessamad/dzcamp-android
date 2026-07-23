import { useEffect } from "react";
import { Redirect, Tabs } from "expo-router";
import { useAuth, useUser } from "@clerk/expo";
import CustomTabBar from "../../components/CustomTabBar";
import { createSupabaseClerkClient } from "../../utils/supabase";

export default function TabLayout() {
  const { isLoaded, isSignedIn, getToken, userId } = useAuth({
    treatPendingAsSignedOut: false,
  });
  const { user } = useUser();

  useEffect(() => {
    if (!isSignedIn || !userId || !user) return;
    const supabase = createSupabaseClerkClient(getToken());
    supabase
      .from("users")
      .upsert(
        {
          clerk_id: userId,
          email: user.primaryEmailAddress?.emailAddress ?? null,
        },
        { onConflict: "clerk_id" },
      )
      .then(({ error: dbErr }) => {
        if (dbErr) console.error("Supabase upsert failed:", dbErr.message);
      });
  }, [isSignedIn, userId, user, getToken]);

  if (!isLoaded) return null;

  if (!isSignedIn) {
    return <Redirect href="/(auth)" />;
  }

  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="gallery" />
      <Tabs.Screen name="search" />
      <Tabs.Screen name="profile" />
      <Tabs.Screen name="settings" />
    </Tabs>
  );
}
