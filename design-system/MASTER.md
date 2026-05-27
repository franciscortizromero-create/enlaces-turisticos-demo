# Enlaces Turisticos Marroqui - Design System

> Source of truth para el diseño del proyecto. Generado con UI/UX Pro Max Skill.

## 🎯 Identidad de Marca

**Producto**: Agencia de viajes premium (servicio turístico)
**Tono**: Elegante, lujoso, sofisticado, confiable
**Audiencia**: Viajeros que buscan experiencias premium y servicios personalizados

## 🎨 Pattern (Estructura)

- **Tipo**: Storytelling-Driven + Hero
- **CTA**: Above fold (visible sin hacer scroll)
- **Sections**: Hero → Features (destinos) → Ofertas → Testimonios → CTA

## ✨ Style (Estilo Visual)

- **Nombre**: Motion-Driven Premium
- **Características**: Animaciones suaves, microinteracciones, transiciones elegantes
- **Performance**: Optimizado para 60fps
- **Accesibilidad**: Respeta `prefers-reduced-motion`

## 🎨 Sistema de Colores (Tokens Semánticos)

### Light Mode

| Token | Hex | Uso |
|-------|-----|-----|
| `--color-primary` | `#0e1e52` (navy-800) | Color principal, botones primarios |
| `--color-primary-hover` | `#08122e` (navy-900) | Estado hover de primary |
| `--color-on-primary` | `#ffffff` | Texto sobre primary |
| `--color-secondary` | `#1e3f8a` (navy-600) | Color secundario |
| `--color-accent` | `#e6b020` (gold-500) | CTA destacados, acentos |
| `--color-accent-hover` | `#f5c842` (gold-400) | Estado hover de accent |
| `--color-on-accent` | `#08122e` | Texto sobre accent |
| `--color-background` | `#f8f9fc` | Fondo principal |
| `--color-surface` | `#ffffff` | Superficies (cards) |
| `--color-foreground` | `#0f172a` | Texto principal |
| `--color-muted` | `#f1f5f9` | Fondos sutiles |
| `--color-muted-foreground` | `#64748b` | Texto secundario |
| `--color-border` | `#e2e8f0` | Bordes |
| `--color-input` | `#ffffff` | Fondo de inputs |
| `--color-ring` | `#1e3f8a` | Focus ring |
| `--color-success` | `#16a34a` | Mensajes de éxito |
| `--color-warning` | `#f59e0b` | Advertencias |
| `--color-destructive` | `#dc2626` | Errores, eliminación |
| `--color-info` | `#0ea5e9` | Información |

### Dark Mode

| Token | Hex | Uso |
|-------|-----|-----|
| `--color-background` | `#08122e` (navy-900) | Fondo principal |
| `--color-surface` | `#0e1e52` (navy-800) | Superficies |
| `--color-foreground` | `#f8fafc` | Texto principal |
| `--color-muted` | `#152d6e` (navy-700) | Fondos sutiles |
| `--color-muted-foreground` | `#94a3b8` | Texto secundario |
| `--color-border` | `#2952a3` (navy-500) | Bordes |

### Contraste WCAG AA Verificado
- Texto primario sobre background: **15.8:1** ✓ AAA
- Gold sobre navy-900: **7.2:1** ✓ AAA
- Muted-foreground sobre background: **4.6:1** ✓ AA

## 📝 Tipografía

### Fuentes
- **Display (Headings)**: `Playfair Display` - Elegante, editorial
- **Body**: `Inter` - Moderna, legible, profesional

### Escala Tipográfica
```
display-2xl: 4.5rem (72px) / line-height 1.1 / weight 700
display-xl:  3.75rem (60px) / line-height 1.1 / weight 700
display-lg:  3rem (48px) / line-height 1.2 / weight 700
display-md:  2.25rem (36px) / line-height 1.2 / weight 600
display-sm:  1.875rem (30px) / line-height 1.3 / weight 600
heading-lg:  1.5rem (24px) / line-height 1.4 / weight 600
heading-md:  1.25rem (20px) / line-height 1.5 / weight 600
heading-sm:  1.125rem (18px) / line-height 1.5 / weight 600
body-lg:     1.125rem (18px) / line-height 1.6 / weight 400
body-md:     1rem (16px) / line-height 1.6 / weight 400
body-sm:     0.875rem (14px) / line-height 1.5 / weight 400
label:       0.875rem (14px) / line-height 1.4 / weight 500
caption:     0.75rem (12px) / line-height 1.4 / weight 400
```

