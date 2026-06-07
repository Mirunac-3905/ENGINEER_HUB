import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { learningService } from '../services/learningService'

const LearningTopicMistakes = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [mistakes, setMistakes] = useState([])
  const [form, setForm] = useState({ id: '', title: '', description: '', solution: '', dateAdded: new Date().toISOString().slice(0, 10) })
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchMistakes()
  }, [id])

  const fetchMistakes = async () => {
    try {
      setLoading(true)
      const data = await learningService.getMistakes(id)
      setMistakes(data)
    } catch (err) {
      console.error('Error fetching mistakes:', err)
    } finally {
      setLoading(false)
    }
  }

  const saveMistake = async (event) => {
    event.preventDefault()
    if (!form.title.trim() || !form.description.trim()) return

    try {
      if (isEditing && form.id) {
        const updated = await learningService.updateMistake(form.id, {
          title: form.title,
          description: form.description,
          solution: form.solution,
          dateAdded: form.dateAdded
        })
        setMistakes((prev) => prev.map((item) => (item.id === form.id ? updated : item)))
      } else {
        const newMistake = await learningService.addMistake(id, {
          title: form.title,
          description: form.description,
          solution: form.solution,
          dateAdded: form.dateAdded
        })
        setMistakes((prev) => [newMistake, ...prev])
      }
      setForm({ id: '', title: '', description: '', solution: '', dateAdded: new Date().toISOString().slice(0, 10) })
      setIsEditing(false)
    } catch (err) {
      console.error('Error saving mistake:', err)
    }
  }

  const handleEdit = (item) => {
    setForm(item)
    setIsEditing(true)
  }

  const handleDelete = async (itemId) => {
    if (!window.confirm('Are you sure you want to delete this mistake log?')) return
    try {
      await learningService.deleteMistake(itemId)
      setMistakes((prev) => prev.filter((item) => item.id !== itemId))
    } catch (err) {
      console.error('Error deleting mistake:', err)
    }
  }

  const handleClear = () => {
    setIsEditing(false)
    setForm({ id: '', title: '', description: '', solution: '', dateAdded: new Date().toISOString().slice(0, 10) })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#060B18] via-[#0B1220] to-[#111827] px-4 py-6 sm:px-6 lg:px-8 text-white">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-indigo-900/10 backdrop-blur-2xl">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-indigo-300">Frequent Mistakes</p>
            <h1 className="mt-2 text-3xl font-semibold text-white">Track Mistakes for Topic ID: {id}</h1>
            <p className="mt-2 text-gray-300">Document repeated problems, solutions, and improvements for interview readiness.</p>
          </div>
          <button onClick={() => navigate('/learning')} className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm text-white transition hover:bg-white/10">Back to Dashboard</button>
        </div>

        {loading ? (
          <div className="rounded-[32px] border border-white/10 bg-slate-950/80 p-6 text-center text-gray-300">Loading mistakes...</div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
            <div className="rounded-[32px] border border-white/10 bg-slate-950/80 p-6 shadow-xl">
              <h2 className="text-xl font-semibold text-white">Mistake Log</h2>
              <p className="mt-2 text-sm text-gray-400">Review your most important mistakes and how to avoid them.</p>
              <div className="mt-6 space-y-4">
                {mistakes.length > 0 ? (
                  mistakes.map((item) => (
                    <div key={item.id} className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow hover:border-indigo-500/30 transition">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                          <p className="mt-2 text-sm text-gray-300">{item.description}</p>
                          <p className="mt-3 text-sm text-gray-400">Solution: {item.solution}</p>
                          <p className="mt-2 text-xs text-gray-500">Added on {item.dateAdded || new Date(item.createdAt).toLocaleDateString()}</p>
                        </div>
                        <div className="flex gap-2 flex-shrink-0">
                          <button onClick={() => handleEdit(item)} className="rounded-2xl bg-indigo-500 px-3 py-2 text-xs font-semibold text-white transition hover:bg-indigo-400">Edit</button>
                          <button onClick={() => handleDelete(item.id)} className="rounded-2xl bg-red-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-red-500">Delete</button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="rounded-3xl border border-dashed border-white/20 bg-white/5 p-6 text-center text-gray-400">No mistakes logged yet. Add one to track progress!</div>
                )}
              </div>
            </div>

            <div className="rounded-[32px] border border-white/10 bg-slate-950/80 p-6 shadow-xl">
              <h2 className="text-xl font-semibold text-white">{isEditing ? 'Edit Mistake' : 'Add Mistake'}</h2>
              <form onSubmit={saveMistake} className="mt-5 space-y-4">
                <label className="block text-sm text-gray-300">
                  Mistake Title
                  <input value={form.title} onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))} placeholder="Brief title of the mistake" className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none" />
                </label>
                <label className="block text-sm text-gray-300">
                  Description
                  <textarea value={form.description} onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))} placeholder="Describe what went wrong" rows={4} className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none" />
                </label>
                <label className="block text-sm text-gray-300">
                  Solution
                  <textarea value={form.solution} onChange={(e) => setForm((prev) => ({ ...prev, solution: e.target.value }))} placeholder="How to fix or prevent it" rows={4} className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none" />
                </label>
                <label className="block text-sm text-gray-300">
                  Date Added
                  <input type="date" value={form.dateAdded} onChange={(e) => setForm((prev) => ({ ...prev, dateAdded: e.target.value }))} className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none" />
                </label>
                <div className="flex flex-wrap gap-3">
                  <button type="submit" className="rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 px-5 py-3 text-sm font-semibold text-white">
                    {isEditing ? 'Update Mistake' : 'Save Mistake'}
                  </button>
                  <button type="button" onClick={handleClear} className="rounded-2xl border border-white/10 px-5 py-3 text-sm text-gray-300 hover:bg-white/5">Clear</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default LearningTopicMistakes
