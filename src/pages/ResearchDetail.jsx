import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Pencil, Trash2, CheckCircle2 } from 'lucide-react'
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

const ResearchDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [topic, setTopic] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showEdit, setShowEdit] = useState(false)
  const [formValues, setFormValues] = useState(null)

  useEffect(() => {
    fetchTopic()
  }, [id])

  const fetchTopic = async () => {
    setLoading(true)
    setError('')

    try {
      const data = await researchService.getResearchTopicById(id)
      setTopic(data)
      setFormValues({
        ...data,
        sourceLinks: data.sourceLinks || ''
      })
    } catch (err) {
      console.error('Unable to fetch topic:', err)
      setError('Unable to load research details. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    try {
      await researchService.deleteResearchTopic(id)
      navigate('/research')
    } catch (err) {
      console.error('Unable to delete research topic:', err)
      setError('Unable to delete topic. Try again later.')
    }
  }

  const handleMarkCompleted = async () => {
    try {
      const updated = await researchService.updateResearchTopic(id, {
        ...topic,
        status: 'Completed'
      })
      setTopic(updated)
    } catch (err) {
      console.error('Unable to mark completed:', err)
      setError('Unable to update topic status.')
    }
  }

  const saveUpdates = async (event) => {
    event.preventDefault()
    if (!formValues.title || !formValues.company || !formValues.problemStatement) {
      return
    }

    try {
      const updated = await researchService.updateResearchTopic(id, {
        ...formValues,
        sourceLinks: formValues.sourceLinks || ''
      })
      setTopic(updated)
      setShowEdit(false)
    } catch (err) {
      console.error('Unable to save updates:', err)
      setError('Unable to save changes. Please try again.')
    }
  }

  const formatSourceLinks = (text) => {
    return text
      ? text.split(/[,\n]+/).map((link) => link.trim()).filter(Boolean)
      : []
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#060B18] via-[#0A1223] to-[#111827] text-white px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition hover:border-indigo-400"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Research Hub
          </button>
          <div className="flex flex-wrap gap-3">
            <button onClick={() => setShowEdit(true)} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition hover:border-indigo-400">
              <Pencil className="h-4 w-4" />
              Edit
            </button>
            <button onClick={handleDelete} className="inline-flex items-center gap-2 rounded-full bg-rose-500/15 px-4 py-2 text-sm text-rose-200 transition hover:bg-rose-500/20">
              <Trash2 className="h-4 w-4" />
              Delete
            </button>
            {topic?.status !== 'Completed' && (
              <button onClick={handleMarkCompleted} className="inline-flex items-center gap-2 rounded-full bg-emerald-500/15 px-4 py-2 text-sm text-emerald-200 transition hover:bg-emerald-500/20">
                <CheckCircle2 className="h-4 w-4" />
                Mark Completed
              </button>
            )}
          </div>
        </div>

        <div className="rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-indigo-900/10 backdrop-blur-2xl">
          {loading ? (
            <p className="text-gray-300">Loading research details…</p>
          ) : error ? (
            <div className="rounded-3xl bg-rose-500/10 p-6 text-rose-100">{error}</div>
          ) : topic ? (
            <div className="space-y-8">
              <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-indigo-300">Research Hub</p>
                  <h1 className="mt-3 text-4xl font-semibold text-white">{topic.title}</h1>
                  <p className="mt-4 text-gray-300">{topic.company} • {topic.industry || 'Industry research'}</p>
                </div>
                <div className="rounded-[32px] border border-white/10 bg-slate-950/90 p-6">
                  <p className="text-sm uppercase tracking-[0.24em] text-gray-400">Status</p>
                  <p className="mt-3 rounded-full bg-white/5 px-4 py-2 text-sm font-semibold text-white">{topic.status}</p>
                  <div className="mt-6 space-y-3 text-sm text-gray-300">
                    <p><span className="font-semibold text-white">Category:</span> {topic.category}</p>
                    <p><span className="font-semibold text-white">Updated:</span> {new Date(topic.updatedAt || topic.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                <section className="space-y-4 rounded-[32px] border border-white/10 bg-slate-950/80 p-6">
                  <h2 className="text-xl font-semibold text-white">Problem Statement</h2>
                  <p className="text-gray-300 whitespace-pre-line">{topic.problemStatement}</p>
                </section>
                <section className="space-y-4 rounded-[32px] border border-white/10 bg-slate-950/80 p-6">
                  <h2 className="text-xl font-semibold text-white">Current Situation</h2>
                  <p className="text-gray-300 whitespace-pre-line">{topic.currentSituation || 'No current situation details yet.'}</p>
                </section>
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                <section className="space-y-4 rounded-[32px] border border-white/10 bg-slate-950/80 p-6">
                  <h2 className="text-xl font-semibold text-white">History / Background</h2>
                  <p className="text-gray-300 whitespace-pre-line">{topic.history || 'Background details are not available.'}</p>
                </section>
                <section className="space-y-4 rounded-[32px] border border-white/10 bg-slate-950/80 p-6">
                  <h2 className="text-xl font-semibold text-white">Technologies Used</h2>
                  <p className="text-gray-300 whitespace-pre-line">{topic.technologies || 'No technology details added yet.'}</p>
                </section>
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                <section className="space-y-4 rounded-[32px] border border-white/10 bg-slate-950/80 p-6">
                  <h2 className="text-xl font-semibold text-white">My Analysis</h2>
                  <p className="text-gray-300 whitespace-pre-line">{topic.analysis || 'Add your own perspective on this engineering problem.'}</p>
                </section>
                <section className="space-y-4 rounded-[32px] border border-white/10 bg-slate-950/80 p-6">
                  <h2 className="text-xl font-semibold text-white">Key Learnings</h2>
                  <p className="text-gray-300 whitespace-pre-line">{topic.keyLearnings || 'Capture the main takeaways from this research.'}</p>
                </section>
              </div>

              <section className="space-y-4 rounded-[32px] border border-white/10 bg-slate-950/80 p-6">
                <h2 className="text-xl font-semibold text-white">References</h2>
                {formatSourceLinks(topic.sourceLinks).length ? (
                  <ul className="space-y-3">
                    {formatSourceLinks(topic.sourceLinks).map((link, index) => (
                      <li key={index}>
                        <a href={link} target="_blank" rel="noreferrer" className="text-indigo-300 transition hover:text-indigo-100">{link}</a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-400">No source links added.</p>
                )}
              </section>
            </div>
          ) : (
            <p className="text-gray-300">No research topic found.</p>
          )}
        </div>

        {showEdit && topic && (
          <div className="rounded-[32px] border border-white/10 bg-slate-950/90 p-6 shadow-2xl shadow-indigo-900/10 backdrop-blur-2xl">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-indigo-300">Edit Research Topic</p>
                <h2 className="mt-2 text-2xl font-semibold text-white">Update entry details</h2>
              </div>
              <button onClick={() => setShowEdit(false)} className="rounded-3xl border border-white/10 px-4 py-2 text-sm text-gray-300 transition hover:border-indigo-400">Close editor</button>
            </div>
            <form onSubmit={saveUpdates} className="mt-6 space-y-6">
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
                  Current Situation
                  <textarea
                    value={formValues.currentSituation}
                    onChange={(e) => setFormValues((prev) => ({ ...prev, currentSituation: e.target.value }))}
                    rows={4}
                    className="w-full rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-indigo-400"
                  />
                </label>
              </div>
              <div className="grid gap-4 lg:grid-cols-2">
                <label className="space-y-2 text-sm text-gray-300">
                  History / Background
                  <textarea
                    value={formValues.history}
                    onChange={(e) => setFormValues((prev) => ({ ...prev, history: e.target.value }))}
                    rows={4}
                    className="w-full rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-indigo-400"
                  />
                </label>
                <label className="space-y-2 text-sm text-gray-300">
                  Technologies Used
                  <input
                    value={formValues.technologies}
                    onChange={(e) => setFormValues((prev) => ({ ...prev, technologies: e.target.value }))}
                    className="w-full rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-indigo-400"
                  />
                </label>
              </div>
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
              <label className="space-y-2 text-sm text-gray-300">
                Source Links
                <textarea
                  value={formValues.sourceLinks}
                  onChange={(e) => setFormValues((prev) => ({ ...prev, sourceLinks: e.target.value }))}
                  rows={3}
                  className="w-full rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-indigo-400"
                />
              </label>
              <button type="submit" className="rounded-3xl bg-gradient-to-r from-indigo-500 to-purple-500 px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110">Save Changes</button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}

export default ResearchDetail
