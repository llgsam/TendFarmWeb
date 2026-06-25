import { createClient } from '@supabase/supabase-js'

// Use placeholder values at module load time so build succeeds.
// Real values are required at runtime for actual requests.
const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'https://placeholder.supabase.co'
const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? 'placeholder-key'

export const supabase = createClient(url, key)
