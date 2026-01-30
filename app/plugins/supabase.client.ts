import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();

  const url = (config.public.SUPABASE_URL as string | undefined) || "";
  const key = (config.public.SUPABASE_KEY as string | undefined) || "";

  if (!url || !key) {
    console.warn("[supabase] missing SUPABASE_URL/SUPABASE_KEY -> disabled");
    return {
      provide: {
        supabase: null as unknown as SupabaseClient,
      },
    };
  }

  const supabase: SupabaseClient = createClient(url, key);

  return {
    provide: {
      supabase,
    },
  };
});
