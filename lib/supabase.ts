/**
 * Tipos compartidos del proyecto.
 * Para crear clientes Supabase usa:
 *   - Server: import { createClient } from '@/utils/supabase/server'
 *   - Client: import { createClient } from '@/utils/supabase/client'
 *
 * Este archivo se mantiene por compatibilidad con código antiguo.
 */
import { createBrowserClient } from '@supabase/ssr'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  ''

// Cliente legacy para código que aún lo importa
export const supabase =
  supabaseUrl && supabaseKey
    ? createBrowserClient(supabaseUrl, supabaseKey)
    : null

// ─── Types ───

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
  created_by?: string
  updated_by?: string
  created_at: string
  updated_at?: string
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
  updated_at?: string
}

export type Admin = {
  id: string
  email: string
  name?: string
  role: 'super_admin' | 'admin' | 'editor'
  active: boolean
  created_at: string
  last_login?: string
}
