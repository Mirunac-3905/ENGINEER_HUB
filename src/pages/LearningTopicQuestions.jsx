import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { learningService } from '../services/learningService'

const LearningTopicQuestions = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [questions, setQuestions] = useState([])
  const [form, setForm] = useState({ id: '', question: '', answer: '', difficulty: 'Easy' })
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchQuestions()
  }, [id])

  const fetchQuestions = async () => {
    try {
      setLoading(true)
      const data = await learningService.getQuestions(id)
      setQuestions(data)
    } catch (err) {
      console.error('Error fetching questions:', err)
    } finally {
      setLoading(false)
    }
  }

  const saveQuestion = async (event) => {
    event.preventDefault()
    if (!form.question.trim() || !form.answer.trim()) return

    try {
      if (isEditing && form.id) {
        const updated = await learningService.updateQuestion(form.id, {
          question: form.question,
          answer: form.answer,
          difficulty: form.difficulty
        })
        setQuestions((prev) => prev.map((item) => (item.id === form.id ? updated : item)))
      } else {
        const newQuestion = await learningService.addQuestion(id, {
          question: form.question,
          answer: form.answer,
          difficulty: form.difficulty
        })
        setQuestions((prev) => [newQuestion, ...prev])
      }
      setForm({ id: '', question: '', answer: '', difficulty: 'Easy' })
      setIsEditing(false)
    } catch (err) {
      console.error('Error saving question:', err)
    }
  }

  const handleEdit = (item) => {
    setForm(item)
    setIsEditing(true)
  }

  const handleDelete = async (itemId) => {
    if (!window.confirm('Are you sure you want to delete this question?')) return
    try {
      await learningService.deleteQuestion(itemId)
      setQuestions((prev) => prev.filter((item) => item.id !== itemId))
    } catch (err) {
      console.error('Error deleting question:', err)
    }
  }

  const handleClear = () => {
    setIsEditing(false)
    setForm({ id: '', question: '', answer: '', difficulty: 'Easy' })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#060B18] via-[#0B1220] to-[#111827] px-4 py-6 sm:px-6 lg:px-8 text-white">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-indigo-900/10 backdrop-blur-2xl">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-indigo-300">Interview Questions</p>
            <h1 className="mt-2 text-3xl font-semibold text-white">Questions for Topic ID: {id}</h1>
            <p className="mt-2 text-gray-300">Plan, add, and review the exact interview-style questions for your core topics.</p>
          </div>
          <button onClick={() => navigate('/learning')} className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm text-white transition hover:bg-white/10">Back to Dashboard</button>
        </div>

        {loading ? (
          <div className="rounded-[32px] border border-white/10 bg-slate-950/80 p-6 text-center text-gray-300">Loading questions...</div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
            <div className="rounded-[32px] border border-white/10 bg-slate-950/80 p-6 shadow-xl">
              <h2 className="text-xl font-semibold text-white">Saved Interview Questions</h2>
              <p className="mt-2 text-sm text-gray-400">Keep your question bank ready for mock rounds.</p>
              <div className="mt-6 space-y-4">
                {questions.length > 0 ? (
                  questions.map((item) => (
                    <div key={item.id} className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow hover:border-indigo-500/30 transition">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div className="flex-1">
                          <p className="text-sm uppercase tracking-[0.18em] text-gray-400">{item.difficulty}</p>
                          <h3 className="mt-2 text-lg font-semibold text-white">{item.question}</h3>
                          <p className="mt-2 text-sm text-gray-300 whitespace-pre-line">{item.answer}</p>
                        </div>
                        <div className="flex gap-2 flex-shrink-0">
                          <button onClick={() => handleEdit(item)} className="rounded-2xl bg-indigo-500 px-3 py-2 text-xs font-semibold text-white transition hover:bg-indigo-400">Edit</button>
                          <button onClick={() => handleDelete(item.id)} className="rounded-2xl bg-red-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-red-500">Delete</button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="rounded-3xl border border-dashed border-white/20 bg-white/5 p-6 text-center text-gray-400">No questions yet. Add one to begin!</div>
                )}
              </div>
            </div>

            <div className="rounded-[32px] border border-white/10 bg-slate-950/80 p-6 shadow-xl">
              <h2 className="text-xl font-semibold text-white">{isEditing ? 'Edit Question' : 'Add Question'}</h2>
              <form onSubmit={saveQuestion} className="mt-5 space-y-4">
                <label className="block text-sm text-gray-300">
                  Question
                  <textarea value={form.question} onChange={(e) => setForm((prev) => ({ ...prev, question: e.target.value }))} placeholder="Enter the interview question" rows={4} className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none" />
                </label>
                <label className="block text-sm text-gray-300">
                  Answer
                  <textarea value={form.answer} onChange={(e) => setForm((prev) => ({ ...prev, answer: e.target.value }))} placeholder="Provide a detailed answer" rows={6} className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none" />
                </label>
                <label className="block text-sm text-gray-300">
                  Difficulty
                  <select value={form.difficulty} onChange={(e) => setForm((prev) => ({ ...prev, difficulty: e.target.value }))} className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none">
                    {['Easy', 'Medium', 'Hard'].map((level) => <option key={level} value={level}>{level}</option>)}
                  </select>
                </label>
                <div className="flex flex-wrap gap-3">
                  <button type="submit" className="rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 px-5 py-3 text-sm font-semibold text-white">
                    {isEditing ? 'Update Question' : 'Save Question'}
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

export default LearningTopicQuestions
