'use client'

import { useState, lazy, Suspense } from 'react'
import { t, Lang } from '@/lib/i18n'
import { ComponentBuilder } from '@/components/ComponentBuilder'
import { GuideSection } from '@/components/GuideSection'
import { BomSection } from '@/components/BomSection'

const HeroCanvas = lazy(() =>
  import('@/components/HeroCanvas').then((m) => ({ default: m.HeroCanvas }))
)

function Section({
  id,
  children,
  className = '',
  style,
}: {
  id?: string
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <section id={id} className={`py-24 px-4 max-w-6xl mx-auto ${className}`} style={style}>
      {children}
    </section>
  )
}

function SectionHeader({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="text-center mb-12">
      <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">{title}</h2>
      {sub && <p className="text-white/50 max-w-xl mx-auto">{sub}</p>}
    </div>
  )
}

export default function Home() {
  const [lang, setLang] = useState<Lang>('zh')
  const strings = t[lang]

  return (
    <div className="min-h-screen text-white" style={{ background: '#080812' }}>
      {/* Nav */}
      <nav
        className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 py-4 border-b"
        style={{
          background: 'rgba(8,8,18,0.85)',
          backdropFilter: 'blur(12px)',
          borderColor: 'rgba(255,255,255,0.08)',
        }}
      >
        <span className="font-bold tracking-tight" style={{ color: 'rgba(255,255,255,0.9)' }}>
          {strings.nav.title}
        </span>
        <div className="flex items-center gap-6">
          {[
            { href: '#build', label: strings.nav.build },
            { href: '#guide', label: strings.nav.guide },
            { href: '#bom', label: strings.nav.bom },
          ].map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="text-sm hidden sm:block transition-colors"
              style={{ color: 'rgba(255,255,255,0.5)' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'white')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
            >
              {label}
            </a>
          ))}
          <button
            onClick={() => setLang((l) => (l === 'zh' ? 'en' : 'zh'))}
            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full transition-all"
            style={{
              border: '1px solid rgba(255,255,255,0.2)',
              background: 'rgba(255,255,255,0.08)',
              color: 'rgba(255,255,255,0.7)',
            }}
          >
            <span>{lang === 'zh' ? '🇺🇸' : '🇨🇳'}</span>
            {lang === 'zh' ? 'EN' : '中文'}
          </button>
        </div>
      </nav>

      {/* Hero */}
      <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Glow blobs */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: '25%', left: '20%', width: 400, height: 400,
            background: 'radial-gradient(circle, rgba(99,102,241,0.12), transparent 70%)',
            filter: 'blur(40px)',
          }}
        />
        <div
          className="absolute pointer-events-none"
          style={{
            bottom: '25%', right: '20%', width: 300, height: 300,
            background: 'radial-gradient(circle, rgba(16,185,129,0.08), transparent 70%)',
            filter: 'blur(40px)',
          }}
        />

        {/* 3D Canvas */}
        <div className="absolute inset-0" style={{ pointerEvents: 'auto' }}>
          <Suspense fallback={null}>
            <HeroCanvas />
          </Suspense>
        </div>

        {/* Hero text */}
        <div className="relative z-10 text-center px-4 mt-20" style={{ pointerEvents: 'none' }}>
          <span
            className="inline-block text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-6"
            style={{
              color: '#818cf8',
              background: 'rgba(99,102,241,0.1)',
              border: '1px solid rgba(99,102,241,0.2)',
            }}
          >
            {strings.hero.badge}
          </span>
          <h1 className="text-5xl sm:text-7xl font-black leading-tight mb-6 whitespace-pre-line">
            <span
              style={{
                background: 'linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,0.5) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {strings.hero.headline}
            </span>
          </h1>
          <p className="text-lg max-w-lg mx-auto mb-10 leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
            {strings.hero.sub}
          </p>
          <a
            href="#build"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-sm transition-all"
            style={{
              background: '#4f46e5',
              color: 'white',
              pointerEvents: 'auto',
              boxShadow: '0 8px 32px rgba(99,102,241,0.35)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#6366f1'
              e.currentTarget.style.transform = 'scale(1.05)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#4f46e5'
              e.currentTarget.style.transform = 'scale(1)'
            }}
          >
            {strings.hero.cta} →
          </a>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1" style={{ pointerEvents: 'none' }}>
          <p className="text-xs tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.2)' }}>
            {strings.hero.scroll}
          </p>
          <div
            className="w-px h-8"
            style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0.2), transparent)' }}
          />
        </div>
      </div>

      {/* Features */}
      <Section>
        <SectionHeader title={strings.features.title} sub="" />
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {strings.features.items.map((f, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl transition-all"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.07)'
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
              }}
            >
              <span className="text-3xl block mb-3">{f.icon}</span>
              <h3 className="font-semibold text-white mb-1">{f.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.4)' }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Builder */}
      <Section id="build" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <SectionHeader title={strings.builder.title} sub={strings.builder.sub} />
        <ComponentBuilder lang={lang} />
      </Section>

      {/* Guide */}
      <Section id="guide" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <SectionHeader title={strings.guide.title} sub={strings.guide.sub} />
        <GuideSection lang={lang} />
      </Section>

      {/* BOM */}
      <Section id="bom" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <SectionHeader title={strings.bom.title} sub={strings.bom.sub} />
        <BomSection lang={lang} />
      </Section>

      {/* Footer */}
      <footer
        className="py-8 px-4 text-center"
        style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
      >
        <p className="text-sm" style={{ color: 'rgba(255,255,255,0.3)' }}>{strings.footer.made}</p>
        <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.2)' }}>
          {strings.footer.open} · {strings.footer.license}
        </p>
      </footer>
    </div>
  )
}