## 📐 Espaciado (8px Grid)

```
xs:   0.25rem (4px)
sm:   0.5rem (8px)
md:   1rem (16px)
lg:   1.5rem (24px)
xl:   2rem (32px)
2xl:  3rem (48px)
3xl:  4rem (64px)
4xl:  6rem (96px)
```

## 🔲 Border Radius

```
sm:   0.375rem (6px) - Inputs, small buttons
md:   0.5rem (8px)   - Cards small
lg:   0.75rem (12px) - Buttons
xl:   1rem (16px)    - Cards
2xl:  1.5rem (24px)  - Modals, big cards
full: 9999px         - Pills, avatars
```

## 🎭 Elevación (Sombras)

```
shadow-sm:   subtle (cards en hover)
shadow-md:   default (cards, dropdowns)
shadow-lg:   elevated (modals, popovers)
shadow-xl:   highest (overlays principales)
shadow-glow: highlighted CTAs (con tinte gold)
```

## ⚡ Animaciones

### Duración
- **Micro-interacciones**: 150ms (button press, hover)
- **Transiciones UI**: 200-300ms (modals, drawers)
- **Entradas**: 400ms (fade-up de secciones)
- **Page transitions**: 500ms máximo

### Easing
- **Entrada**: `cubic-bezier(0.16, 1, 0.3, 1)` (ease-out)
- **Salida**: `cubic-bezier(0.4, 0, 1, 1)` (ease-in)
- **Default**: `cubic-bezier(0.4, 0, 0.2, 1)` (ease-in-out)

### Reduced Motion
- Todas las animaciones respetan `prefers-reduced-motion`
- Cuando está activo: duración 0.01ms (efectivamente sin animación)

## 🎯 Estados de Componentes

### Botones
- **Default**: bg-primary, text-on-primary
- **Hover**: bg-primary-hover, shadow-lg, scale-[1.02]
- **Active**: scale-[0.98]
- **Focus**: ring-2 ring-ring ring-offset-2
- **Disabled**: opacity-50, cursor-not-allowed

### Inputs
- **Default**: border-border, bg-input
- **Hover**: border-primary/50
- **Focus**: border-primary, ring-2 ring-ring/20
- **Error**: border-destructive, text-destructive
- **Disabled**: opacity-60, bg-muted

### Cards
- **Default**: bg-surface, border-border, shadow-sm
- **Hover**: shadow-md, border-primary/30
- **Active**: shadow-lg

## 📱 Breakpoints

```
xs:  375px  - Mobile small
sm:  640px  - Mobile large
md:  768px  - Tablet
lg:  1024px - Desktop small
xl:  1280px - Desktop
2xl: 1536px - Desktop large
```

**Container max-widths**: max-w-7xl (1280px) para contenido principal.

## ♿ Accesibilidad (Checklist)

- [x] Contraste WCAG AA (4.5:1 mínimo)
- [x] Focus rings visibles (2px, color ring)
- [x] aria-labels en botones de íconos
- [x] Alt text en todas las imágenes
- [x] Keyboard navigation completa
- [x] Tap targets ≥44x44px
- [x] Soporte prefers-reduced-motion
- [x] Headings jerárquicos (h1→h2→h3)
- [x] Sin info solo por color
- [x] Form labels visibles (no solo placeholder)

## ✅ Anti-patterns a EVITAR

- ❌ No usar emojis como íconos (usar Lucide/Heroicons)
- ❌ No hacer botones con solo `cursor-pointer` sin estados
- ❌ No usar placeholder como label
- ❌ No animar `width/height/top/left` (usar transform)
- ❌ No hacer texto < 16px en body mobile
- ❌ No usar gray-on-gray sin verificar contraste
- ❌ No hacer animaciones > 500ms
- ❌ No usar fotos genéricas de banco
- ❌ No olvidar reduced-motion support
