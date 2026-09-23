import { createClient } from "@supabase/supabase-js";
import { config } from "../env.js";

const authClient = createClient(config.SUPABASE_URL, config.SUPABASE_ANON_KEY);
const adminClient = createClient(
  config.SUPABASE_URL,
  config.SUPABASE_SERVICE_ROLE_KEY,
);

export { authClient, adminClient };
