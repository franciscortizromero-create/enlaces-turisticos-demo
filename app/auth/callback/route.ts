import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

/**
 * Callback OAuth de Supabase.
 * Después del login con Google, Supabase redirige aquí con un ?code.
 * Intercambiamos el code por una sesión y redirigimos al dashboard.
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/admin/dashboard'

  if (code) {
    const supabase = await createClient()
    if (!supabase) {
      return NextResponse.redirect(`${origin}/admin?error=config`)
    }

    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (error) {
      return NextResponse.redirect(`${origin}/admin?error=auth`)
    }

    return NextResponse.redirect(`${origin}${next}`)
  }

  return NextResponse.redirect(`${origin}/admin?error=missing_code`)
}
