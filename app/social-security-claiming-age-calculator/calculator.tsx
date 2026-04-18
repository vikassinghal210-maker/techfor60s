'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { trackToolUsage } from '@/lib/ga-events'
import { Calculator, TrendingUp, Info, Calendar } from 'lucide-react'

// ── Full Retirement Age (FRA) schedule from SSA ────────────────────────────
// Source: https://www.ssa.gov/benefits/retirement/planner/agereduction.html
// For birth years 1960 and later, FRA = 67.
// Earlier years slide from 66 to 66 + months.
function fraForBirthYear(year: number): { years: number; months: number; totalMonths: number } {
  if (year <= 1937) return { years: 65, months: 0, totalMonths: 780 }
  if (year === 1938) return { years: 65, months: 2, totalMonths: 782 }
  if (year === 1939) return { years: 65, months: 4, totalMonths: 784 }
  if (year === 1940) return { years: 65, months: 6, totalMonths: 786 }
  if (year === 1941) return { years: 65, months: 8, totalMonths: 788 }
  if (year === 1942) return { years: 65, months: 10, totalMonths: 790 }
  if (year >= 1943 && year <= 1954) return { years: 66, months: 0, totalMonths: 792 }
  if (year === 1955) return { years: 66, months: 2, totalMonths: 794 }
  if (year === 1956) return { years: 66, months: 4, totalMonths: 796 }
  if (year === 1957) return { years: 66, months: 6, totalMonths: 798 }
  if (year === 1958) return { years: 66, months: 8, totalMonths: 800 }
  if (year === 1959) return { years: 66, months: 10, totalMonths: 802 }
  return { years: 67, months: 0, totalMonths: 804 } // 1960 and later
}

// Reduction for claiming early, per SSA:
// First 36 months before FRA: 5/9 of 1% per month (≈ 0.5556%)
// Additional months beyond 36: 5/12 of 1% per month (≈ 0.4167%)
// Example: FRA=67, claim at 62 → 60 months early → 5*12=36 + 24 remaining
//   Reduction = 36*(5/9)% + 24*(5/12)% = 20% + 10% = 30% → 70% of PIA
function reductionFactor(claimAgeYears: number, claimAgeMonths: number, fraTotalMonths: number): number {
  const claimTotal = claimAgeYears * 12 + claimAgeMonths
  if (claimTotal >= fraTotalMonths) return 1
  const monthsEarly = fraTotalMonths - claimTotal
  const firstBlock = Math.min(36, monthsEarly)
  const secondBlock = Math.max(0, monthsEarly - 36)
  const pctReduction = firstBlock * (5 / 9) + secondBlock * (5 / 12) // percent
  return 1 - pctReduction / 100
}

// Delayed retirement credit (DRC): 2/3 of 1% per month for 1943+, capped at age 70.
// = 8% per year past FRA. Birth year 1960+ FRA = 67 → 3 years × 8% = 24% boost at 70.
function delayFactor(claimAgeYears: number, claimAgeMonths: number, fraTotalMonths: number): number {
  const claimTotal = Math.min(70 * 12, claimAgeYears * 12 + claimAgeMonths)
  if (claimTotal <= fraTotalMonths) return 1
  const monthsLate = claimTotal - fraTotalMonths
  return 1 + monthsLate * (2 / 3) / 100
}

function currency(n: number): string {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
}

interface Row {
  age: number
  ageLabel: string
  factor: number
  monthly: number
  pctOfFra: number
  cumAt80: number
  cumAt85: number
  cumAt90: number
  note: string
}

