'use client'

import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { supabase, type Offer } from '@/lib/supabase'

const EMPTY_OFFER: Partial<Offer> = {
  title: '', city: '', country: 'México', hotel: '',
  hotel_category: '4★', duration: '', price: 0, currency: 'MXN',
  dates: '', category: 'Playa', section: 'playas',
  summary: '', includes: [], notes: '', active: true, featured: false,
}

const CATEGORIES = ['Playa', 'Todo incluido', 'Familiar', 'Solo adultos', 'Lujo', 'Cultural', 'Aventura']
const SECTIONS   = [
  { value: 'mexico',  label: 'Visit México' },
  { value: 'europa',  label: 'Europa' },
  { value: 'playas',  label: 'Playas' },
  { value: 'general', label: 'General' },
]

export default function AdminDashboard() {
  const router = useRouter()
  const [user, setUser]           = useState<{ email?: string } | null>(null)
  const [offers, setOffers]       = useState<Offer[]>([])
  const [loading, setLoading]     = useState(true)
  const [saving, setSaving]       = useState(false)
  const [showForm, setShowForm]   = useState(false)
  const [editing, setEditing]     = useState<Partial<Offer>>(EMPTY_OFFER)
  const [isNew, setIsNew]         = useState(true)
  const [uploadingImg, setUploadingImg] = useState(false)
  const [successMsg, setSuccessMsg]     = useState('')
  const [includeInput, setIncludeInput] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  // ── Auth check ──
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) { router.replace('/admin'); return }
      setUser(session.user)
      loadOffers()
    })
  }, [router])

  async function loadOffers() {
    setLoading(true)
    const { data } = await supabase
      .from('offers')
      .select('*')
      .order('created_at', { ascending: false })
    setOffers(data || [])
    setLoading(false)
  }

  function openNew() {
    setEditing({ ...EMPTY_OFFER })
    setIncludeInput('')
    setIsNew(true)
    setShowForm(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function openEdit(o: Offer) {
    setEditing({ ...o })
    setIncludeInput('')
    setIsNew(false)
    setShowForm(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function cancelForm() {
    setShowForm(false)
    setEditing(EMPTY_OFFER)
  }

  // ── Subir imagen ──
  async function handleImageUpload(file: File) {
    setUploadingImg(true)
    try {
      const session = (await supabase.auth.getSession()).data.session
      const fd = new FormData()
      fd.append('file', file)
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { authorization: `Bearer ${session?.access_token}` },
        body: fd,
      })
      const json = await res.json()
      if (json.url) setEditing(e => ({ ...e, image_url: json.url }))
      else alert('Error al subir imagen: ' + json.error)
    } finally {
      setUploadingImg(false)
    }
  }

  // ── Guardar oferta ──
  async function handleSave() {
    if (!editing.title || !editing.city || !editing.price) {
      alert('Completa: título, ciudad y precio')
      return
    }
    setSaving(true)
    try {
      const session = (await supabase.auth.getSession()).data.session

      // Generar slug
      const slug = editing.title!
        .toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, '-')

      const payload = { ...editing, slug }

      const method = isNew ? 'POST' : 'PUT'
      const res = await fetch('/api/offers', {
        method,
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${session?.access_token}`,
        },
        body: JSON.stringify(payload),
      })

      if (!res.ok) { const e = await res.json(); throw new Error(e.error) }

      setSuccessMsg(isNew ? '✅ Viaje creado exitosamente' : '✅ Viaje actualizado')
      setTimeout(() => setSuccessMsg(''), 3000)
      cancelForm()
      loadOffers()
    } catch (e: unknown) {
      alert('Error: ' + (e instanceof Error ? e.message : String(e)))
    } finally {
      setSaving(false)
    }
  }

  // ── Eliminar ──
  async function handleDelete(id: string, title: string) {
    if (!confirm(`¿Eliminar "${title}"? Esta acción no se puede deshacer.`)) return
    const session = (await supabase.auth.getSession()).data.session
    await fetch(`/api/offers?id=${id}`, {
      method: 'DELETE',
      headers: { authorization: `Bearer ${session?.access_token}` },
    })
    setSuccessMsg('🗑️ Viaje eliminado')
    setTimeout(() => setSuccessMsg(''), 3000)
    loadOffers()
  }

  // ── Toggle activo/destacado ──
  async function toggleField(id: string, field: 'active' | 'featured', current: boolean) {
    await supabase.from('offers').update({ [field]: !current }).eq('id', id)
    loadOffers()
  }

  // ── Includes helpers ──
  function addInclude() {
    if (!includeInput.trim()) return
    setEditing(e => ({ ...e, includes: [...(e.includes || []), includeInput.trim()] }))
    setIncludeInput('')
  }
  function removeInclude(i: number) {
    setEditing(e => ({ ...e, includes: (e.includes || []).filter((_, idx) => idx !== i) }))
  }

  const signOut = async () => { await supabase.auth.signOut(); router.replace('/admin') }

  // ── UI ──
  return (
    <div className="min-h-screen bg-slate-50">

      {/* Top bar */}
      <div className="bg-navy-800 text-white px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image src="/logo-etm.png" alt="ETM" width={32} height={32} className="rounded-full" />
          <div>
            <div className="text-sm font-semibold">Panel de administración</div>
            <div className="text-xs text-white/50">{user?.email}</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <a href="/" target="_blank" className="text-xs text-white/60 hover:text-white transition">
            Ver sitio ↗
          </a>
          <button onClick={signOut} className="text-xs bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition">
            Cerrar sesión
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8">

        {/* Mensaje de éxito */}
        {successMsg && (
          <div className="mb-6 rounded-xl bg-green-50 border border-green-200 text-green-800 px-5 py-3 text-sm font-medium">
            {successMsg}
          </div>
        )}

        {/* ══ FORMULARIO ══ */}
        {showForm && (
          <div className="mb-8 rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 px-6 py-4 flex items-center justify-between">
              <h2 className="font-display text-xl font-bold text-navy-900">
                {isNew ? 'Nuevo viaje' : 'Editar viaje'}
              </h2>
              <button onClick={cancelForm} className="text-slate-400 hover:text-slate-600 text-xl leading-none">✕</button>
            </div>

            <div className="p-6 grid gap-6 md:grid-cols-2">

              {/* Columna izquierda */}
              <div className="space-y-4">
                <div>
                  <label className="label">Título del viaje *</label>
                  <input className="input" value={editing.title || ''} onChange={e => setEditing(p => ({ ...p, title: e.target.value }))} placeholder="ej. Hard Rock Riviera Maya 5★" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="label">País *</label>
                    <input className="input" value={editing.country || ''} onChange={e => setEditing(p => ({ ...p, country: e.target.value }))} />
                  </div>
                  <div>
                    <label className="label">Ciudad *</label>
                    <input className="input" value={editing.city || ''} onChange={e => setEditing(p => ({ ...p, city: e.target.value }))} placeholder="ej. Cancún" />
                  </div>
                </div>
                <div>
                  <label className="label">Hotel</label>
                  <input className="input" value={editing.hotel || ''} onChange={e => setEditing(p => ({ ...p, hotel: e.target.value }))} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="label">Categoría hotel</label>
                    <select className="input" value={editing.hotel_category} onChange={e => setEditing(p => ({ ...p, hotel_category: e.target.value as Offer['hotel_category'] }))}>
                      <option>3★</option><option>4★</option><option>5★</option>
                    </select>
                  </div>
                  <div>
                    <label className="label">Duración</label>
                    <input className="input" value={editing.duration || ''} onChange={e => setEditing(p => ({ ...p, duration: e.target.value }))} placeholder="ej. 4 días / 3 noches" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="label">Precio *</label>
                    <input className="input" type="number" value={editing.price || ''} onChange={e => setEditing(p => ({ ...p, price: Number(e.target.value) }))} />
                  </div>
                  <div>
                    <label className="label">Moneda</label>
                    <select className="input" value={editing.currency} onChange={e => setEditing(p => ({ ...p, currency: e.target.value as 'MXN' | 'USD' }))}>
                      <option>MXN</option><option>USD</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="label">Fechas</label>
                    <input className="input" value={editing.dates || ''} onChange={e => setEditing(p => ({ ...p, dates: e.target.value }))} placeholder="ej. Octubre 2026" />
                  </div>
                  <div>
                    <label className="label">Sección</label>
                    <select className="input" value={editing.section} onChange={e => setEditing(p => ({ ...p, section: e.target.value as Offer['section'] }))}>
                      {SECTIONS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="label">Categoría de viaje</label>
                  <select className="input" value={editing.category} onChange={e => setEditing(p => ({ ...p, category: e.target.value }))}>
                    {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              {/* Columna derecha */}
              <div className="space-y-4">
                {/* Imagen */}
                <div>
                  <label className="label">Foto del viaje</label>
                  {editing.image_url && (
                    <div className="mb-2 rounded-xl overflow-hidden aspect-video relative">
                      <Image src={editing.image_url} alt="Preview" fill className="object-cover" />
                    </div>
                  )}
                  <div className="flex gap-2 items-center">
                    <input
                      ref={fileRef}
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      className="hidden"
                      onChange={e => e.target.files?.[0] && handleImageUpload(e.target.files[0])}
                    />
                    <button
                      type="button"
                      onClick={() => fileRef.current?.click()}
                      disabled={uploadingImg}
                      className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 transition disabled:opacity-50"
                    >
                      {uploadingImg ? '⏳ Subiendo...' : '📷 Subir foto'}
                    </button>
                    {editing.image_url && (
                      <input className="input flex-1 text-xs" value={editing.image_url} onChange={e => setEditing(p => ({ ...p, image_url: e.target.value }))} placeholder="o pega URL" />
                    )}
                  </div>
                  {!editing.image_url && (
                    <input className="input mt-2" value={''} onChange={e => setEditing(p => ({ ...p, image_url: e.target.value }))} placeholder="o pega URL de imagen" />
                  )}
                </div>

                {/* Resumen */}
                <div>
                  <label className="label">Resumen</label>
                  <textarea className="input resize-none" rows={2} value={editing.summary || ''} onChange={e => setEditing(p => ({ ...p, summary: e.target.value }))} placeholder="Descripción breve del paquete" />
                </div>

                {/* Incluye */}
                <div>
                  <label className="label">¿Qué incluye?</label>
                  <div className="flex gap-2">
                    <input className="input flex-1" value={includeInput} onChange={e => setIncludeInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addInclude())} placeholder="ej. Vuelos redondos" />
                    <button type="button" onClick={addInclude} className="rounded-lg bg-navy-600 px-3 py-2 text-white text-sm hover:bg-navy-700 transition">+</button>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {(editing.includes || []).map((inc, i) => (
                      <span key={i} className="inline-flex items-center gap-1 rounded-full bg-navy-50 border border-navy-100 text-navy-700 text-xs px-2.5 py-1">
                        {inc}
                        <button onClick={() => removeInclude(i)} className="text-navy-400 hover:text-red-500">✕</button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Notas */}
                <div>
                  <label className="label">Notas / condiciones</label>
                  <textarea className="input resize-none" rows={2} value={editing.notes || ''} onChange={e => setEditing(p => ({ ...p, notes: e.target.value }))} placeholder="Letra chica, condiciones..." />
                </div>

                {/* Toggles */}
                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="accent-navy-600 h-4 w-4" checked={editing.active ?? true} onChange={e => setEditing(p => ({ ...p, active: e.target.checked }))} />
                    <span className="text-sm font-medium text-slate-700">Publicado</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="accent-gold-500 h-4 w-4" checked={editing.featured ?? false} onChange={e => setEditing(p => ({ ...p, featured: e.target.checked }))} />
                    <span className="text-sm font-medium text-slate-700">⭐ Destacado</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Botones */}
            <div className="border-t border-slate-100 px-6 py-4 flex justify-end gap-3">
              <button onClick={cancelForm} className="btn-outline text-sm px-5 py-2.5">Cancelar</button>
              <button onClick={handleSave} disabled={saving} className="btn-primary text-sm px-6 py-2.5 disabled:opacity-60">
                {saving ? 'Guardando...' : isNew ? 'Crear viaje' : 'Guardar cambios'}
              </button>
            </div>
          </div>
        )}

        {/* ══ LISTA DE VIAJES ══ */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-6 py-4 flex items-center justify-between">
            <div>
              <h2 className="font-display text-xl font-bold text-navy-900">Viajes publicados</h2>
              <p className="text-sm text-slate-500 mt-0.5">{offers.length} viajes en total</p>
            </div>
            <button onClick={openNew} className="btn-primary text-sm px-5 py-2.5">
              + Nuevo viaje
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin h-8 w-8 border-2 border-navy-600 border-t-transparent rounded-full" />
            </div>
          ) : offers.length === 0 ? (
            <div className="text-center py-20 text-slate-400">
              <div className="text-5xl mb-4">✈️</div>
              <p>No hay viajes aún. ¡Crea el primero!</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-50">
              {offers.map(offer => (
                <div key={offer.id} className="flex items-center gap-4 px-6 py-4 hover:bg-slate-50 transition-colors">
                  {/* Imagen miniatura */}
                  <div className="h-14 w-20 rounded-lg overflow-hidden bg-slate-100 shrink-0">
                    {offer.image_url ? (
                      <Image src={offer.image_url} alt={offer.title} width={80} height={56} className="object-cover h-full w-full" />
                    ) : (
                      <div className="h-full flex items-center justify-center text-2xl">🏖️</div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-navy-900 truncate">{offer.title}</span>
                      {offer.featured && <span className="text-xs bg-gold-400/20 text-yellow-700 rounded-full px-2 py-0.5">⭐ Destacado</span>}
                      {!offer.active && <span className="text-xs bg-red-50 text-red-600 rounded-full px-2 py-0.5">Oculto</span>}
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      {offer.city} · {offer.duration} · {offer.currency} ${offer.price.toLocaleString()}
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">{SECTIONS.find(s => s.value === offer.section)?.label} · {offer.category}</div>
                  </div>

                  {/* Acciones */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => toggleField(offer.id, 'featured', offer.featured)}
                      title={offer.featured ? 'Quitar destacado' : 'Marcar destacado'}
                      className={`p-1.5 rounded-lg text-lg transition ${offer.featured ? 'bg-gold-400/20 text-yellow-600' : 'text-slate-300 hover:text-yellow-500'}`}
                    >⭐</button>
                    <button
                      onClick={() => toggleField(offer.id, 'active', offer.active)}
                      title={offer.active ? 'Ocultar' : 'Publicar'}
                      className={`p-1.5 rounded-lg text-sm font-medium transition ${offer.active ? 'bg-green-50 text-green-600 hover:bg-green-100' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
                    >{offer.active ? 'Publicado' : 'Oculto'}</button>
                    <button onClick={() => openEdit(offer)} className="px-3 py-1.5 rounded-lg bg-navy-50 text-navy-700 text-sm hover:bg-navy-100 transition">
                      Editar
                    </button>
                    <button onClick={() => handleDelete(offer.id, offer.title)} className="px-3 py-1.5 rounded-lg bg-red-50 text-red-600 text-sm hover:bg-red-100 transition">
                      Borrar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Estilos del formulario */}
      <style jsx global>{`
        .label { display: block; font-size: 0.75rem; font-weight: 600; color: #475569; margin-bottom: 0.25rem; text-transform: uppercase; letter-spacing: 0.05em; }
        .input { display: block; width: 100%; rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-navy-400 focus:bg-white focus:ring-2 focus:ring-navy-100; }
        .input { display: block; width: 100%; border-radius: 0.5rem; border: 1px solid #e2e8f0; background: #f8fafc; padding: 0.55rem 0.75rem; font-size: 0.875rem; color: #1e293b; outline: none; transition: border-color 0.15s, box-shadow 0.15s; }
        .input:focus { border-color: #2952a3; background: white; box-shadow: 0 0 0 3px rgba(41, 82, 163, 0.1); }
        select.input { cursor: pointer; }
      `}</style>
    </div>
  )
}
