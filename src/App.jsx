import { useEffect, useState } from 'react'
import { ArrowRight, Mail, Phone, CheckCircle2, Rocket, LineChart, Palette, Users } from 'lucide-react'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function Hero() {
  const scrollToForm = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600"></div>
      <div className="relative max-w-7xl mx-auto px-6 py-24 text-white">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-3 py-1 text-sm mb-6">
              <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
              Performance marketing for ambitious brands
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              Grow faster with a revenue-first marketing partner
            </h1>
            <p className="mt-6 text-lg text-white/90 max-w-xl">
              We plan, launch, and scale campaigns that turn attention into predictable revenue across paid social, search, and lifecycle.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <button onClick={scrollToForm} className="inline-flex items-center gap-2 bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:shadow-xl transition">
                Book a strategy call <ArrowRight size={18} />
              </button>
              <a href="#services" className="inline-flex items-center gap-2 border border-white/30 px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition">
                Explore services
              </a>
            </div>
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-6 text-white/80">
              {[
                { label: 'Avg. ROAS', value: '5.2x' },
                { label: 'Ad Spend Managed', value: '$25M+' },
                { label: 'Brands Scaled', value: '120+' },
                { label: 'Avg. CAC Down', value: '34%' }
              ].map((stat) => (
                <div key={stat.label} className="bg-white/10 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-lg border border-white/20">
            <h3 className="text-xl font-semibold mb-4">What we do</h3>
            <ul className="space-y-3">
              {[
                { icon: Rocket, title: 'Paid Social & Search', desc: 'Full-funnel acquisition across Meta, TikTok, Google & YouTube' },
                { icon: LineChart, title: 'CRO & Landing Pages', desc: 'Rapid testing, UX improvements, and conversion lifts' },
                { icon: Palette, title: 'Creative Production', desc: 'UGC, motion graphics, and ad iterations that scale' },
                { icon: Users, title: 'Lifecycle & CRM', desc: 'Email, SMS, and retention programs that compound' }
              ].map(({ icon: Icon, title, desc }) => (
                <li key={title} className="flex items-start gap-3">
                  <div className="p-2 bg-white/10 rounded-lg"><Icon size={20} /></div>
                  <div>
                    <div className="font-semibold">{title}</div>
                    <div className="text-white/80 text-sm">{desc}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[120%] h-48 bg-white/10 blur-3xl rounded-full" />
    </section>
  )
}

function Services() {
  const services = [
    {
      icon: Rocket,
      title: 'Acquisition: Paid Social & Search',
      features: ['Meta, TikTok, YouTube, Google', 'Full-funnel strategy & creative', 'Daily optimization & scaling'],
    },
    {
      icon: Palette,
      title: 'Creative Studio',
      features: ['UGC + motion design', 'Ad iteration frameworks', 'Landing pages & CRO'],
    },
    {
      icon: LineChart,
      title: 'Analytics & CRO',
      features: ['North-star KPI tracking', 'Testing roadmap', 'Attribution & LTV insights'],
    },
    {
      icon: Users,
      title: 'Lifecycle & Retention',
      features: ['Email/SMS flows', 'CRM segmentation', 'Referral & loyalty'],
    }
  ]

  return (
    <section id="services" className="max-w-7xl mx-auto px-6 py-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold">Services that compound growth</h2>
        <p className="text-gray-600 mt-3">Everything you need to acquire, convert, and retain customers.</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map(({ icon: Icon, title, features }) => (
          <div key={title} className="bg-white rounded-xl shadow-sm border p-6">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-lg inline-block mb-4"><Icon /></div>
            <h3 className="font-semibold text-lg">{title}</h3>
            <ul className="mt-4 space-y-2 text-sm text-gray-600">
              {features.map(f => (
                <li key={f} className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-500" /> {f}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}

function CaseStudies() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/case-studies`)
        const data = await res.json()
        setItems(data.items || [])
      } catch (e) {
        setItems([])
      } finally {
        setLoading(false)
      }
    }
    fetchCases()
  }, [])

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold">Proven results</h2>
        <p className="text-gray-600 mt-3">Real outcomes we’ve driven for high-growth brands.</p>
      </div>
      {loading ? (
        <div className="text-center text-gray-500">Loading case studies...</div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {items.length === 0 ? (
            <div className="md:col-span-3 text-center text-gray-500">No case studies yet. Add some via the database.</div>
          ) : (
            items.map(cs => (
              <div key={cs.id} className="bg-white rounded-xl shadow-sm border overflow-hidden">
                {cs.image_url && <img src={cs.image_url} alt={cs.title} className="h-40 w-full object-cover" />}
                <div className="p-6">
                  <div className="text-sm text-gray-500">{cs.industry || '—'}</div>
                  <h3 className="font-semibold text-lg">{cs.title}</h3>
                  <p className="text-gray-600 mt-2 line-clamp-3">{cs.summary}</p>
                  {cs.impact && <div className="mt-3 text-emerald-600 text-sm">{cs.impact}</div>}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </section>
  )
}

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', company: '', website: '', services: [], budget: '', message: '' })
  const [status, setStatus] = useState(null)

  const toggleService = (svc) => {
    setForm(prev => {
      const exists = prev.services.includes(svc)
      return { ...prev, services: exists ? prev.services.filter(s => s !== svc) : [...prev.services, svc] }
    })
  }

  const submit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch(`${BACKEND_URL}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source: 'website' })
      })
      if (!res.ok) throw new Error('Failed')
      setStatus('success')
      setForm({ name: '', email: '', company: '', website: '', services: [], budget: '', message: '' })
    } catch (e) {
      setStatus('error')
    }
  }

  const serviceOptions = ['Paid Social', 'Paid Search', 'Creative', 'CRO', 'Email/SMS']

  return (
    <section id="contact" className="max-w-3xl mx-auto px-6 py-20">
      <div className="bg-white rounded-2xl shadow-sm border p-8">
        <h2 className="text-3xl font-bold">Book a strategy call</h2>
        <p className="text-gray-600 mt-2">Tell us about your growth goals. We’ll come prepared with opportunities.</p>
        <form onSubmit={submit} className="mt-8 space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <input required placeholder="Full name" className="border rounded-lg p-3" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            <input required type="email" placeholder="Email" className="border rounded-lg p-3" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
            <input placeholder="Company" className="border rounded-lg p-3" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} />
            <input placeholder="Website" className="border rounded-lg p-3" value={form.website} onChange={e => setForm({ ...form, website: e.target.value })} />
          </div>

          <div>
            <div className="text-sm font-medium mb-2">What do you need help with?</div>
            <div className="flex flex-wrap gap-2">
              {serviceOptions.map(s => (
                <button type="button" key={s} onClick={() => toggleService(s)} className={`px-3 py-2 rounded-full border text-sm ${form.services.includes(s) ? 'bg-blue-600 text-white border-blue-600' : 'bg-white'}`}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <select className="border rounded-lg p-3" value={form.budget} onChange={e => setForm({ ...form, budget: e.target.value })}>
              <option value="">Monthly budget</option>
              <option>Under $10k</option>
              <option>$10k - $25k</option>
              <option>$25k - $50k</option>
              <option>$50k - $100k</option>
              <option>$100k+</option>
            </select>
            <input placeholder="Phone (optional)" className="border rounded-lg p-3" value={form.phone || ''} onChange={e => setForm({ ...form, phone: e.target.value })} />
          </div>

          <textarea placeholder="Tell us about your goals" className="border rounded-lg p-3 w-full h-28" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />

          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2">
            {status === 'sending' ? 'Sending...' : 'Request proposal'}
            <ArrowRight size={18} />
          </button>

          {status === 'success' && (
            <div className="text-emerald-600 text-sm">Thanks! We’ll be in touch within 24 hours.</div>
          )}
          {status === 'error' && (
            <div className="text-red-600 text-sm">Something went wrong. Please try again.</div>
          )}
        </form>

        <div className="mt-6 grid sm:grid-cols-2 gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-2"><Mail size={16} /> hello@youragency.com</div>
          <div className="flex items-center gap-2"><Phone size={16} /> +1 (555) 123-4567</div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-600">
        <div>© {new Date().getFullYear()} Your Agency. All rights reserved.</div>
        <div className="flex gap-6">
          <a href="#services" className="hover:text-gray-900">Services</a>
          <a href="#contact" className="hover:text-gray-900">Contact</a>
        </div>
      </div>
    </footer>
  )
}

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Hero />
      <Services />
      <CaseStudies />
      <Contact />
      <Footer />
    </div>
  )
}

export default App
