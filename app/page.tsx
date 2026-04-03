import Link from 'next/link'
import Image from 'next/image'
import { getAllPostsMeta, getFeaturedPost, getPostsByCategory } from '@/lib/mdx'
import { CATEGORIES, formatDate } from '@/lib/utils'
import { breadcrumbJsonLd } from '@/lib/seo'
import { SITE_URL } from '@/lib/utils'
import ArticleCard from '@/components/ArticleCard'
import { BookOpen, Star, Shield, Lightbulb, Smartphone, ChevronRight, CheckCircle, Clock, Heart, ArrowRight, FileText, Wifi, MapPin, Gift, DollarSign, HelpCircle, Phone, Search } from 'lucide-react'

export const revalidate = 3600

const CATEGORY_ICONS: Record<string, typeof BookOpen> = {
  'how-to-guides': BookOpen,
  'product-reviews': Star,
  'safety-security': Shield,
  'explainers': Lightbulb,
  'apps-services': Smartphone,
}

export default function HomePage() {
  const posts = getAllPostsMeta()
  const featured = getFeaturedPost()
  const recent = posts.slice(0, 9)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([{ name: 'Home', url: SITE_URL }])
          ),
        }}
      />

      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-blue via-blue-700 to-blue-900 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-300 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24 lg:py-28">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-sm text-blue-100 mb-6 backdrop-blur-sm">
              <CheckCircle className="w-4 h-4" />
              100% Free Guides — No Jargon
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-heading)] leading-[1.1] mb-6">
              Technology Made{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-emerald-200">
                Simple
              </span>
              <br />for Over 60s
            </h1>
            <p className="text-lg sm:text-xl text-blue-100 max-w-xl mb-8 leading-relaxed">
              Clear, step-by-step guides to help you master your phone, tablet, and everyday tech.
              No jargon. No rush. Just simple help.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 no-underline">
              <Link
                href="/blog"
                className="inline-flex items-center justify-center gap-2 bg-white text-brand-blue font-semibold px-7 py-3.5 rounded-xl text-lg hover:bg-blue-50 transition-all shadow-lg shadow-black/10 no-underline"
              >
                Browse All Guides
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/category/how-to-guides"
                className="inline-flex items-center justify-center gap-2 border-2 border-white/30 text-white font-semibold px-7 py-3.5 rounded-xl text-lg hover:bg-white/10 transition-all no-underline backdrop-blur-sm"
              >
                Start Learning
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Featured Article ─── */}
      {featured && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 -mt-8 relative z-10">
          <Link href={`/blog/${featured.slug}`} className="group block no-underline">
            <div className="card overflow-hidden sm:flex">
              {featured.thumbnail && (
                <div className="relative w-full sm:w-80 h-52 sm:h-auto shrink-0">
                  <Image
                    src={featured.thumbnail}
                    alt={featured.thumbnailAlt ?? featured.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 320px"
                    className="object-cover"
                    priority
                  />
                  <div className="absolute top-3 left-3">
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-brand-green text-white shadow-sm">
                      Featured Guide
                    </span>
                  </div>
                </div>
              )}
              <div className="p-6 sm:p-8 flex flex-col justify-center">
                <h2 className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-heading)] text-[var(--text-primary)] mb-3 group-hover:text-brand-blue transition-colors leading-snug">
                  {featured.title}
                </h2>
                <p className="text-[var(--text-secondary)] mb-4 line-clamp-2">
                  {featured.excerpt}
                </p>
                <div className="flex items-center gap-4 text-sm text-[var(--text-muted)]">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {featured.readingTime}
                  </span>
                  {featured.difficulty && (
                    <span className="px-2 py-0.5 rounded-full bg-blue-50 text-brand-blue text-xs font-medium dark:bg-blue-900/30">
                      {featured.difficulty}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* ─── Categories ─── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-heading)] text-[var(--text-primary)] mb-3">
            What Would You Like to Learn?
          </h2>
          <p className="text-[var(--text-secondary)] max-w-lg mx-auto">
            Choose a topic and start exploring. Every guide is written in plain, simple English.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 no-underline">
          {CATEGORIES.map((cat) => {
            const Icon = CATEGORY_ICONS[cat.slug] ?? BookOpen
            const count = getPostsByCategory(cat.slug).length
            return (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="group card p-5 flex items-start gap-4 hover:border-brand-blue/30 no-underline transition-all"
              >
                <div className={`w-11 h-11 rounded-xl ${cat.color} text-white flex items-center justify-center shrink-0`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-[var(--text-primary)] group-hover:text-brand-blue transition-colors">
                      {cat.label}
                    </h3>
                    <ChevronRight className="w-4 h-4 text-[var(--text-muted)] group-hover:text-brand-blue transition-all group-hover:translate-x-0.5" />
                  </div>
                  <p className="text-[var(--text-secondary)] text-sm line-clamp-2">{cat.description}</p>
                  {count > 0 && (
                    <span className="text-xs text-[var(--text-muted)] mt-2 inline-block">
                      {count} {count === 1 ? 'guide' : 'guides'}
                    </span>
                  )}
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* ─── Free Tools ─── */}
      <section className="bg-[var(--bg-tertiary)] py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-heading)] text-[var(--text-primary)] mb-3">
              Free Interactive Tools
            </h2>
            <p className="text-[var(--text-secondary)] max-w-lg mx-auto">
              Quizzes, cheat sheets, and local resources to help you get the most from technology.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 no-underline">
            {[
              {
                href: '/tools/device-quiz',
                icon: Smartphone,
                color: 'bg-blue-100 text-brand-blue dark:bg-blue-900/30',
                title: 'Which Device Is Right for You?',
                desc: 'Take our 5-question quiz to find the perfect phone or tablet.',
              },
              {
                href: '/tools/iphone-cheat-sheet',
                icon: FileText,
                color: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30',
                title: 'iPhone Cheat Sheet',
                desc: 'Print a one-page reference for the most common iPhone tasks.',
              },
              {
                href: '/tools/android-cheat-sheet',
                icon: FileText,
                color: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30',
                title: 'Android Cheat Sheet',
                desc: 'Print a one-page reference for Android phone basics.',
              },
              {
                href: '/tools/internet-by-state',
                icon: Wifi,
                color: 'bg-amber-100 text-amber-600 dark:bg-amber-900/30',
                title: 'Internet Plans by State',
                desc: 'Compare providers and senior discounts in all 50 states.',
              },
              {
                href: '/tools/tech-classes',
                icon: MapPin,
                color: 'bg-red-100 text-red-600 dark:bg-red-900/30',
                title: 'Free Tech Classes Near You',
                desc: 'Find local computer classes in 30 US and UK cities.',
              },
            ].map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group card p-5 flex items-start gap-4 hover:border-brand-blue/30 no-underline transition-all"
              >
                <div className={`w-11 h-11 rounded-xl ${tool.color} flex items-center justify-center shrink-0`}>
                  <tool.icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-[var(--text-primary)] group-hover:text-brand-blue transition-colors">
                      {tool.title}
                    </h3>
                    <ChevronRight className="w-4 h-4 text-[var(--text-muted)] group-hover:text-brand-blue transition-all group-hover:translate-x-0.5" />
                  </div>
                  <p className="text-[var(--text-secondary)] text-sm line-clamp-2">{tool.desc}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/tools"
              className="text-brand-blue font-medium text-sm inline-flex items-center gap-1 hover:gap-2 transition-all no-underline"
            >
              View all tools <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Explore More ─── */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-heading)] text-[var(--text-primary)] mb-3">
              Explore More Resources
            </h2>
            <p className="text-[var(--text-secondary)] max-w-lg mx-auto">
              Tools, directories, and guides to save money and get help with technology.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 no-underline">
            {[
              {
                href: '/compare',
                icon: Search,
                color: 'bg-blue-100 text-brand-blue dark:bg-blue-900/30',
                title: 'Compare Phones',
                desc: 'Side-by-side phone comparisons with senior-friendly ratings.',
              },
              {
                href: '/phone-plans',
                icon: Phone,
                color: 'bg-green-100 text-green-600 dark:bg-green-900/30',
                title: 'Phone Plan Comparator',
                desc: 'Compare carriers with senior discounts and AARP pricing.',
              },
              {
                href: '/senior-discounts',
                icon: DollarSign,
                color: 'bg-amber-100 text-amber-600 dark:bg-amber-900/30',
                title: '150+ Senior Discounts',
                desc: 'A complete directory of discounts you may not know about.',
              },
              {
                href: '/gifts',
                icon: Gift,
                color: 'bg-pink-100 text-pink-600 dark:bg-pink-900/30',
                title: 'Tech Gift Finder',
                desc: 'Find the perfect tech gift by occasion, budget, or interest.',
              },
              {
                href: '/error-lookup',
                icon: HelpCircle,
                color: 'bg-red-100 text-red-600 dark:bg-red-900/30',
                title: 'Error Message Lookup',
                desc: 'See a confusing error? We explain it in plain English.',
              },
              {
                href: '/app-guides',
                icon: Smartphone,
                color: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30',
                title: 'App Guides',
                desc: 'Step-by-step guides for WhatsApp, Zoom, Facebook, and more.',
              },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group card p-5 flex items-start gap-4 hover:border-brand-blue/30 no-underline transition-all"
              >
                <div className={`w-11 h-11 rounded-xl ${item.color} flex items-center justify-center shrink-0`}>
                  <item.icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-[var(--text-primary)] group-hover:text-brand-blue transition-colors">
                      {item.title}
                    </h3>
                    <ChevronRight className="w-4 h-4 text-[var(--text-muted)] group-hover:text-brand-blue transition-all group-hover:translate-x-0.5" />
                  </div>
                  <p className="text-[var(--text-secondary)] text-sm line-clamp-2">{item.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Latest Guides ─── */}
      <section className="bg-[var(--bg-tertiary)] py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-heading)] text-[var(--text-primary)]">
              Latest Guides
            </h2>
            <Link
              href="/blog"
              className="text-brand-blue font-medium text-sm flex items-center gap-1 hover:gap-2 transition-all no-underline"
            >
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          {recent.length === 0 ? (
            <p className="text-[var(--text-secondary)] text-lg">
              New guides coming soon! Check back shortly.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {recent.map((post, i) => (
                <ArticleCard key={post.slug} post={post} variant="grid" index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ─── Newsletter ─── */}
      <section className="py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <div className="card p-8 sm:p-12">
            <div className="w-14 h-14 rounded-2xl bg-brand-blue/10 text-brand-blue flex items-center justify-center mx-auto mb-5">
              <Heart className="w-7 h-7" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-heading)] text-[var(--text-primary)] mb-3">
              Get Tech Tips in Your Inbox
            </h2>
            <p className="text-[var(--text-secondary)] mb-6">
              One simple guide per week. No spam. No jargon. Unsubscribe anytime.
            </p>
            <form
              action="#"
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-3 rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue text-base"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-brand-blue text-white font-semibold rounded-xl hover:bg-blue-800 transition-colors text-base whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
            <p className="text-xs text-[var(--text-muted)] mt-4">
              We respect your privacy. Read our{' '}
              <Link href="/privacy-policy" className="underline hover:text-brand-blue">
                privacy policy
              </Link>.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Testimonials ─── */}
      <section className="bg-[var(--bg-tertiary)] py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-heading)] text-[var(--text-primary)] text-center mb-10">
            What Our Readers Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                quote: "I finally learned how to video call my grandchildren. The step-by-step instructions were so clear, I did it on my first try!",
                name: "Margaret T.",
                location: "Bristol, UK",
              },
              {
                quote: "I was always afraid of doing something wrong on my tablet. TechFor60s made me feel confident. I actually enjoy using it now.",
                name: "Robert K.",
                location: "Ohio, USA",
              },
              {
                quote: "My daughter used to help me with everything on my phone. Now I can do most things myself thanks to these guides.",
                name: "Patricia M.",
                location: "London, UK",
              },
            ].map((testimonial) => (
              <div key={testimonial.name} className="card p-6">
                <div className="text-brand-blue text-4xl font-serif leading-none mb-3">&ldquo;</div>
                <p className="text-[var(--text-secondary)] mb-4 italic leading-relaxed">
                  {testimonial.quote}
                </p>
                <div>
                  <p className="font-semibold text-[var(--text-primary)] text-sm">{testimonial.name}</p>
                  <p className="text-[var(--text-muted)] text-xs">{testimonial.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Trust / Value Props ─── */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-heading)] text-[var(--text-primary)] text-center mb-10">
            Why TechFor60s?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              {
                icon: BookOpen,
                color: 'bg-blue-100 text-brand-blue dark:bg-blue-900/30',
                title: 'No Jargon',
                desc: 'Every guide is written in plain English. We explain every step clearly, with no confusing tech speak.',
              },
              {
                icon: Clock,
                color: 'bg-emerald-100 text-brand-green dark:bg-emerald-900/30',
                title: 'Your Own Pace',
                desc: 'No rush, no pressure. Read, re-read, and follow along step by step. Take as long as you need.',
              },
              {
                icon: Shield,
                color: 'bg-red-100 text-red-600 dark:bg-red-900/30',
                title: 'Stay Safe Online',
                desc: 'Learn to spot scams, protect your passwords, and use the internet safely and confidently.',
              },
            ].map((item) => (
              <div key={item.title} className="text-center">
                <div className={`w-14 h-14 rounded-2xl ${item.color} flex items-center justify-center mx-auto mb-4`}>
                  <item.icon className="w-7 h-7" />
                </div>
                <h3 className="font-semibold text-lg text-[var(--text-primary)] mb-2">{item.title}</h3>
                <p className="text-[var(--text-secondary)] text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
