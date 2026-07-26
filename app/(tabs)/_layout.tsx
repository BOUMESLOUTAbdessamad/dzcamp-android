import { useAuth, useUser } from "@clerk/expo";
import { Redirect, Tabs } from "expo-router";
import { useEffect } from "react";
import CustomTabBar from "../../components/CustomTabBar";
import { createSupabaseClerkClient } from "../../utils/supabase";

export default function TabLayout() {
    const { isLoaded, isSignedIn, getToken, userId } = useAuth({
        treatPendingAsSignedOut: false,
    });
    const { user } = useUser();

    useEffect(() => {
        if (!isSignedIn || !userId || !user) return;
        let cancelled = false;
        getToken({ template: "supabase" }).then((token) => {
            if (cancelled || !token) return;
            const supabase = createSupabaseClerkClient(Promise.resolve(token));
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
                    if (dbErr)
                        console.error("Supabase upsert failed:", dbErr.message);
                });
        });
        return () => { cancelled = true; };
    }, [isSignedIn, userId, user, getToken]);

    if (!isLoaded) return null;

  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="search" />
      <Tabs.Screen name="saved" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}
