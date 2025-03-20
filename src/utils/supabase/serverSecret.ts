import { createBrowserClient } from '@supabase/ssr'

export function createServiceRoleClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_KEY!
  )
}