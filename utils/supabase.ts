import "react-native-url-polyfill/auto";
import { createClient } from "@supabase/supabase-js";

export function createSupabaseClerkClient(
  accessToken: Promise<string | null>,
) {
  return createClient(
    process.env.EXPO_PUBLIC_SUPABASE_URL!,
    process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!,
    { accessToken: () => accessToken },
  );
}
