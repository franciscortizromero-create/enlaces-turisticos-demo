import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { requireAdmin } from '@/utils/supabase/admin'

/**
 * GET /api/offers - Pública, filtra por section/featured/category
 */
export async function GET(request: NextRequest) {
  const supabase = await createClient()
  if (!supabase) return NextResponse.json({ data: [] })

  const { searchParams } = new URL(request.url)
  const section  = searchParams.get('section')
  const featured = searchParams.get('featured')
  const category = searchParams.get('category')

  let query = supabase
    .from('offers')
    .select('*')
    .eq('active', true)
    .order('featured', { ascending: false })
    .order('created_at', { ascending: false })

  if (section)  query = query.eq('section', section)
  if (category) query = query.eq('category', category)
  if (featured) query = query.eq('featured', true)

  const { data, error } = await query

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

/**
 * POST /api/offers - SOLO admins
 */
export async function POST(request: NextRequest) {
  const auth = await requireAdmin()
  if (!auth) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }
  const { supabase, user } = auth

  let body
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'JSON inválido' }, { status: 400 })
  }

  // Validación básica
  if (!body.title || typeof body.title !== 'string' || body.title.length < 3) {
    return NextResponse.json({ error: 'Título requerido (mínimo 3 caracteres)' }, { status: 400 })
  }
  if (!body.city || typeof body.city !== 'string') {
    return NextResponse.json({ error: 'Ciudad requerida' }, { status: 400 })
  }
  if (typeof body.price !== 'number' || body.price <= 0) {
    return NextResponse.json({ error: 'Precio inválido' }, { status: 400 })
  }

  // Generar slug si no viene
  if (!body.slug && body.title) {
    body.slug = body.title
      .toLowerCase()
      .normalize('NFD').replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }

  // Audit trail
  body.created_by = user.id
  body.updated_by = user.id

  const { data, error } = await supabase
    .from('offers')
    .insert([body])
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data, { status: 201 })
}

/**
 * PUT /api/offers - SOLO admins
 */
export async function PUT(request: NextRequest) {
  const auth = await requireAdmin()
  if (!auth) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }
  const { supabase, user } = auth

  let body
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'JSON inválido' }, { status: 400 })
  }

  const { id, ...updates } = body
  if (!id) return NextResponse.json({ error: 'ID requerido' }, { status: 400 })

  // Audit trail
  updates.updated_by = user.id

  const { data, error } = await supabase
    .from('offers')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

/**
 * DELETE /api/offers?id=xxx - SOLO admins
 */
export async function DELETE(request: NextRequest) {
  const auth = await requireAdmin()
  if (!auth) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }
  const { supabase } = auth

  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  if (!id) return NextResponse.json({ error: 'ID requerido' }, { status: 400 })

  const { error } = await supabase.from('offers').delete().eq('id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
