'use client'

import { useState } from 'react'
import { t, Lang } from '@/lib/i18n'

export function BomSection({ lang }: { lang: Lang }) {
  const strings = t[lang].bom
  const total = strings.items.reduce((s, i) => s + i.price, 0)
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    const lines = strings.items.map(
      (i) => `${i.part}\t×${i.qty}\t¥${i.price}\t${i.search}`
    )
    lines.push(`\n${strings.total}: ¥${total}`)
    navigator.clipboard.writeText(lines.join('\n'))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div />
        <button
          onClick={handleCopy}
          className="text-xs px-3 py-1.5 rounded-lg bg-white/8 hover:bg-white/15 border border-white/15 text-white/60 hover:text-white transition-all"
        >
          {copied
            ? lang === 'zh' ? '✓ 已复制' : '✓ Copied'
            : lang === 'zh' ? '复制清单' : 'Copy list'}
        </button>
      </div>

      <div className="rounded-2xl border border-white/15 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-white/8 border-b border-white/10">
              <th className="text-left px-4 py-3 text-xs font-semibold text-white/40 uppercase tracking-widest">{strings.cols.part}</th>
              <th className="text-center px-4 py-3 text-xs font-semibold text-white/40 uppercase tracking-widest hidden sm:table-cell">{strings.cols.qty}</th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-white/40 uppercase tracking-widest">{strings.cols.price}</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-white/40 uppercase tracking-widest hidden md:table-cell">{strings.cols.search}</th>
            </tr>
          </thead>
          <tbody>
            {strings.items.map((item, i) => (
              <tr
                key={i}
                className="border-b border-white/8 hover:bg-white/5 transition-colors"
              >
                <td className="px-4 py-3 text-white/80 font-medium">{item.part}</td>
                <td className="px-4 py-3 text-white/40 text-center hidden sm:table-cell">×{item.qty}</td>
                <td className="px-4 py-3 text-emerald-400 font-bold text-right">¥{item.price}</td>
                <td className="px-4 py-3 hidden md:table-cell">
                  <code className="text-xs text-indigo-300 bg-indigo-500/10 px-2 py-0.5 rounded">
                    {item.search}
                  </code>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-white/5">
              <td colSpan={2} className="px-4 py-4 text-white/60 font-semibold text-sm">{strings.total}</td>
              <td className="px-4 py-4 text-right">
                <span className="text-2xl font-black text-emerald-400">¥{total}</span>
              </td>
              <td className="hidden md:table-cell px-4 py-4">
                <span className="text-xs text-white/30">
                  {lang === 'zh' ? '约 $10 USD' : '~$10 USD'}
                </span>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      <p className="text-xs text-white/30 mt-3 text-center">
        {lang === 'zh'
          ? '* 价格为淘宝参考价，实际以下单时为准'
          : '* Prices are Taobao estimates. AliExpress may differ slightly.'}
      </p>
    </div>
  )
}
