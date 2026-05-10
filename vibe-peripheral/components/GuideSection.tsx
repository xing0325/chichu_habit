'use client'

import { useState } from 'react'
import { t, Lang } from '@/lib/i18n'

const difficultyColor: Record<string, string> = {
  Easy: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/30',
  Medium: 'text-amber-400 bg-amber-400/10 border-amber-400/30',
  Hard: 'text-red-400 bg-red-400/10 border-red-400/30',
  简单: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/30',
  中等: 'text-amber-400 bg-amber-400/10 border-amber-400/30',
}

export function GuideSection({ lang }: { lang: Lang }) {
  const strings = t[lang].guide
  const [active, setActive] = useState(0)
  const step = strings.steps[active]

  return (
    <div className="grid lg:grid-cols-5 gap-6">
      {/* Step nav */}
      <div className="lg:col-span-2 flex flex-col gap-2">
        {strings.steps.map((s, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`
              flex items-center gap-4 p-4 rounded-xl border text-left transition-all
              ${active === i
                ? 'bg-indigo-500/20 border-indigo-400/50 shadow-lg shadow-indigo-500/10'
                : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
              }
            `}
          >
            <span
              className={`text-2xl font-black font-mono min-w-10 ${
                active === i ? 'text-indigo-400' : 'text-white/20'
              }`}
            >
              {s.number}
            </span>
            <div>
              <p className={`font-semibold text-sm ${active === i ? 'text-white' : 'text-white/60'}`}>
                {s.title}
              </p>
              <p className="text-xs text-white/30">{s.duration}</p>
            </div>
            {i < active && (
              <span className="ml-auto text-emerald-400 text-lg">✓</span>
            )}
          </button>
        ))}
      </div>

      {/* Step detail */}
      <div className="lg:col-span-3">
        <div className="rounded-2xl bg-white/5 border border-white/15 p-6 h-full">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-4xl font-black font-mono text-indigo-400/40">{step.number}</p>
              <h3 className="text-2xl font-bold text-white -mt-1">{step.title}</h3>
            </div>
            <span
              className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${difficultyColor[step.difficulty] ?? 'text-white/40 bg-white/5 border-white/20'}`}
            >
              {step.difficulty}
            </span>
          </div>

          <p className="text-white/60 text-sm mb-5 leading-relaxed">{step.desc}</p>

          <div className="space-y-2 mb-6">
            {step.details.map((d, i) => (
              <div key={i} className="flex gap-3 items-start">
                <span className="text-indigo-400 text-xs mt-0.5 min-w-4">▸</span>
                <p className="text-sm text-white/70 font-mono leading-relaxed">{d}</p>
              </div>
            ))}
          </div>

          <div className="border-t border-white/10 pt-4">
            <p className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-2">
              {lang === 'zh' ? '需要准备' : 'You need'}
            </p>
            <div className="flex flex-wrap gap-2">
              {step.tools.map((tool) => (
                <span
                  key={tool}
                  className="text-xs px-2.5 py-1 rounded-lg bg-white/8 border border-white/15 text-white/60"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* Next button */}
          {active < strings.steps.length - 1 && (
            <button
              onClick={() => setActive((a) => a + 1)}
              className="mt-6 w-full py-3 rounded-xl bg-indigo-500/20 hover:bg-indigo-500/30 border border-indigo-500/30 text-indigo-300 font-semibold text-sm transition-all"
            >
              {lang === 'zh' ? '下一步 →' : 'Next Step →'}
            </button>
          )}
          {active === strings.steps.length - 1 && (
            <div className="mt-6 w-full py-3 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 font-semibold text-sm text-center">
              {lang === 'zh' ? '🎉 全部完成！' : '🎉 All done!'}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
