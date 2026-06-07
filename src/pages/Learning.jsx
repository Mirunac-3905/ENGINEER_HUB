import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { learningService } from "../services/learningService"

const PROFILE_PLATFORMS = [
  { id: 'leetcode', name: 'LeetCode', url: 'https://leetcode.com/miru' },
  { id: 'codechef', name: 'CodeChef', url: 'https://www.codechef.com/users/miru' },
  { id: 'hackerrank', name: 'HackerRank', url: 'https://www.hackerrank.com/miru' },
  { id: 'codingninjas', name: 'Coding Ninjas', url: 'https://www.codingninjas.com/users/miru' },
  { id: 'takeuforward', name: 'Take U Forward', url: 'https://www.takeuforward.org/profile/miru' }
]

const CONFIDENCE_LABELS = {
  1: 'Very Weak',
  2: 'Weak',
  3: 'Average',
  4: 'Good',
  5: 'Interview Ready'
}

const INITIAL_TOPICS = [
  { id: 'dsa', title: 'DSA', category: 'DSA', notes: 'Keep strong on arrays, strings, and graph patterns.', confidence: 4, interviewQuestions: 14, mistakes: 3, revisions: 6, lastRevised: '2026-06-01', progress: 82, status: 'Interview Ready' },
  { id: 'dbms', title: 'DBMS', category: 'DBMS', notes: 'Review joins, normalization, indexes and transactions.', confidence: 3, interviewQuestions: 8, mistakes: 2, revisions: 4, lastRevised: '2026-06-03', progress: 66, status: 'Learning' },
  { id: 'oop', title: 'OOP', category: 'OOP', notes: 'Strengthen class design, SOLID principles, and patterns.', confidence: 4, interviewQuestions: 6, mistakes: 1, revisions: 3, lastRevised: '2026-05-28', progress: 74, status: 'Practicing' },
  { id: 'os', title: 'OS', category: 'OS', notes: 'Focus on scheduling, deadlock, and memory management.', confidence: 2, interviewQuestions: 5, mistakes: 4, revisions: 2, lastRevised: '2026-05-30', progress: 48, status: 'Learning' },
  { id: 'cn', title: 'CN', category: 'CN', notes: 'Review TCP/IP, routing, and socket programming.', confidence: 3, interviewQuestions: 6, mistakes: 3, revisions: 2, lastRevised: '2026-05-25', progress: 58, status: 'Learning' },
  { id: 'aws', title: 'AWS Cloud', category: 'Cloud', notes: 'Understand core services, VPC, and deployment patterns.', confidence: 3, interviewQuestions: 7, mistakes: 1, revisions: 2, lastRevised: '2026-06-02', progress: 61, status: 'Learning' },
  { id: 'systemdesign', title: 'System Design', category: 'System Design', notes: 'Design scalable APIs, caching, and availability plans.', confidence: 2, interviewQuestions: 5, mistakes: 2, revisions: 1, lastRevised: '2026-05-27', progress: 38, status: 'Learning' },
  { id: 'java', title: 'Java', category: 'Java', notes: 'Refine OOP, concurrency, and memory management.', confidence: 4, interviewQuestions: 9, mistakes: 1, revisions: 4, lastRevised: '2026-06-04', progress: 78, status: 'Practice' },
  { id: 'react', title: 'React', category: 'React', notes: 'Master hooks, state patterns and performance.', confidence: 3, interviewQuestions: 5, mistakes: 2, revisions: 2, lastRevised: '2026-06-05', progress: 64, status: 'Practicing' },
  { id: 'nodejs', title: 'NodeJS', category: 'NodeJS', notes: 'Review event loop, streams, and REST API design.', confidence: 3, interviewQuestions: 5, mistakes: 2, revisions: 2, lastRevised: '2026-06-01', progress: 60, status: 'Practicing' },
  { id: 'mongodb', title: 'MongoDB', category: 'MongoDB', notes: 'Practice schema design, aggregation and indexing.', confidence: 3, interviewQuestions: 4, mistakes: 1, revisions: 1, lastRevised: '2026-05-29', progress: 55, status: 'Learning' }
]