function computeRows(birthYear: number, pia: number, lifeExpectancy: number): {
  rows: Row[]
  fra: { years: number; months: number; label: string }
  breakEven62vs70: number | null
  breakEvenFraVs70: number | null
  bestAt: Row | null
} {
  const fraObj = fraForBirthYear(birthYear)
  const fraLabel = fraObj.months === 0 ? `${fraObj.years}` : `${fraObj.years} years ${fraObj.months} months`

  const ages = [
    { age: 62, months: 0, label: '62 (earliest eligibility)' },
    { age: 66, months: 0, label: '66' },
    { age: fraObj.years, months: fraObj.months, label: `Full Retirement Age (${fraLabel})` },
    { age: 70, months: 0, label: '70 (maximum benefit)' },
  ]
  // Deduplicate in case FRA is 66 exactly
  const seen = new Set<string>()
  const uniqueAges = ages.filter((a) => {
    const k = `${a.age}-${a.months}`
    if (seen.has(k)) return false
    seen.add(k)
    return true
  })

  const rows: Row[] = uniqueAges.map((a) => {
    let factor = 1
    if (a.age * 12 + a.months < fraObj.totalMonths) {
      factor = reductionFactor(a.age, a.months, fraObj.totalMonths)
    } else if (a.age * 12 + a.months > fraObj.totalMonths) {
      factor = delayFactor(a.age, a.months, fraObj.totalMonths)
    }
    const monthly = pia * factor
    const pctOfFra = factor * 100

    const yearsAt80 = Math.max(0, 80 - a.age)
    const yearsAt85 = Math.max(0, 85 - a.age)
    const yearsAt90 = Math.max(0, 90 - a.age)

    let note = ''
    if (a.age === 62) {
      note = `Reduced by ${(100 - pctOfFra).toFixed(1)}% compared to waiting until FRA.`
    } else if (a.age === fraObj.years && a.months === fraObj.months) {
      note = 'Your full, unreduced benefit.'
    } else if (a.age === 70) {
      note = `Increased by ${(pctOfFra - 100).toFixed(1)}% thanks to delayed retirement credits.`
    } else if (a.age < fraObj.years) {
      note = `Reduced by ${(100 - pctOfFra).toFixed(1)}%.`
    } else {
      note = `Increased by ${(pctOfFra - 100).toFixed(1)}%.`
    }

    return {
      age: a.age,
      ageLabel: a.label,
      factor,
      monthly,
      pctOfFra,
      cumAt80: monthly * 12 * yearsAt80,
      cumAt85: monthly * 12 * yearsAt85,
      cumAt90: monthly * 12 * yearsAt90,
      note,
    }
  })

  // Break-even: age at which 70-claim cumulative exceeds 62-claim and FRA-claim cumulative
  function breakEven(earlyAge: number, earlyMonthly: number, lateAge: number, lateMonthly: number): number | null {
    if (lateMonthly <= earlyMonthly) return null
    // At age A: earlyCum = earlyMonthly * 12 * (A - earlyAge); lateCum = lateMonthly * 12 * (A - lateAge)
    // Set equal: earlyMonthly*(A-earlyAge) = lateMonthly*(A-lateAge)
    // A*(earlyMonthly - lateMonthly) = earlyMonthly*earlyAge - lateMonthly*lateAge
    // A = (earlyMonthly*earlyAge - lateMonthly*lateAge) / (earlyMonthly - lateMonthly)
    const A =
      (earlyMonthly * earlyAge - lateMonthly * lateAge) / (earlyMonthly - lateMonthly)
    if (!isFinite(A) || A < lateAge) return null
    return A
  }

  const row62 = rows.find((r) => r.age === 62)
  const rowFra = rows.find((r) => r.age === fraObj.years && Math.abs(r.pctOfFra - 100) < 0.5)
  const row70 = rows.find((r) => r.age === 70)
  const breakEven62vs70 = row62 && row70 ? breakEven(62, row62.monthly, 70, row70.monthly) : null
  const breakEvenFraVs70 =
    rowFra && row70 ? breakEven(fraObj.years + fraObj.months / 12, rowFra.monthly, 70, row70.monthly) : null

  // Best claim age given life expectancy (cumulative benefit)
  let bestAt: Row | null = null
  let bestTotal = -1
  for (const r of rows) {
    const years = Math.max(0, lifeExpectancy - r.age)
    const total = r.monthly * 12 * years
    if (total > bestTotal) {
      bestTotal = total
      bestAt = r
    }
  }

  return {
    rows,
    fra: { years: fraObj.years, months: fraObj.months, label: fraLabel },
    breakEven62vs70,
    breakEvenFraVs70,
    bestAt,
  }
}

