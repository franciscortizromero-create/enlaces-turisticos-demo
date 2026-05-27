'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { supabase } from '@/lib/supabase'

export default function AdminLoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    // Si ya está autenticado, redirigir al dashboard
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) router.replace('/admin/dashboard')
      else setChecking(false)
    })
  }, [router])

  const handleGoogleLogin = async () => {
    setLoading(true)
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/admin/dashboard`,
      },
    })
    if (error) {
      alert('Error al iniciar sesión: ' + error.message)
      setLoading(false)
    }
  }

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-navy-900">
        <div className="animate-spin h-8 w-8 border-2 border-gold-400 border-t-transparent rounded-full" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-navy-900 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Card */}
        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur p-10 text-center">
          {/* Logo */}
          <div className="mx-auto mb-6 h-16 w-16 rounded-full overflow-hidden border-2 border-gold-400/50 bg-white/10">
            <Image src="/logo-etm.png" alt="ETM" width={64} height={64} />
          </div>

          <h1 className="font-display text-2xl font-bold text-white mb-1">
            Panel de administración
          </h1>
          <p className="text-sm text-white/50 mb-8">
            Enlaces Turísticos Marroquí
          </p>

          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 rounded-xl bg-white px-5 py-3.5 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50 disabled:opacity-60"
          >
            {loading ? (
              <div className="h-5 w-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
            ) : (
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            )}
            {loading ? 'Iniciando sesión...' : 'Entrar con Google'}
          </button>

          <p className="mt-6 text-xs text-white/30">
            Solo el correo autorizado puede acceder al panel.
          </p>
        </div>

        <p className="mt-6 text-center text-xs text-white/20">
          © {new Date().getFullYear()} Enlaces Turísticos Marroquí
        </p>
      </div>
    </div>
  )
}
