import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/utils/supabase/admin'

/**
 * POST /api/upload - SOLO admins
 * Sube una imagen al bucket 'ofertas' de Supabase Storage.
 * Limita: solo JPG/PNG/WebP, máximo 5 MB.
 */
export async function POST(request: NextRequest) {
  const auth = await requireAdmin()
  if (!auth) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }
  const { supabase } = auth

  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ error: 'No se recibió archivo' }, { status: 400 })
    }

    // Validar tipo MIME
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Solo se permiten imágenes JPG, PNG o WebP' },
        { status: 400 }
      )
    }

    // Validar tamaño (5 MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'La imagen no puede superar 5 MB' },
        { status: 400 }
      )
    }

    // Nombre único
    const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg'
    const safeName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const { data, error } = await supabase.storage
      .from('ofertas')
      .upload(safeName, buffer, {
        contentType: file.type,
        upsert: false,
      })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    const { data: urlData } = supabase.storage
      .from('ofertas')
      .getPublicUrl(data.path)

    return NextResponse.json({ url: urlData.publicUrl })
  } catch (err) {
    console.error('[upload] error:', err)
    return NextResponse.json({ error: 'Error al subir imagen' }, { status: 500 })
  }
}
