import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types
export type Offer = {
  id: string
  slug: string
  title: string
  image_url: string
  country: string
  city: string
  hotel: string
  hotel_category: '3★' | '4★' | '5★'
  duration: string
  price: number
  currency: 'MXN' | 'USD'
  dates: string
  start_date: string
  category: string
  section: 'mexico' | 'europa' | 'playas' | 'general'
  summary: string
  includes: string[]
  notes?: string
  active: boolean
  featured: boolean
  created_at: string
}

export type Service = {
  id: string
  type: 'autobus' | 'sprinter' | 'traslado' | 'helicoptero'
  name: string
  description: string
  capacity: string
  price_from?: number
  currency?: 'MXN' | 'USD'
  image_url?: string
  active: boolean
  created_at?: string
}
