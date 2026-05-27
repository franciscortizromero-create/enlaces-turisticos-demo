import { createBrowserClient } from '@supabase/ssr'

/**
 * Cliente de Supabase para componentes del navegador ('use client').
 * Devuelve null si las variables de entorno no están configuradas.
 */
export const createClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) return null

  return createBrowserClient(supabaseUrl, supabaseKey)
}
