'use client'

import { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { createClient } from '@/utils/supabase/client'

function AdminLoginContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [loading, setLoading]   = useState(false)
  const [checking, setChecking] = useState(true)
  const [error, setError]       = useState<string | null>(null)

  useEffect(() => {
    const errorParam = searchParams.get('error')
    if (errorParam === 'auth')         setError('No se pudo completar el inicio de sesión. Intenta de nuevo.')
    else if (errorParam === 'config')  setError('Supabase no está configurado correctamente.')
    else if (errorParam === 'denied')  setError('Tu cuenta no tiene permisos de administrador.')

    const supabase = createClient()
    if (!supabase) {
      setChecking(false)
      return
    }

    // Si ya está autenticado, redirigir al dashboard
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) router.replace('/admin/dashboard')
      else setChecking(false)
    })
  }, [router, searchParams])

  const handleGoogleLogin = async () => {
    setError(null)
    const supabase = createClient()
    if (!supabase) {
      setError('Supabase no está configurado')
      return
    }

    setLoading(true)
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    })
    if (error) {
      setError('Error al iniciar sesión: ' + error.message)
      setLoading(false)
    }
  }

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-navy-900">
        <div className="flex flex-col items-center gap-4">
          <div
            className="animate-spin h-10 w-10 border-3 border-gold-400 border-t-transparent rounded-full"
            role="status"
            aria-label="Verificando sesión"
          />
          <p className="text-white/60 text-sm">Verificando sesión...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 px-4 relative overflow-hidden">
      {/* Decoración de fondo */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-400/30 to-transparent" />
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-gold-400/10 rounded-full blur-3xl" aria-hidden="true" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-navy-500/20 rounded-full blur-3xl" aria-hidden="true" />

      <div className="w-full max-w-md relative animate-fade-up">
        {/* Card */}
        <div className="bg-navy-800/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-8">
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="h-20 w-20 rounded-full overflow-hidden border-2 border-gold-400/40 bg-white/10 mb-4 shadow-glow">
              <Image src="/logo-etm.png" alt="" width={80} height={80} priority />
            </div>
            <h1 className="font-display text-2xl font-bold text-white mb-1">
              Panel Administrador
            </h1>
            <p className="text-white/60 text-sm">Enlaces Turísticos Marroquí</p>
          </div>

          {/* Error message */}
          {error && (
            <div
              role="alert"
              className="mb-6 flex items-start gap-2 rounded-lg bg-red-500/10 border border-red-500/30 p-4 text-sm text-red-200"
            >
              <svg className="h-5 w-5 shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"/>
              </svg>
              {error}
            </div>
          )}

          {/* Google Sign In */}
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            aria-label="Iniciar sesión con Google"
            className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-50 active:scale-[0.98] text-navy-900 font-semibold py-3.5 px-6 rounded-xl transition-all shadow-lg disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-800 min-h-[48px]"
          >
            {loading ? (
              <>
                <div className="h-5 w-5 border-2 border-navy-900 border-t-transparent rounded-full animate-spin" />
                <span>Iniciando sesión...</span>
              </>
            ) : (
              <>
                <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                <span>Continuar con Google</span>
              </>
            )}
          </button>

          {/* Helper text */}
          <div className="mt-6 pt-6 border-t border-white/10">
            <div className="flex items-start gap-2">
              <svg className="h-4 w-4 text-gold-400 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-.75-13.25a.75.75 0 011.5 0v6.5a.75.75 0 01-1.5 0v-6.5zm.75 10.25a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"/>
              </svg>
              <p className="text-xs text-white/60 leading-relaxed">
                Solo cuentas autorizadas pueden acceder al panel administrativo.
                Si no puedes ingresar, contacta al equipo técnico.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-white/40 mt-6">
          © {new Date().getFullYear()} Enlaces Turísticos Marroquí
        </p>
      </div>
    </div>
  )
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-navy-900">
        <div className="animate-spin h-8 w-8 border-2 border-gold-400 border-t-transparent rounded-full" />
      </div>
    }>
      <AdminLoginContent />
    </Suspense>
  )
}
