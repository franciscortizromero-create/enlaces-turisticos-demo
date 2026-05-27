import { createClient } from '@/utils/supabase/server'

/**
 * Verifica si el usuario actual está autenticado Y es admin.
 * Usar en Server Components y Route Handlers.
 *
 * @returns { user, isAdmin, supabase } o null si no hay sesión / no es admin
 */
export async function requireAdmin() {
  const supabase = await createClient()
  if (!supabase) return null

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user || !user.email) return null

  const { data: admin, error } = await supabase
    .from('admins')
    .select('*')
    .eq('email', user.email)
    .eq('active', true)
    .single()

  if (error || !admin) return null

  return { user, admin, supabase }
}

/**
 * Solo verifica si hay sesión activa (sin checkear admin).
 */
export async function getAuthenticatedUser() {
  const supabase = await createClient()
  if (!supabase) return null

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return user
}
