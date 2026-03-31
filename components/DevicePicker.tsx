'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import type { Device, Task } from '@/lib/howto-data'

interface DevicePickerProps {
  devices: Device[]
  tasks: Task[]
  tasksByCategory: Record<string, Task[]>
  categoryLabels: Record<string, string>
  categoryIcons: Record<string, string>
  validPairs: string[]
}

export default function DevicePicker({
  devices,
  tasks,
  tasksByCategory,
  categoryLabels,
  categoryIcons,
  validPairs,
}: DevicePickerProps) {
  const validPairsSet = useMemo(() => new Set(validPairs), [validPairs])
  const [search, setSearch] = useState('')
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const filteredTasks = useMemo(() => {
    let result = tasks

    if (selectedCategory) {
      result = result.filter((t) => t.category === selectedCategory)
    }

    if (selectedDevice) {
      result = result.filter((t) => validPairsSet.has(`${t.slug}:${selectedDevice}`))
    }

    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q)
      )
    }

    return result
  }, [tasks, selectedCategory, selectedDevice, search, validPairsSet])

  return (
    <div>
      {/* Search Bar */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search how-to guides... (e.g. screenshot, WiFi, alarm)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border text-base outline-none transition-colors focus:border-brand-blue"
          style={{
            backgroundColor: 'var(--bg-primary)',
            borderColor: 'var(--border-color)',
            color: 'var(--text-primary)',
          }}
        />
      </div>

      {/* Device Filter */}
      <div className="mb-6">
        <h3
          className="text-sm font-semibold uppercase tracking-wide mb-3"
          style={{ color: 'var(--text-muted)' }}
        >
          Filter by Device
        </h3>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedDevice(null)}
            className={`px-3 py-1.5 rounded-lg border text-sm font-medium transition-colors ${
              selectedDevice === null
                ? 'bg-brand-blue text-white border-brand-blue'
                : ''
            }`}
            style={
              selectedDevice === null
                ? undefined
                : { borderColor: 'var(--border-color)', color: 'var(--text-primary)' }
            }
          >
            All Devices
          </button>
          {devices.map((d) => (
            <button
              key={d.slug}
              onClick={() => setSelectedDevice(selectedDevice === d.slug ? null : d.slug)}
              className={`px-3 py-1.5 rounded-lg border text-sm font-medium transition-colors ${
                selectedDevice === d.slug
                  ? 'bg-brand-blue text-white border-brand-blue'
                  : ''
              }`}
              style={
                selectedDevice === d.slug
                  ? undefined
                  : { borderColor: 'var(--border-color)', color: 'var(--text-primary)' }
              }
            >
              {d.icon} {d.name}
            </button>
          ))}
        </div>
      </div>

      {/* Category Filter */}
      <div className="mb-8">
        <h3
          className="text-sm font-semibold uppercase tracking-wide mb-3"
          style={{ color: 'var(--text-muted)' }}
        >
          Filter by Category
        </h3>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-3 py-1.5 rounded-lg border text-sm font-medium transition-colors ${
              selectedCategory === null
                ? 'bg-brand-blue text-white border-brand-blue'
                : ''
            }`}
            style={
              selectedCategory === null
                ? undefined
                : { borderColor: 'var(--border-color)', color: 'var(--text-primary)' }
            }
          >
            All Categories
          </button>
          {Object.entries(categoryLabels).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setSelectedCategory(selectedCategory === key ? null : key)}
              className={`px-3 py-1.5 rounded-lg border text-sm font-medium transition-colors ${
                selectedCategory === key
                  ? 'bg-brand-blue text-white border-brand-blue'
                  : ''
              }`}
              style={
                selectedCategory === key
                  ? undefined
                  : { borderColor: 'var(--border-color)', color: 'var(--text-primary)' }
              }
            >
              {categoryIcons[key]} {label}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="space-y-3">
        {filteredTasks.length === 0 ? (
          <p className="text-center py-8" style={{ color: 'var(--text-muted)' }}>
            No guides found. Try a different search or filter.
          </p>
        ) : (
          filteredTasks.map((task) => (
            <Link
              key={task.slug}
              href={selectedDevice ? `/how-to/${task.slug}/${selectedDevice}` : `/how-to/${task.slug}`}
              className="flex items-center justify-between rounded-xl border p-4 transition-shadow hover:shadow-md"
              style={{
                backgroundColor: 'var(--bg-primary)',
                borderColor: 'var(--border-color)',
              }}
            >
              <div>
                <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                  {task.name}
                </span>
                <span className="flex items-center gap-2 mt-1 text-sm" style={{ color: 'var(--text-muted)' }}>
                  <span>{categoryIcons[task.category]}</span>
                  <span>{categoryLabels[task.category]}</span>
                  <span>&middot;</span>
                  <span>{task.estimatedTime}</span>
                  <span>&middot;</span>
                  <span className="capitalize">{task.difficulty}</span>
                </span>
              </div>
              <span style={{ color: 'var(--text-muted)' }}>&rarr;</span>
            </Link>
          ))
        )}
      </div>
    </div>
  )
}
