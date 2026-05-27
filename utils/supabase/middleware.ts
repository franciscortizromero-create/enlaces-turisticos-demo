import { createServerClient } from '@supabase/ssr'
import { type NextRequest, NextResponse } from 'next/server'

/**
 * Middleware de Supabase para refrescar sesiones automáticamente.
 * Protege rutas /admin/* exigiendo sesión activa.
 */
export const updateSession = async (request: NextRequest) => {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // Si Supabase no está configurado, dejar pasar todo
  if (!supabaseUrl || !supabaseKey) return supabaseResponse

  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll()
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
        supabaseResponse = NextResponse.next({ request })
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        )
      },
    },
  })

  // CRÍTICO: getUser() refresca el token si es necesario
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Proteger /admin/dashboard y subrutas (excepto /admin que es login)
  const isAdminProtected =
    request.nextUrl.pathname.startsWith('/admin/dashboard') ||
    (request.nextUrl.pathname.startsWith('/admin/') &&
      request.nextUrl.pathname !== '/admin')

  if (isAdminProtected && !user) {
    const url = request.nextUrl.clone()
    url.pathname = '/admin'
    return NextResponse.redirect(url)
  }

  // Si está logueado y va a /admin, redirigir a dashboard
  if (request.nextUrl.pathname === '/admin' && user) {
    const url = request.nextUrl.clone()
    url.pathname = '/admin/dashboard'
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}
