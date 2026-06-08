import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Search, Pencil, Trash2, CheckCircle2, Eye, Sparkles, BookOpen, Layers } from 'lucide-react'
import { researchService } from '../services/researchService'

const STATUS_OPTIONS = ['Researching', 'Understood', 'Deep Dive Needed', 'Completed']
const CATEGORY_OPTIONS = [
  'Cloud',
  'AI',
  'Salesforce',
  'Cyber Security',
  'System Design',
  'Product Engineering',
  'Data Engineering',
  'Startups',
  'Web Development'
]

const INITIAL_FORM = {
  id: '',
  title: '',
  company: '',
  industry: '',
  category: 'Data Engineering',
  problemStatement: '',
  history: '',
  currentSituation: '',
  technologies: '',
  analysis: '',
  keyLearnings: '',
  sourceLinks: '',
  status: 'Researching'
}

const DISCOVERY_STORAGE_KEY = 'techResearchHubDiscovery'

const ResearchHub = () => {
  const navigate = useNavigate()
  const [researchItems, setResearchItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [filterCategory, setFilterCategory] = useState('All')
  const [filterStatus, setFilterStatus] = useState('All')
  const [showForm, setShowForm] = useState(false)
  const [formValues, setFormValues] = useState(INITIAL_FORM)
  const [discoveryText, setDiscoveryText] = useState('')
  const [discoveries, setDiscoveries] = useState(() => {
    if (typeof window === 'undefined') return []
    const saved = localStorage.getItem(DISCOVERY_STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    fetchResearchItems()
  }, [])

  useEffect(() => {
    localStorage.setItem(DISCOVERY_STORAGE_KEY, JSON.stringify(discoveries))
  }, [discoveries])

  const fetchResearchItems = async () => {
    setLoading(true)
    setError('')

    try {
      const topics = await researchService.getResearchTopics()
      setResearchItems(topics)
    } catch (err) {
      console.error('Unable to load research items:', err)
      setError('Unable to load research items. Please make sure the backend is running.')
    } finally {
      setLoading(false)
    }
  }

  const saveResearchItem = async (event) => {
    event.preventDefault()

    if (!formValues.title.trim() || !formValues.company.trim() || !formValues.problemStatement.trim()) {
      return
    }

    const payload = {
      title: formValues.title.trim(),
      company: formValues.company.trim(),
      industry: formValues.industry.trim(),
      category: formValues.category,
      problemStatement: formValues.problemStatement.trim(),
      history: formValues.history.trim(),
      currentSituation: formValues.currentSituation.trim(),
      technologies: formValues.technologies.trim(),
      analysis: formValues.analysis.trim(),
      keyLearnings: formValues.keyLearnings.trim(),
      sourceLinks: formValues.sourceLinks.trim(),
      status: formValues.status,
    }

    try {
      if (formValues.id) {
        const updated = await researchService.updateResearchTopic(formValues.id, payload)
        setResearchItems((prev) => prev.map((item) => item.id === formValues.id ? updated : item))
      } else {
        const created = await researchService.addResearchTopic(payload)
        setResearchItems((prev) => [created, ...prev])
        setSearchQuery('')
        setFilterCategory('All')
        setFilterStatus('All')
      }
      setShowForm(false)
      setFormValues(INITIAL_FORM)
    } catch (err) {
      console.error('Error saving research item:', err)
      setError('Unable to save the research item. Please try again.')
    }
  }

  const editResearchItem = (item) => {
    setFormValues({
      ...item,
      sourceLinks: item.sourceLinks || ''
    })
    setShowForm(true)
  }

  const deleteResearchItem = async (id) => {
    try {
      await researchService.deleteResearchTopic(id)
      setResearchItems((prev) => prev.filter((item) => item.id !== id))
    } catch (err) {
      console.error('Error deleting research topic:', err)
      setError('Unable to delete item. Try again later.')
    }
  }

  const markCompleted = async (item) => {
    try {
      const updated = await researchService.updateResearchTopic(item.id, {
        ...item,
        status: 'Completed'
      })
      setResearchItems((prev) => prev.map((row) => row.id === item.id ? updated : row))
    } catch (err) {
      console.error('Error marking complete:', err)
      setError('Unable to update status.')
    }
  }

  const addDiscovery = () => {
    if (!discoveryText.trim()) return
    const next = {
      id: Date.now().toString(),
      note: discoveryText.trim(),
      createdAt: new Date().toISOString()
    }
    setDiscoveries((prev) => [next, ...prev])
    setDiscoveryText('')
  }

  const filteredResearchItems = useMemo(() => {
    return researchItems.filter((item) => {
      const matchesSearch = [item.title, item.company, item.category].some((value) =>
        value?.toLowerCase().includes(searchQuery.toLowerCase())
      )
      const matchesCategory = filterCategory === 'All' || item.category === filterCategory
      const matchesStatus = filterStatus === 'All' || item.status === filterStatus
      return matchesSearch && matchesCategory && matchesStatus
    })
  }, [researchItems, searchQuery, filterCategory, filterStatus])

  const stats = useMemo(() => {
    return {
      total: researchItems.length,
      companies: new Set(researchItems.map((item) => item.company || 'Unknown')).size,
      open: researchItems.filter((item) => item.status !== 'Completed').length,
      completed: researchItems.filter((item) => item.status === 'Completed').length,
    }
  }, [researchItems])

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#060B18] via-[#0A1223] to-[#111827] text-white px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <header className="rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-indigo-900/20 backdrop-blur-2xl">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm uppercase tracking-[0.3em] text-indigo-300">Research Journal</p>
              <h1 className="mt-3 text-4xl font-semibold text-white">Tech Research Hub</h1>
              <p className="mt-4 text-gray-300">Track real-world engineering problems, company challenges, technology trends, and industry learnings.</p>
            </div>
            <button
              onClick={() => {
                setFormValues(INITIAL_FORM)
                setShowForm(true)
              }}
              className="inline-flex items-center gap-2 rounded-3xl bg-gradient-to-r from-indigo-500 to-purple-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/20 transition hover:brightness-110"
            >
              <Plus className="h-4 w-4" />
              Add Research Topic
            </button>
          </div>

         <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
  {[
    { label: 'Total Research Topics', value: stats.total, icon: BookOpen },
    { label: 'Companies Tracked', value: stats.companies, icon: Layers },
    { label: 'Open Research Items', value: stats.open, icon: Sparkles },
    { label: 'Completed Research Items', value: stats.completed, icon: CheckCircle2 }
  ].map((card) => { const Icon = card.icon; return (
    <div key={card.label} className="rounded-[32px] border border-white/10 bg-slate-950/80 p-6 shadow-xl shadow-indigo-900/10 backdrop-blur-xl">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-gray-400">{card.label}</p>
          <p className="mt-4 text-3xl font-semibold text-white">{card.value}</p>
        </div>
        <div className="rounded-3xl bg-white/10 p-3 text-indigo-200">
            <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  )})} {/* 👈 Added the missing closing parenthesis here */}

          </div>
        </header>

        <section className="grid gap-6 xl:grid-cols-[2fr_1fr]">
          <div className="rounded-[32px] border border-white/10 bg-slate-950/80 p-6 shadow-2xl shadow-indigo-900/10 backdrop-blur-2xl">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-indigo-300">Research Library</p>
                <h2 className="mt-2 text-2xl font-semibold text-white">Explore and manage your research topics</h2>
              </div>
              <div className="grid w-full gap-3 sm:grid-cols-2 lg:w-auto">
                <button
                  onClick={() => {
                    setFormValues(INITIAL_FORM)
                    setShowForm(true)
                  }}
                  className="inline-flex items-center justify-center gap-2 rounded-3xl bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  <Plus className="h-4 w-4" />
                  New Topic
                </button>
              </div>
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-3">
              <div className="relative rounded-3xl bg-white/5 p-3">
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by title, company, or category"
                  className="w-full rounded-3xl border border-white/10 bg-transparent px-12 py-3 text-white outline-none focus:border-indigo-400"
                />
              </div>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
              >
                <option value="All">All Categories</option>
                {CATEGORY_OPTIONS.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
              >
                <option value="All">All Statuses</option>
                {STATUS_OPTIONS.map((status) => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>

            <div className="mt-6 space-y-4">
              {loading ? (
                <div className="rounded-[28px] border border-dashed border-white/10 bg-white/5 p-10 text-center text-gray-300">Loading research topics…</div>
              ) : error ? (
                <div className="rounded-[28px] border border-red-500/30 bg-red-500/10 p-8 text-red-200">{error}</div>
              ) : filteredResearchItems.length === 0 ? (
                <div className="rounded-[28px] border border-white/10 bg-white/5 p-10 text-center text-gray-300">
                  No research entries match your filters. Try clearing the search or filters, or add a new topic.
                </div>
              ) : (
                <div className="grid gap-4 xl:grid-cols-2">
                  {filteredResearchItems.map((item) => (
                    <article key={item.id} className="rounded-[32px] border border-white/10 bg-slate-950/80 p-6 shadow-xl shadow-indigo-900/20 transition hover:-translate-y-1">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-xs uppercase tracking-[0.28em] text-indigo-300">{item.category}</p>
                          <h3 className="mt-3 text-xl font-semibold text-white">{item.title}</h3>
                          <p className="mt-1 text-sm text-gray-400">{item.company} • {item.industry || 'Industry research'}</p>
                        </div>
                        <span className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase ${item.status === 'Completed' ? 'bg-emerald-500/20 text-emerald-300' : item.status === 'Understood' ? 'bg-sky-500/20 text-sky-300' : item.status === 'Deep Dive Needed' ? 'bg-violet-500/20 text-violet-300' : 'bg-rose-500/20 text-rose-300'}`}>{item.status}</span>
                      </div>

                      <p className="mt-5 text-gray-300 line-clamp-4">{item.problemStatement}</p>
                      <div className="mt-4 flex flex-wrap gap-2 text-xs text-gray-400">
                        <span className="rounded-2xl bg-white/5 px-3 py-1">{item.technologies}</span>
                      </div>

                      <div className="mt-6 flex flex-wrap gap-3">
                        <button onClick={() => navigate(`/research/${item.id}`)} className="inline-flex items-center gap-2 rounded-3xl bg-white/10 px-4 py-2 text-sm text-white transition hover:bg-white/15">
                          <Eye className="h-4 w-4" />
                          View
                        </button>
                        <button onClick={() => editResearchItem(item)} className="inline-flex items-center gap-2 rounded-3xl border border-white/10 px-4 py-2 text-sm text-white transition hover:border-indigo-400">
                          <Pencil className="h-4 w-4" />
                          Edit
                        </button>
                        <button onClick={() => deleteResearchItem(item.id)} className="inline-flex items-center gap-2 rounded-3xl bg-rose-500/15 px-4 py-2 text-sm text-rose-200 transition hover:bg-rose-500/20">
                          <Trash2 className="h-4 w-4" />
                          Delete
                        </button>
                        {item.status !== 'Completed' && (
                          <button onClick={() => markCompleted(item)} className="inline-flex items-center gap-2 rounded-3xl bg-emerald-500/10 px-4 py-2 text-sm text-emerald-300 transition hover:bg-emerald-500/20">
                            <CheckCircle2 className="h-4 w-4" />
                            Mark Completed
                          </button>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </div>

          <aside className="space-y-4">
            <div className="rounded-[32px] border border-white/10 bg-slate-950/80 p-6 shadow-2xl shadow-indigo-900/10 backdrop-blur-2xl">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-gray-400">Today's Discovery</p>
                  <h3 className="mt-2 text-2xl font-semibold text-white">Capture a quick insight</h3>
                </div>
                <Sparkles className="h-10 w-10 text-indigo-300" />
              </div>

              <textarea
                value={discoveryText}
                onChange={(e) => setDiscoveryText(e.target.value)}
                rows={5}
                placeholder="New concept learned, company challenge, trend, or interview insight..."
                className="mt-5 w-full rounded-3xl border border-white/10 bg-white/5 px-4 py-4 text-white outline-none focus:border-indigo-400"
              />
              <button onClick={addDiscovery} className="mt-4 w-full rounded-3xl bg-gradient-to-r from-indigo-500 to-purple-500 px-4 py-3 text-sm font-semibold text-white transition hover:brightness-110">
                Save Discovery
              </button>

              {discoveries.length > 0 && (
                <div className="mt-6 space-y-3">
                  {discoveries.slice(0, 4).map((item) => (
                    <div key={item.id} className="rounded-3xl bg-white/5 p-4 text-sm text-gray-200">
                      <p>{item.note}</p>
                      <p className="mt-2 text-xs text-gray-500">{new Date(item.createdAt).toLocaleDateString()}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-indigo-900/10 backdrop-blur-2xl">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-gray-400">Research Flow</p>
                  <h3 className="mt-2 text-2xl font-semibold text-white">Journal setup</h3>
                </div>
                <div className="rounded-3xl bg-indigo-500/10 px-4 py-3 text-indigo-200">Pro</div>
              </div>
              <div className="mt-6 space-y-4 text-sm text-gray-300">
                <p>Capture problem statements, company stories, and technology signal clearly.</p>
                <p>Use the detail view to preserve insights and track progress over time.</p>
                <p className="font-semibold text-white">This page is designed for industry research rather than hiring workflows.</p>
              </div>
            </div>
          </aside>
        </section>

        {showForm && (
          <section className="rounded-[32px] border border-white/10 bg-slate-950/90 p-6 shadow-2xl shadow-indigo-900/10 backdrop-blur-2xl">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-indigo-300">Research Entry</p>
                <h2 className="mt-2 text-2xl font-semibold text-white">{formValues.id ? 'Edit Research Topic' : 'Add Research Topic'}</h2>
              </div>
              <button onClick={() => { setShowForm(false); setFormValues(INITIAL_FORM) }} className="rounded-3xl border border-white/10 px-4 py-2 text-sm text-gray-300 transition hover:border-red-400">Cancel</button>
            </div>
            <form onSubmit={saveResearchItem} className="mt-6 space-y-6">
              <div className="grid gap-4 lg:grid-cols-2">
                <label className="space-y-2 text-sm text-gray-300">
                  Title
                  <input
                    value={formValues.title}
                    onChange={(e) => setFormValues((prev) => ({ ...prev, title: e.target.value }))}
                    className="w-full rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-indigo-400"
                    required
                  />
                </label>
                <label className="space-y-2 text-sm text-gray-300">
                  Company
                  <input
                    value={formValues.company}
                    onChange={(e) => setFormValues((prev) => ({ ...prev, company: e.target.value }))}
                    className="w-full rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-indigo-400"
                    required
                  />
                </label>
              </div>

              <div className="grid gap-4 lg:grid-cols-3">
                <label className="space-y-2 text-sm text-gray-300">
                  Industry
                  <input
                    value={formValues.industry}
                    onChange={(e) => setFormValues((prev) => ({ ...prev, industry: e.target.value }))}
                    className="w-full rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-indigo-400"
                  />
                </label>
                <label className="space-y-2 text-sm text-gray-300">
                  Category
                  <select
                    value={formValues.category}
                    onChange={(e) => setFormValues((prev) => ({ ...prev, category: e.target.value }))}
                    className="w-full rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
                  >
                    {CATEGORY_OPTIONS.map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </label>
                <label className="space-y-2 text-sm text-gray-300">
                  Status
                  <select
                    value={formValues.status}
                    onChange={(e) => setFormValues((prev) => ({ ...prev, status: e.target.value }))}
                    className="w-full rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
                  >
                    {STATUS_OPTIONS.map((status) => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="grid gap-4 lg:grid-cols-2">
                <label className="space-y-2 text-sm text-gray-300">
                  Problem Statement
                  <textarea
                    value={formValues.problemStatement}
                    onChange={(e) => setFormValues((prev) => ({ ...prev, problemStatement: e.target.value }))}
                    rows={4}
                    className="w-full rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-indigo-400"
                    required
                  />
                </label>
                <label className="space-y-2 text-sm text-gray-300">
                  History / Background
                  <textarea
                    value={formValues.history}
                    onChange={(e) => setFormValues((prev) => ({ ...prev, history: e.target.value }))}
                    rows={4}
                    className="w-full rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-indigo-400"
                  />
                </label>
              </div>

              <div className="grid gap-4 lg:grid-cols-2">
                <label className="space-y-2 text-sm text-gray-300">
                  Current Situation
                  <textarea
                    value={formValues.currentSituation}
                    onChange={(e) => setFormValues((prev) => ({ ...prev, currentSituation: e.target.value }))}
                    rows={4}
                    className="w-full rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-indigo-400"
                  />
                </label>
                <label className="space-y-2 text-sm text-gray-300">
                  Technologies Used
                  <input
                    value={formValues.technologies}
                    onChange={(e) => setFormValues((prev) => ({ ...prev, technologies: e.target.value }))}
                    placeholder="Comma-separated"
                    className="w-full rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-indigo-400"
                  />
                </label>
              </div>

              <div className="grid gap-4 lg:grid-cols-2">
                <label className="space-y-2 text-sm text-gray-300">
                  My Analysis
                  <textarea
                    value={formValues.analysis}
                    onChange={(e) => setFormValues((prev) => ({ ...prev, analysis: e.target.value }))}
                    rows={4}
                    className="w-full rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-indigo-400"
                  />
                </label>
                <label className="space-y-2 text-sm text-gray-300">
                  Key Learnings
                  <textarea
                    value={formValues.keyLearnings}
                    onChange={(e) => setFormValues((prev) => ({ ...prev, keyLearnings: e.target.value }))}
                    rows={4}
                    className="w-full rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-indigo-400"
                  />
                </label>
              </div>

              <label className="space-y-2 text-sm text-gray-300">
                Source Links
                <textarea
                  value={formValues.sourceLinks}
                  onChange={(e) => setFormValues((prev) => ({ ...prev, sourceLinks: e.target.value }))}
                  rows={3}
                  placeholder="One URL per line or comma-separated"
                  className="w-full rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-indigo-400"
                />
              </label>

              <div className="flex flex-wrap gap-3">
                <button type="submit" className="rounded-3xl bg-gradient-to-r from-indigo-500 to-purple-500 px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110">Save Topic</button>
                <button type="button" onClick={() => { setShowForm(false); setFormValues(INITIAL_FORM) }} className="rounded-3xl border border-white/10 px-6 py-3 text-sm font-semibold text-gray-300 transition hover:border-red-400">Cancel</button>
              </div>
            </form>
          </section>
        )}
      </div>
    </div>
  )
}

export default ResearchHub