const INITIAL_INTEREST = [
  { id: 'salesforce', title: 'Salesforce', category: 'Salesforce', notes: 'Track Trailhead progress and admin prep.', takeaways: 'Setup org, data model, and workflows.', confidence: 3 },
  { id: 'journey-salesforce', title: 'Journey to Salesforce', category: 'Salesforce', notes: 'Build real use cases with flows and reports.', takeaways: 'Focus on admin and basic Apex concepts.', confidence: 2 },
  { id: 'ai', title: 'AI', category: 'AI', notes: 'Explore prompt engineering and model evaluation.', takeaways: 'Start with small experiments, notebooks, and datasets.', confidence: 3 },
  { id: 'webdev', title: 'Web Development', category: 'Web', notes: 'Polish frontend skills with responsive UI patterns.', takeaways: 'Practice component-based design and accessibility.', confidence: 4 }
]

const CONFIDENCE_STARS = (level) => (
  <div className="flex items-center gap-1">
    {Array.from({ length: 5 }).map((_, index) => (
      <span key={index} className={`text-sm ${index < level ? 'text-yellow-400' : 'text-white/30'}`}>★</span>
    ))}
  </div>
)

const STATUS_STYLES = {
  'Interview Ready': 'bg-emerald-500 text-white',
  Learning: 'bg-sky-500 text-white',
  Practicing: 'bg-violet-400 text-slate-950',
  Practice: 'bg-violet-400 text-slate-950',
}

const topicStatus = (confidence) => {
  if (confidence >= 5) return 'Interview Ready'
  if (confidence >= 4) return 'Practicing'
  return 'Learning'
}

