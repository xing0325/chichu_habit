'use client'

import { useState } from 'react'
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { useDroppable, useDraggable } from '@dnd-kit/core'
import { t, Lang } from '@/lib/i18n'

type Component = (typeof t)['en']['builder']['components'][number]

function DraggableCard({ comp, placed }: { comp: Component; placed: boolean }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: comp.id,
    disabled: placed,
  })

  const style = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
    : undefined

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`
        relative flex flex-col items-center gap-1.5 p-3 rounded-xl border cursor-grab active:cursor-grabbing
        transition-all duration-200 select-none
        ${placed
          ? 'opacity-30 cursor-not-allowed border-white/10 bg-white/5'
          : 'border-white/20 bg-white/8 hover:bg-white/15 hover:border-white/40 hover:scale-105 hover:shadow-lg'
        }
        ${isDragging ? 'opacity-0' : ''}
      `}
    >
      <span className="text-2xl">{comp.emoji}</span>
      <span className="text-xs font-medium text-white/80 text-center leading-tight">{comp.name}</span>
      <span className="text-xs font-bold text-emerald-400">¥{comp.price}</span>
      <div
        className="absolute inset-0 rounded-xl opacity-20"
        style={{ background: `radial-gradient(circle at 50% 0%, ${comp.color}, transparent 70%)` }}
      />
    </div>
  )
}

function PlacedCard({ comp, onRemove }: { comp: Component; onRemove: () => void }) {
  return (
    <div
      className="relative flex flex-col items-center gap-1 p-2.5 rounded-xl border border-white/30 bg-white/10 cursor-pointer group transition-all hover:bg-red-500/20 hover:border-red-400/50"
      onClick={onRemove}
      title="Click to remove"
    >
      <span className="text-xl">{comp.emoji}</span>
      <span className="text-xs font-medium text-white/90 text-center leading-tight">{comp.name}</span>
      <span className="text-xs font-bold text-emerald-400">¥{comp.price}</span>
      <div className="absolute inset-0 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-red-500/20">
        <span className="text-xs text-red-300">✕</span>
      </div>
      <div
        className="absolute inset-0 rounded-xl opacity-30"
        style={{ background: `radial-gradient(circle at 50% 0%, ${comp.color}, transparent 70%)` }}
      />
    </div>
  )
}

function BoardDropZone({
  placed,
  onRemove,
  label,
  emptyLabel,
}: {
  placed: Component[]
  onRemove: (id: string) => void
  label: string
  emptyLabel: string
}) {
  const { isOver, setNodeRef } = useDroppable({ id: 'board' })

  return (
    <div
      ref={setNodeRef}
      className={`
        min-h-64 rounded-2xl border-2 border-dashed transition-all duration-200 p-4
        ${isOver
          ? 'border-indigo-400 bg-indigo-500/10 scale-[1.01]'
          : 'border-white/20 bg-white/5'
        }
      `}
    >
      <p className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-3">{label}</p>
      {placed.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-40 gap-2">
          <span className="text-4xl opacity-20">🔲</span>
          <p className="text-sm text-white/30 text-center">{emptyLabel}</p>
        </div>
      ) : (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
          {placed.map((c) => (
            <PlacedCard key={c.id} comp={c} onRemove={() => onRemove(c.id)} />
          ))}
        </div>
      )}
    </div>
  )
}

function DragOverlayCard({ comp }: { comp: Component }) {
  return (
    <div
      className="flex flex-col items-center gap-1.5 p-3 rounded-xl border border-white/40 bg-gray-900/95 shadow-2xl"
      style={{ width: 90 }}
    >
      <span className="text-2xl">{comp.emoji}</span>
      <span className="text-xs font-medium text-white/80 text-center leading-tight">{comp.name}</span>
      <span className="text-xs font-bold text-emerald-400">¥{comp.price}</span>
    </div>
  )
}

export function ComponentBuilder({ lang }: { lang: Lang }) {
  const strings = t[lang].builder
  const allComponents = strings.components as Component[]

  const [placed, setPlaced] = useState<Component[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  )

  const totalCost = placed.reduce((sum, c) => sum + c.price, 0)
  const unlockedFeatures = placed.flatMap((c) => c.unlocks)
  const activeComp = allComponents.find((c) => c.id === activeId)
  const allPlaced = placed.length === allComponents.length

  function handleDragStart(e: DragStartEvent) {
    setActiveId(e.active.id as string)
  }

  function handleDragEnd(e: DragEndEvent) {
    setActiveId(null)
    if (e.over?.id === 'board') {
      const comp = allComponents.find((c) => c.id === e.active.id)
      if (comp && !placed.find((p) => p.id === comp.id)) {
        setPlaced((prev) => [...prev, comp])
      }
    }
  }

  function removeFromBoard(id: string) {
    setPlaced((prev) => prev.filter((c) => c.id !== id))
  }

  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Shelf */}
        <div>
          <p className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-3">
            {strings.shelf}
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {allComponents.map((comp) => (
              <DraggableCard
                key={comp.id}
                comp={comp}
                placed={!!placed.find((p) => p.id === comp.id)}
              />
            ))}
          </div>
        </div>

        {/* Board + stats */}
        <div className="flex flex-col gap-4">
          <BoardDropZone
            placed={placed}
            onRemove={removeFromBoard}
            label={strings.board}
            emptyLabel={strings.boardEmpty}
          />

          {/* Price + features */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-white/8 border border-white/15 p-4">
              <p className="text-xs text-white/40 uppercase tracking-widest mb-1">{strings.totalCost}</p>
              <p className="text-3xl font-bold text-emerald-400">¥{totalCost}</p>
              <p className="text-xs text-white/30 mt-1">/ ¥75 {lang === 'zh' ? '目标' : 'target'}</p>
              <div className="mt-2 h-1.5 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500"
                  style={{ width: `${Math.min(100, (totalCost / 75) * 100)}%` }}
                />
              </div>
            </div>

            <div className="rounded-xl bg-white/8 border border-white/15 p-4 overflow-hidden">
              <p className="text-xs text-white/40 uppercase tracking-widest mb-2">{strings.unlock}</p>
              <div className="flex flex-wrap gap-1">
                {unlockedFeatures.map((f) => (
                  <span key={f} className="text-xs px-1.5 py-0.5 rounded-md bg-indigo-500/30 text-indigo-300 border border-indigo-500/30">
                    {f}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Reset */}
          <button
            onClick={() => setPlaced([])}
            className="text-xs text-white/30 hover:text-white/60 transition-colors underline underline-offset-2 self-start"
          >
            {strings.resetBtn}
          </button>

          {/* All done banner */}
          {allPlaced && (
            <div className="rounded-xl bg-gradient-to-r from-indigo-500/20 to-emerald-500/20 border border-indigo-400/30 p-4 text-sm text-white/80 animate-pulse">
              {strings.allDone}
            </div>
          )}
        </div>
      </div>

      <DragOverlay>
        {activeComp ? <DragOverlayCard comp={activeComp} /> : null}
      </DragOverlay>
    </DndContext>
  )
}