export default function SSClaimCalculatorClient() {
  const [birthYear, setBirthYear] = useState(1960)
  const [piaInput, setPiaInput] = useState('2000')
  const [lifeExpectancy, setLifeExpectancy] = useState(85)
  const [submitted, setSubmitted] = useState(false)

  const pia = Number(piaInput) || 0
  const currentYear = 2026

  const inputsValid =
    birthYear >= 1937 &&
    birthYear <= currentYear - 62 &&
    pia >= 200 &&
    pia <= 6000 &&
    lifeExpectancy >= 65 &&
    lifeExpectancy <= 105

  const result = useMemo(() => {
    if (!submitted || !inputsValid) return null
    return computeRows(birthYear, pia, lifeExpectancy)
  }, [submitted, inputsValid, birthYear, pia, lifeExpectancy])

  const handleCalculate = () => {
    if (!inputsValid) return
    setSubmitted(true)
    trackToolUsage('ss-claiming-age', `pia-${Math.round(pia / 500) * 500}`)
  }

  return (
    <div className="space-y-8">
      {/* Inputs */}
      <div
        className="rounded-xl border-2 p-6 sm:p-8"
        style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
      >
        <h2
          className="text-xl font-bold font-[family-name:var(--font-heading)] mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          Your details
        </h2>

        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="birth-year"
              className="block text-lg font-semibold mb-2 font-[family-name:var(--font-heading)]"
              style={{ color: 'var(--text-primary)' }}
            >
              Your birth year
            </label>
            <input
              id="birth-year"
              type="number"
              min={1937}
              max={currentYear - 62}
              value={birthYear}
              onChange={(e) => {
                setBirthYear(Number(e.target.value) || 0)
                setSubmitted(false)
              }}
              aria-describedby="birth-year-hint"
              className="w-full rounded-xl border p-4 text-lg focus:outline-none focus:ring-2 focus:ring-brand-blue"
              style={{
                backgroundColor: 'var(--bg-primary)',
                borderColor: 'var(--border-color)',
                color: 'var(--text-primary)',
              }}
            />
            <p id="birth-year-hint" className="text-sm mt-2" style={{ color: 'var(--text-muted)' }}>
              Must be between 1937 and {currentYear - 62}.
            </p>
          </div>

          <div>
            <label
              htmlFor="pia"
              className="block text-lg font-semibold mb-2 font-[family-name:var(--font-heading)]"
              style={{ color: 'var(--text-primary)' }}
            >
              Your monthly benefit at Full Retirement Age (PIA)
            </label>
            <div className="relative">
              <span
                className="absolute left-4 top-1/2 -translate-y-1/2 text-lg"
                style={{ color: 'var(--text-muted)' }}
                aria-hidden
              >
                $
              </span>
              <input
                id="pia"
                type="number"
                inputMode="numeric"
                min={200}
                max={6000}
                step={10}
                value={piaInput}
                onChange={(e) => {
                  setPiaInput(e.target.value)
                  setSubmitted(false)
                }}
                aria-describedby="pia-hint"
                className="w-full rounded-xl border p-4 pl-8 text-lg focus:outline-none focus:ring-2 focus:ring-brand-blue"
                style={{
                  backgroundColor: 'var(--bg-primary)',
                  borderColor: 'var(--border-color)',
                  color: 'var(--text-primary)',
                }}
              />
            </div>
            <p id="pia-hint" className="text-sm mt-2" style={{ color: 'var(--text-muted)' }}>
              Find your estimate at{' '}
              <a
                href="https://www.ssa.gov/myaccount/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-blue underline"
              >
                SSA.gov/myaccount
              </a>
              . Typical range: $1,000–$4,000.
            </p>
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="life-expectancy"
              className="block text-lg font-semibold mb-2 font-[family-name:var(--font-heading)]"
              style={{ color: 'var(--text-primary)' }}
            >
              How long do you expect to live? (best estimate)
            </label>
            <div className="flex items-center gap-4">
              <input
                id="life-expectancy"
                type="range"
                min={70}
                max={100}
                value={lifeExpectancy}
                onChange={(e) => {
                  setLifeExpectancy(Number(e.target.value))
                  setSubmitted(false)
                }}
                aria-describedby="life-hint"
                className="flex-1 h-3 accent-[color:var(--color-brand-blue)]"
              />
              <span className="text-xl font-bold w-16 text-right" style={{ color: 'var(--text-primary)' }}>
                {lifeExpectancy}
              </span>
            </div>
            <p id="life-hint" className="text-sm mt-2" style={{ color: 'var(--text-muted)' }}>
              US average for a 65-year-old today is about 84 (men) to 87 (women). Factor in your health and family
              history.
            </p>
          </div>
        </div>

        <div className="mt-8">
          <button
            type="button"
            onClick={handleCalculate}
            disabled={!inputsValid}
            className="px-6 py-4 min-h-[44px] rounded-xl bg-brand-blue text-white text-lg font-semibold inline-flex items-center gap-2 hover:opacity-90 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Calculator className="w-5 h-5" aria-hidden /> Calculate my options
          </button>
        </div>
      </div>

      {/* Results */}
      {result && (
        <div className="space-y-6" aria-live="polite">
          {/* Summary card */}
          <div
            className="rounded-xl border-2 p-6 sm:p-8"
            style={{
              backgroundColor: 'var(--bg-tertiary)',
              borderColor: 'var(--border-color)',
            }}
          >
            <div className="flex items-start gap-4">
              <Calendar className="w-10 h-10 flex-shrink-0 text-brand-blue" aria-hidden />
              <div>
                <h3
                  className="text-xl font-bold font-[family-name:var(--font-heading)] mb-2"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Your Full Retirement Age (FRA) is {result.fra.label}
                </h3>
                <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  Based on your birth year of {birthYear}. You can file as early as 62 — but each month you wait
                  (up to 70) increases your lifetime cheque.
                </p>
              </div>
            </div>
          </div>

          {/* Table */}
          <div>
            <h3
              className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-4"
              style={{ color: 'var(--text-primary)' }}
            >
              Monthly and lifetime benefit by claim age
            </h3>

            {/* Desktop table */}
            <div
              className="hidden sm:block rounded-xl border overflow-hidden"
              style={{ borderColor: 'var(--border-color)' }}
            >
              <table className="w-full">
                <thead style={{ backgroundColor: 'var(--bg-tertiary)' }}>
                  <tr>
                    <th className="text-left p-4 text-base font-semibold" style={{ color: 'var(--text-primary)' }}>
                      Claim age
                    </th>
                    <th className="text-right p-4 text-base font-semibold" style={{ color: 'var(--text-primary)' }}>
                      Monthly
                    </th>
                    <th className="text-right p-4 text-base font-semibold" style={{ color: 'var(--text-primary)' }}>
                      % of FRA
                    </th>
                    <th className="text-right p-4 text-base font-semibold" style={{ color: 'var(--text-primary)' }}>
                      Total by 80
                    </th>
                    <th className="text-right p-4 text-base font-semibold" style={{ color: 'var(--text-primary)' }}>
                      Total by 85
                    </th>
                    <th className="text-right p-4 text-base font-semibold" style={{ color: 'var(--text-primary)' }}>
                      Total by 90
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {result.rows.map((r) => {
                    const isBest = result.bestAt?.age === r.age
                    return (
                      <tr
                        key={r.age}
                        className="border-t"
                        style={{
                          borderColor: 'var(--border-color)',
                          backgroundColor: isBest ? 'var(--bg-tertiary)' : 'var(--bg-secondary)',
                        }}
                      >
                        <td className="p-4 text-base" style={{ color: 'var(--text-primary)' }}>
                          <div className="font-semibold">{r.ageLabel}</div>
                          <div className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
                            {r.note}
                          </div>
                        </td>
                        <td className="p-4 text-right text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
                          {currency(r.monthly)}
                        </td>
                        <td className="p-4 text-right text-base" style={{ color: 'var(--text-secondary)' }}>
                          {r.pctOfFra.toFixed(1)}%
                        </td>
                        <td className="p-4 text-right text-base" style={{ color: 'var(--text-secondary)' }}>
                          {currency(r.cumAt80)}
                        </td>
                        <td className="p-4 text-right text-base" style={{ color: 'var(--text-secondary)' }}>
                          {currency(r.cumAt85)}
                        </td>
                        <td className="p-4 text-right text-base" style={{ color: 'var(--text-secondary)' }}>
                          {currency(r.cumAt90)}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile stacked cards */}
            <div className="sm:hidden space-y-3">
              {result.rows.map((r) => {
                const isBest = result.bestAt?.age === r.age
                return (
                  <div
                    key={r.age}
                    className="rounded-xl border p-5"
                    style={{
                      borderColor: 'var(--border-color)',
                      backgroundColor: isBest ? 'var(--bg-tertiary)' : 'var(--bg-secondary)',
                    }}
                  >
                    <div className="flex items-baseline justify-between mb-1">
                      <h4 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
                        {r.ageLabel}
                      </h4>
                      <span className="text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>
                        {r.pctOfFra.toFixed(1)}% of FRA
                      </span>
                    </div>
                    <p className="text-sm mb-3" style={{ color: 'var(--text-muted)' }}>
                      {r.note}
                    </p>
                    <div className="text-2xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
                      {currency(r.monthly)}
                      <span className="text-base font-normal" style={{ color: 'var(--text-muted)' }}>
                        {' '}
                        / month
                      </span>
                    </div>
                    <dl className="grid grid-cols-3 gap-2 text-sm">
                      <div>
                        <dt style={{ color: 'var(--text-muted)' }}>By 80</dt>
                        <dd className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                          {currency(r.cumAt80)}
                        </dd>
                      </div>
                      <div>
                        <dt style={{ color: 'var(--text-muted)' }}>By 85</dt>
                        <dd className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                          {currency(r.cumAt85)}
                        </dd>
                      </div>
                      <div>
                        <dt style={{ color: 'var(--text-muted)' }}>By 90</dt>
                        <dd className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                          {currency(r.cumAt90)}
                        </dd>
                      </div>
                    </dl>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Break-even callout */}
          <div
            className="rounded-xl border-2 p-6 sm:p-8"
            style={{
              backgroundColor: 'var(--bg-secondary)',
              borderColor: 'var(--border-color)',
            }}
          >
            <div className="flex items-start gap-4">
              <TrendingUp className="w-10 h-10 flex-shrink-0 text-brand-blue" aria-hidden />
              <div>
                <h3
                  className="text-xl font-bold font-[family-name:var(--font-heading)] mb-3"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Break-even analysis
                </h3>
                <ul className="space-y-2 text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {result.breakEven62vs70 !== null && (
                    <li>
                      <strong>62 vs 70:</strong> If you live past about{' '}
                      <strong>age {result.breakEven62vs70.toFixed(0)}</strong>, claiming at 70 pays more in total than
                      starting at 62.
                    </li>
                  )}
                  {result.breakEvenFraVs70 !== null && (
                    <li>
                      <strong>FRA vs 70:</strong> If you live past about{' '}
                      <strong>age {result.breakEvenFraVs70.toFixed(0)}</strong>, delaying to 70 beats taking your full
                      benefit at FRA.
                    </li>
                  )}
                  {result.bestAt && (
                    <li>
                      <strong>Based on living to {lifeExpectancy}:</strong> claiming at{' '}
                      <strong>{result.bestAt.ageLabel}</strong> gives you the largest total lifetime benefit in this
                      simple comparison.
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div
            className="rounded-xl border p-5"
            style={{ backgroundColor: 'var(--bg-tertiary)', borderColor: 'var(--border-color)' }}
          >
            <div className="flex items-start gap-3">
              <Info className="w-6 h-6 flex-shrink-0 mt-0.5 text-brand-blue" aria-hidden />
              <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                <strong>This is an informational estimator, not financial advice.</strong> It uses SSA&rsquo;s official
                reduction and delayed-credit formulas but does not account for cost-of-living adjustments (COLA),
                taxes, spousal or survivor benefits, Medicare premiums, or working while collecting. For numbers
                personalised to your record, log in at{' '}
                <a
                  href="https://www.ssa.gov/myaccount/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-blue underline"
                >
                  SSA.gov/myaccount
                </a>{' '}
                or speak with a financial advisor.
              </p>
            </div>
          </div>

          <div className="text-base" style={{ color: 'var(--text-secondary)' }}>
            Read next:{' '}
            <Link
              href="/blog/social-security-claim-timing-62-67-70-2026"
              className="text-brand-blue underline font-medium"
            >
              When should you claim Social Security? — 2026 timing guide
            </Link>
            .
          </div>
        </div>
      )}
    </div>
  )
}