const Learning = () => {
  const navigate = useNavigate()
  const [profiles, setProfiles] = useState(PROFILE_PLATFORMS)
  const [profileEditor, setProfileEditor] = useState({ id: '', name: '', url: '' })
  const [showProfileEditor, setShowProfileEditor] = useState(false)
  const [streak, setStreak] = useState({ current: 15, longest: 45, lastPractice: null })
  const [points, setPoints] = useState(560)
  const [topics, setTopics] = useState([])
  const [interestTopics, setInterestTopics] = useState(INITIAL_INTEREST)
  const [search, setSearch] = useState('')
  const [filterCategory, setFilterCategory] = useState('All')
  const [filterConfidence, setFilterConfidence] = useState('All')
  const [filterReadiness, setFilterReadiness] = useState('All')
  const [showTopicForm, setShowTopicForm] = useState(false)
  const [topicForm, setTopicForm] = useState({ id: '', title: '', category: 'DSA', notes: '', confidence: 3, interviewQuestions: 0, mistakes: 0 })
  const [showInterestForm, setShowInterestForm] = useState(false)
  const [interestForm, setInterestForm] = useState({ id: '', title: '', category: 'Salesforce', notes: '', takeaways: '', confidence: 3 })
  const [notification, setNotification] = useState(`Don't break your streak today 🔥`)

  useEffect(() => {
    document.title = 'Placement Preparation Dashboard — Learning'
  }, [])

  const handleMarkPractice = () => {
    const today = new Date().toISOString().slice(0, 10)
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10)
    const nextStreak = streak.lastPractice === yesterday ? streak.current + 1 : 1
    const nextLongest = Math.max(streak.longest, nextStreak)

    setStreak({ current: nextStreak, longest: nextLongest, lastPractice: today })
    setPoints((prev) => prev + 20)
    setNotification(nextStreak === 1 ? 'Streak reset today — start strong again!' : `Nice! ${nextStreak} day streak unlocked.`)
  }

  const handleOpenProfile = (url) => {
    window.open(url, '_blank')
  }

  const handleEditProfile = (profile) => {
    setProfileEditor(profile)
    setShowProfileEditor(true)
  }

  const saveProfile = (event) => {
    event.preventDefault()
    if (!profileEditor.name || !profileEditor.url) return

    setProfiles((prev) => {
      if (profileEditor.id) {
        return prev.map((profile) => profile.id === profileEditor.id ? profileEditor : profile)
      }
      return [{ ...profileEditor, id: Date.now().toString() }, ...prev]
    })
    setShowProfileEditor(false)
    setProfileEditor({ id: '', name: '', url: '' })
  }

  const openProfileEditor = () => {
    setProfileEditor({ id: '', name: '', url: '' })
    setShowProfileEditor(true)
  }

  const saveTopic = async (event) => {
    event.preventDefault()

    const nextTopic = {
      title: topicForm.title,
      category: topicForm.category,
      confidence: Number(topicForm.confidence),
      interviewQuestions: Number(topicForm.interviewQuestions),
      mistakes: Number(topicForm.mistakes),
      notes: topicForm.notes,
      revisions: topicForm.revisions || 0,
      status: topicStatus(Number(topicForm.confidence)),
      progress: topicForm.progress ?? Math.min(100, Number(topicForm.confidence) * 20 + 20)
    }

    try {
      if (topicForm.id) {
        await learningService.updateTopic(topicForm.id, nextTopic)
        setTopics((prev) => prev.map((topic) => (topic.id === topicForm.id ? { ...nextTopic, id: topicForm.id } : topic)))
      } else {
        const saved = await learningService.addTopic(nextTopic)
        setTopics((prev) => [saved, ...prev])
      }
      setShowTopicForm(false)
      setTopicForm({ id: '', title: '', category: 'DSA', notes: '', confidence: 3, interviewQuestions: 0, mistakes: 0 })
    } catch (err) {
      console.error('Error saving topic:', err)
    }
  }

  const editTopic = (topic) => {
    setTopicForm(topic)
    setShowTopicForm(true)
  }

  const deleteTopic = async (topicId) => {
    try {
      await learningService.deleteTopic(topicId)
      setTopics((prev) => prev.filter((topic) => topic.id !== topicId))
    } catch (err) {
      console.error('Error deleting topic:', err)
    }
  }

  const saveInterestTopic = (event) => {
    event.preventDefault()
    if (!interestForm.title) return
    const nextTopic = {
      ...interestForm,
      confidence: Number(interestForm.confidence)
    }

    setInterestTopics((prev) => {
      if (interestForm.id) {
        return prev.map((topic) => (topic.id === interestForm.id ? nextTopic : topic))
      }
      return [{ ...nextTopic, id: Date.now().toString() }, ...prev]
    })

    setShowInterestForm(false)
    setInterestForm({ id: '', title: '', category: 'Salesforce', notes: '', takeaways: '', confidence: 3 })
  }

  const editInterest = (item) => {
    setInterestForm(item)
    setShowInterestForm(true)
  }

  const deleteInterest = (itemId) => {
    setInterestTopics((prev) => prev.filter((topic) => topic.id !== itemId))
  }

  const categories = useMemo(() => {
    const values = new Set(['DSA', 'DBMS', 'OOP', 'OS', 'CN', 'Cloud', 'System Design', 'Java', 'React', 'NodeJS', 'MongoDB', 'Salesforce', 'AI', 'Web'])
    return ['All', ...Array.from(values)]
  }, [])

  const filteredTopics = useMemo(() => {
    return topics.filter((topic) => {
      if (search && !topic.title.toLowerCase().includes(search.toLowerCase())) return false
      if (filterCategory !== 'All' && topic.category !== filterCategory) return false
      if (filterConfidence !== 'All' && Number(topic.confidence) !== Number(filterConfidence)) return false
      if (filterReadiness !== 'All') {
        if (filterReadiness === 'Interview Ready' && topic.confidence < 5) return false
        if (filterReadiness === 'Needs Revision' && topic.confidence > 3) return false
      }
      return true
    })
  }, [topics, search, filterCategory, filterConfidence, filterReadiness])
  useEffect(() => {
    fetchTopics()
  }, [])

  const fetchTopics = async () => {
    try {
      const data = await learningService.getTopics()
      setTopics(data)
    } catch (err) {
      console.error('Error fetching topics:', err)
    }
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#060B18] via-[#0B1220] to-[#111827] text-white px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <header className="rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-indigo-900/10 backdrop-blur-2xl">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-3">
              <p className="text-sm uppercase tracking-[0.28em] text-indigo-300">Placement Preparation</p>
              <h1 className="text-4xl font-semibold text-white">Placement Preparation Dashboard</h1>
              <p className="max-w-2xl text-gray-300">A single dashboard for coding interviews, cloud readiness, Salesforce goals, and personal learning milestones.</p>
            </div>
            <div className="grid w-full max-w-2xl grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-[28px] bg-slate-950/80 p-6 ring-1 ring-white/10">
                <p className="text-sm text-gray-400">Current Streak</p>
                <p className="mt-3 text-3xl font-semibold text-white">{streak.current} days</p>
                <p className="mt-2 text-sm text-gray-400">Longest streak {streak.longest} days</p>
              </div>
              <div className="rounded-[28px] bg-slate-950/80 p-6 ring-1 ring-white/10">
                <p className="text-sm text-gray-400">Point Bank</p>
                <p className="mt-3 text-3xl font-semibold text-white">{points}</p>
                <p className="mt-2 text-sm text-gray-400">Earned from daily practice and milestones.</p>
              </div>
            </div>
          </div>
        </header>

        <section className="grid gap-6 xl:grid-cols-[2fr_1fr]">
          <div className="rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-indigo-900/10 backdrop-blur-2xl">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-indigo-300">Coding Profiles</p>
                <h2 className="mt-2 text-2xl font-semibold text-white">Profile links for interview prep</h2>
              </div>
              <button onClick={openProfileEditor} className="rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-purple-500/20 transition hover:brightness-110">Add Profile</button>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {profiles.map((profile) => (
                <div key={profile.id} className="rounded-[24px] border border-white/10 bg-slate-950/80 p-5 shadow hover:-translate-y-1 transition">
                  <p className="text-sm uppercase tracking-[0.18em] text-gray-400">{profile.name}</p>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <button onClick={() => handleOpenProfile(profile.url)} className="rounded-2xl bg-white/10 px-4 py-2 text-sm text-white transition hover:bg-white/15">Open</button>
                    <button onClick={() => handleEditProfile(profile)} className="rounded-2xl border border-white/10 px-4 py-2 text-sm text-white transition hover:border-indigo-400">Edit</button>
                  </div>
                </div>
              ))}
            </div>

            {showProfileEditor && (
              <form onSubmit={saveProfile} className="mt-6 rounded-[24px] border border-white/10 bg-slate-950/90 p-5 shadow-inner">
                <div className="grid gap-4 md:grid-cols-2">
                  <label className="space-y-2 text-sm text-gray-300">
                    Platform Name
                    <input value={profileEditor.name} onChange={(e) => setProfileEditor((prev) => ({ ...prev, name: e.target.value }))} className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-white outline-none focus:border-indigo-400" />
                  </label>
                  <label className="space-y-2 text-sm text-gray-300">
                    Profile URL
                    <input value={profileEditor.url} onChange={(e) => setProfileEditor((prev) => ({ ...prev, url: e.target.value }))} className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-white outline-none focus:border-indigo-400" />
                  </label>
                </div>
                <div className="mt-4 flex flex-wrap gap-3">
                  <button type="submit" className="rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 px-5 py-2 text-sm font-semibold text-white">Save Profile</button>
                  <button onClick={() => setShowProfileEditor(false)} type="button" className="rounded-2xl border border-white/10 px-5 py-2 text-sm text-gray-300">Cancel</button>
                </div>
              </form>
            )}
          </div>

          <aside className="space-y-4">
            <div className="rounded-[32px] border border-white/10 bg-gradient-to-br from-indigo-500/10 to-slate-950/80 p-6 shadow-2xl shadow-indigo-900/10 backdrop-blur-2xl">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-gray-400">Daily Streak</p>
                  <h3 className="mt-2 text-2xl font-semibold text-white">Keep it alive</h3>
                </div>
                <div className="rounded-3xl bg-white/10 px-4 py-3 text-lg font-semibold text-white">🔥</div>
              </div>
              <div className="mt-6 grid gap-3">
                <div className="rounded-3xl bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-gray-400">Current Streak</p>
                  <p className="mt-2 text-3xl font-semibold text-white">{streak.current} days</p>
                </div>
                <div className="rounded-3xl bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-gray-400">Longest Streak</p>
                  <p className="mt-2 text-3xl font-semibold text-white">{streak.longest} days</p>
                </div>
              </div>
              <button onClick={handleMarkPractice} className="mt-6 w-full rounded-3xl bg-gradient-to-r from-indigo-500 to-purple-500 px-4 py-3 text-sm font-semibold text-white transition hover:brightness-110">Mark Today's Practice</button>
              <p className="mt-4 text-sm text-gray-300">{notification}</p>
            </div>

            <div className="rounded-[32px] border border-white/10 bg-slate-950/80 p-6 shadow-2xl shadow-indigo-900/10 backdrop-blur-2xl">
              <p className="text-sm uppercase tracking-[0.24em] text-gray-400">Quick Wins</p>
              <div className="mt-4 space-y-3">
                <div className="rounded-3xl bg-white/5 p-4">
                  <p className="text-sm text-gray-300">Streak reward</p>
                  <p className="mt-1 text-xl font-semibold text-white">+20 points</p>
                </div>
                <div className="rounded-3xl bg-white/5 p-4">
                  <p className="text-sm text-gray-300">Interview push</p>
                  <p className="mt-1 text-xl font-semibold text-white">Focus on top 5 topics</p>
                </div>
              </div>
            </div>
          </aside>
        </section>

        <section className="rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-indigo-900/10 backdrop-blur-2xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-indigo-300">Core Foundations</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">Interview readiness tracker</h2>
            </div>
            <button onClick={() => { setTopicForm({ id: '', title: '', category: 'DSA', notes: '', confidence: 3, interviewQuestions: 0, mistakes: 0 }); setShowTopicForm(true) }} className="rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-purple-500/20 transition hover:brightness-110">Add Topic</button>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-4">
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search topic" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-indigo-400" />
            <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none">
              {categories.map((category) => <option key={category} value={category}>{category}</option>)}
            </select>
            <select value={filterConfidence} onChange={(e) => setFilterConfidence(e.target.value)} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none">
              <option value="All">All Confidence</option>
              {[1, 2, 3, 4, 5].map((value) => <option key={value} value={value}>{value} Stars</option>)}
            </select>
            <select value={filterReadiness} onChange={(e) => setFilterReadiness(e.target.value)} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none">
              <option value="All">All Readiness</option>
              <option value="Interview Ready">Interview Ready</option>
              <option value="Needs Revision">Needs Revision</option>
            </select>
          </div>

          {showTopicForm && (
            <form onSubmit={saveTopic} className="mt-6 rounded-[24px] border border-white/10 bg-slate-950/80 p-6 shadow-inner">
              <div className="grid gap-4 lg:grid-cols-2">
                <label className="space-y-2 text-sm text-gray-300">
                  Topic Title
                  <input value={topicForm.title} onChange={(e) => setTopicForm((prev) => ({ ...prev, title: e.target.value }))} className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none" />
                </label>
                <label className="space-y-2 text-sm text-gray-300">
                  Category
                  <select value={topicForm.category} onChange={(e) => setTopicForm((prev) => ({ ...prev, category: e.target.value }))} className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none">
                    {categories.filter((c) => c !== 'All').map((category) => <option key={category} value={category}>{category}</option>)}
                  </select>
                </label>
              </div>

              <div className="mt-4 grid gap-4 lg:grid-cols-3">
                <label className="space-y-2 text-sm text-gray-300">
                  Confidence
                  <input type="range" min="1" max="5" value={topicForm.confidence} onChange={(e) => setTopicForm((prev) => ({ ...prev, confidence: Number(e.target.value) }))} className="w-full" />
                  <span className="text-sm text-gray-300">{topicForm.confidence} / 5</span>
                </label>
                <label className="space-y-2 text-sm text-gray-300">
                  Interview Questions
                  <input type="number" min="0" value={topicForm.interviewQuestions} onChange={(e) => setTopicForm((prev) => ({ ...prev, interviewQuestions: Number(e.target.value) }))} className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none" />
                </label>
                <label className="space-y-2 text-sm text-gray-300">
                  Mistakes
                  <input type="number" min="0" value={topicForm.mistakes} onChange={(e) => setTopicForm((prev) => ({ ...prev, mistakes: Number(e.target.value) }))} className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none" />
                </label>
              </div>

              <label className="mt-4 space-y-2 text-sm text-gray-300">
                Notes
                <textarea value={topicForm.notes} onChange={(e) => setTopicForm((prev) => ({ ...prev, notes: e.target.value }))} className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none" rows={4} />
              </label>

              <div className="mt-4 flex flex-wrap gap-3">
                <button type="submit" className="rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 px-5 py-3 text-sm font-semibold text-white">Save Topic</button>
                <button type="button" onClick={() => setShowTopicForm(false)} className="rounded-2xl border border-white/10 px-5 py-3 text-sm text-gray-300">Cancel</button>
              </div>
            </form>
          )}

          <div className="mt-6 overflow-hidden rounded-[26px] border border-white/10 bg-slate-950/80 shadow-inner">
            <table className="min-w-full divide-y divide-white/10 text-left text-sm">
              <thead className="bg-[#0F172A]/80 text-gray-400">
                <tr>
                  <th className="px-6 py-4">Topic</th>
                  <th className="px-6 py-4">Notes</th>
                  <th className="px-6 py-4">Interview Questions</th>
                  <th className="px-6 py-4">Confidence</th>
                  <th className="px-6 py-4">Mistakes</th>
                  <th className="px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {filteredTopics.map((topic) => (
                  <tr key={topic.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <div className="text-white font-semibold">{topic.title}</div>
                      <div className="mt-1 text-xs text-gray-400">{topic.category}</div>
                    </td>
                    <td className="px-6 py-4">
                      <button onClick={() => navigate(`/learning/topic/${topic.id}/notes`)} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white transition hover:bg-white/10">Open Notes</button>
                    </td>
                    <td className="px-6 py-4">
                      <button onClick={() => navigate(`/learning/topic/${topic.id}/questions`)} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white transition hover:bg-white/10">Interview Questions</button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {CONFIDENCE_STARS(topic.confidence)}
                        <span className="text-xs text-gray-400">{CONFIDENCE_LABELS[topic.confidence]}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button onClick={() => navigate(`/learning/topic/${topic.id}/mistakes`)} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white transition hover:bg-white/10">Frequent Mistakes</button>
                    </td>
                    <td className="px-6 py-4 flex flex-wrap gap-2">
                      <button onClick={() => editTopic(topic)} className="rounded-2xl bg-indigo-500 px-3 py-2 text-xs font-semibold text-white transition hover:bg-indigo-400">Edit</button>
                      <button onClick={() => deleteTopic(topic.id)} className="rounded-2xl bg-red-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-red-500">Delete</button>
                    </td>
                  </tr>
                ))}
                {filteredTopics.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-10 text-center text-gray-400">No topics match the current filters.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-indigo-900/10 backdrop-blur-2xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-indigo-300">Beyond Academics</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">Personal interest tracker</h2>
            </div>
            <button onClick={() => { setInterestForm({ id: '', title: '', category: 'Salesforce', notes: '', takeaways: '', confidence: 3 }); setShowInterestForm(true) }} className="rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-purple-500/20 transition hover:brightness-110">Add Topic</button>
          </div>

          {showInterestForm && (
            <form onSubmit={saveInterestTopic} className="mt-6 rounded-[24px] border border-white/10 bg-slate-950/80 p-6 shadow-inner">
              <div className="grid gap-4 lg:grid-cols-2">
                <label className="space-y-2 text-sm text-gray-300">
                  Topic Name
                  <input value={interestForm.title} onChange={(e) => setInterestForm((prev) => ({ ...prev, title: e.target.value }))} className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none" />
                </label>
                <label className="space-y-2 text-sm text-gray-300">
                  Category
                  <input value={interestForm.category} onChange={(e) => setInterestForm((prev) => ({ ...prev, category: e.target.value }))} className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none" />
                </label>
              </div>
              <div className="mt-4 grid gap-4 lg:grid-cols-3">
                <label className="space-y-2 text-sm text-gray-300">
                  Confidence
                  <select value={interestForm.confidence} onChange={(e) => setInterestForm((prev) => ({ ...prev, confidence: Number(e.target.value) }))} className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none">
                    {[1, 2, 3, 4, 5].map((value) => <option key={value} value={value}>{value} Stars</option>)}
                  </select>
                </label>
                <label className="space-y-2 text-sm text-gray-300">
                  Key Takeaways
                  <input value={interestForm.takeaways} onChange={(e) => setInterestForm((prev) => ({ ...prev, takeaways: e.target.value }))} className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none" />
                </label>
              </div>
              <label className="mt-4 space-y-2 text-sm text-gray-300">
                Notes
                <textarea value={interestForm.notes} onChange={(e) => setInterestForm((prev) => ({ ...prev, notes: e.target.value }))} className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none" rows={4} />
              </label>
              <div className="mt-4 flex flex-wrap gap-3">
                <button type="submit" className="rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 px-5 py-3 text-sm font-semibold text-white">Save Interest</button>
                <button onClick={() => setShowInterestForm(false)} type="button" className="rounded-2xl border border-white/10 px-5 py-3 text-sm text-gray-300">Cancel</button>
              </div>
            </form>
          )}

          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {interestTopics.map((item) => (
              <div key={item.id} className="rounded-[28px] border border-white/10 bg-slate-950/80 p-5 shadow hover:-translate-y-1 transition">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm uppercase tracking-[0.18em] text-gray-400">{item.category}</p>
                    <h3 className="mt-2 text-xl font-semibold text-white">{item.title}</h3>
                  </div>
                  <div className="text-right text-sm text-gray-400">{item.confidence}/5</div>
                </div>
                <p className="mt-4 text-gray-300">{item.notes}</p>
                <p className="mt-3 text-sm text-gray-400">{item.takeaways}</p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <button onClick={() => editInterest(item)} className="rounded-2xl bg-indigo-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-400">Edit</button>
                  <button onClick={() => deleteInterest(item.id)} className="rounded-2xl bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-500">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default Learning