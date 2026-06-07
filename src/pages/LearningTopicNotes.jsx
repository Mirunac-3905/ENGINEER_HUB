import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { learningService } from '../services/learningService'

const formatDate = (value) => {
  if (!value) return 'Unknown'
  return new Date(value).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
}

const emptyNote = { id: '', title: '', content: '', createdAt: '', updatedAt: '' }

const LearningTopicNotes = () => {
  const navigate = useNavigate()
  const { id, noteId } = useParams()
  const [notes, setNotes] = useState([])
  const [selectedNoteId, setSelectedNoteId] = useState(null)
  const [noteForm, setNoteForm] = useState(emptyNote)
  const [isEditing, setIsEditing] = useState(false)
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchNotes()
  }, [id])

  const fetchNotes = async () => {
    try {
      setLoading(true)
      const data = await learningService.getNotes(id)
      setNotes(data)
      if (noteId) {
        const note = data.find((n) => n.id === noteId)
        if (note) {
          setSelectedNoteId(note.id)
          setNoteForm(note)
        }
      } else if (data.length > 0) {
        setSelectedNoteId(data[0].id)
        setNoteForm(data[0])
      }
    } catch (err) {
      console.error('Error fetching notes:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSelectNote = (note) => {
    setSelectedNoteId(note.id)
    setNoteForm(note)
    setIsEditing(true)
    navigate(`/learning/topic/${id}/notes/${note.id}`)
  }

  const handleNewNote = () => {
    setNoteForm(emptyNote)
    setIsEditing(false)
    setSelectedNoteId(null)
    navigate(`/learning/topic/${id}/notes`)
  }

  const saveNote = async (event) => {
    event.preventDefault()
    if (!noteForm.title.trim()) return

    try {
      if (isEditing && noteForm.id) {
        const updated = await learningService.updateNote(noteForm.id, {
          title: noteForm.title,
          content: noteForm.content
        })
        setNotes((prev) => prev.map((note) => (note.id === noteForm.id ? updated : note)))
        setSelectedNoteId(noteForm.id)
        navigate(`/learning/topic/${id}/notes/${noteForm.id}`)
      } else {
        const newNote = await learningService.addNote(id, {
          title: noteForm.title,
          content: noteForm.content
        })
        setNotes((prev) => [newNote, ...prev])
        setSelectedNoteId(newNote.id)
        navigate(`/learning/topic/${id}/notes/${newNote.id}`)
      }
      setNoteForm(emptyNote)
      setIsEditing(false)
    } catch (err) {
      console.error('Error saving note:', err)
    }
  }

  const handleEdit = (note) => {
    setNoteForm(note)
    setIsEditing(true)
    setSelectedNoteId(note.id)
    navigate(`/learning/topic/${id}/notes/${note.id}`)
  }

  const handleDelete = async (noteId) => {
    if (!window.confirm('Are you sure you want to delete this note?')) return
    try {
      await learningService.deleteNote(noteId)
      setNotes((prev) => {
        const updated = prev.filter((note) => note.id !== noteId)
        if (updated.length === 0) {
          setSelectedNoteId(null)
        } else if (selectedNoteId === noteId) {
          setSelectedNoteId(updated[0].id)
        }
        return updated
      })
    } catch (err) {
      console.error('Error deleting note:', err)
    }
  }

  const selectedNote = notes.find((note) => note.id === selectedNoteId)
  const selectedIndex = selectedNote ? notes.findIndex((note) => note.id === selectedNoteId) + 1 : 0
  const filteredNotes = notes.filter((note) => {
    const query = search.toLowerCase()
    return note.title.toLowerCase().includes(query) || note.content.toLowerCase().includes(query)
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#060B18] via-[#0B1220] to-[#111827] px-4 py-6 sm:px-6 lg:px-8 text-white">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-indigo-900/10 backdrop-blur-2xl">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-indigo-300">Topic Notes</p>
            <h1 className="mt-2 text-3xl font-semibold text-white">Notes for Topic ID: {id}</h1>
            <p className="mt-2 text-gray-300">Create, edit, and save rich notes for your interview prep journey.</p>
          </div>
          <button onClick={() => navigate('/learning')} className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm text-white transition hover:bg-white/10">Back to Dashboard</button>
        </div>

        {loading ? (
          <div className="rounded-[32px] border border-white/10 bg-slate-950/80 p-6 text-center text-gray-300">Loading notes...</div>
        ) : (
          <>
            <div className="grid gap-6 lg:grid-cols-[1.3fr_0.9fr]">
              <section className="rounded-[32px] border border-white/10 bg-slate-950/80 p-6 shadow-xl">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-semibold text-white">Add / Edit Note</h2>
                    <p className="mt-2 text-sm text-gray-400">Use the editor to create new notes or update the selected note.</p>
                  </div>
                  <button onClick={handleNewNote} className="rounded-2xl border border-white/10 bg-slate-700/80 px-4 py-2 text-sm text-gray-200 transition hover:bg-slate-700">Clear</button>
                </div>
                <form onSubmit={saveNote} className="mt-6 space-y-5">
                  <label className="block text-sm text-gray-300">
                    Title
                    <input
                      value={noteForm.title}
                      onChange={(e) => setNoteForm((prev) => ({ ...prev, title: e.target.value }))}
                      placeholder="Enter note title"
                      className="mt-3 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
                    />
                  </label>
                  <label className="block text-sm text-gray-300">
                    Content
                    <textarea
                      value={noteForm.content}
                      onChange={(e) => setNoteForm((prev) => ({ ...prev, content: e.target.value }))}
                      placeholder="Write your notes here..."
                      rows={10}
                      className="mt-3 min-h-[250px] w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
                    />
                  </label>
                  <div className="flex flex-wrap gap-3">
                    <button type="submit" className={`rounded-2xl px-5 py-3 text-sm font-semibold text-white ${isEditing ? 'bg-emerald-500 hover:bg-emerald-400' : 'bg-blue-500 hover:bg-blue-400'}`}>
                      {isEditing ? 'Update Note' : 'Save Note'}
                    </button>
                    <button type="button" onClick={handleNewNote} className="rounded-2xl border border-white/10 bg-slate-700/80 px-5 py-3 text-sm text-gray-200 hover:bg-slate-700">
                      Clear
                    </button>
                  </div>
                </form>
              </section>

              <section className="rounded-[32px] border border-white/10 bg-slate-950/80 p-6 shadow-xl">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-semibold text-white">Notes Library</h2>
                    <p className="mt-2 text-sm text-gray-400">Search, browse, and manage topic notes from a single place.</p>
                  </div>
                  <button onClick={handleNewNote} className="rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/20 transition hover:brightness-110">+ New Note</button>
                </div>
                <div className="mt-6 space-y-4">
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search notes"
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
                  />
                  <div className="max-h-[520px] space-y-3 overflow-y-auto pr-1">
                    {filteredNotes.map((note, index) => (
                      <div key={note.id} className={`rounded-3xl border px-4 py-4 transition ${selectedNoteId === note.id ? 'border-indigo-400 bg-white/10 shadow-lg' : 'border-white/10 bg-white/5 hover:border-indigo-300 hover:bg-white/10'}`}>
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                          <div className="min-w-0">
                            <p className="text-sm uppercase tracking-[0.24em] text-indigo-300">Note {index + 1}</p>
                            <h3 className="mt-2 text-lg font-semibold text-white truncate">{note.title || 'Untitled note'}</h3>
                            <p className="mt-2 text-xs text-gray-400">Last updated {formatDate(note.updatedAt)}</p>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            <button onClick={() => handleEdit(note)} className="rounded-full bg-emerald-500 px-3 py-2 text-xs font-semibold text-white hover:bg-emerald-400">Edit</button>
                            <button onClick={() => handleSelectNote(note)} className="rounded-full bg-sky-500 px-3 py-2 text-xs font-semibold text-white hover:bg-sky-400">View</button>
                            <button onClick={() => handleDelete(note.id)} className="rounded-full bg-red-600 px-3 py-2 text-xs font-semibold text-white hover:bg-red-500">Delete</button>
                          </div>
                        </div>
                      </div>
                    ))}
                    {!filteredNotes.length && (
                      <div className="rounded-3xl border border-dashed border-white/20 bg-white/5 p-6 text-center text-gray-400">No notes match your search. Create a new note to begin.</div>
                    )}
                  </div>
                </div>
              </section>
            </div>

            <section className="rounded-[32px] border border-white/10 bg-slate-950/80 p-6 shadow-xl">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-white">Preview</h2>
                  <p className="mt-2 text-sm text-gray-400">View the selected note and review it in full before you continue.</p>
                </div>
                {selectedNote && (
                  <div className="rounded-full bg-white/10 px-3 py-2 text-xs font-semibold text-gray-300">Page {selectedIndex} of {notes.length}</div>
                )}
              </div>
              <div className="mt-6 rounded-[32px] border border-slate-200/20 bg-slate-50 p-8 text-slate-900 shadow-[inset_0_0_0_1px_rgba(15,23,42,0.08)]">
                {selectedNote ? (
                  <div className="space-y-6">
                    <div className="rounded-3xl bg-white p-6 shadow-sm">
                      <h3 className="text-2xl font-semibold text-slate-900">{selectedNote.title}</h3>
                      <div className="mt-3 flex flex-wrap gap-4 text-sm text-slate-500">
                        <span>Created {formatDate(selectedNote.createdAt)}</span>
                        <span>Last updated {formatDate(selectedNote.updatedAt)}</span>
                      </div>
                    </div>
                    <div className="max-h-[60vh] overflow-y-auto rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
                      <div className="prose prose-slate max-w-none whitespace-pre-wrap text-sm leading-7">
                        {selectedNote.content}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex min-h-[260px] items-center justify-center rounded-[24px] border border-dashed border-slate-300 bg-white/90 p-8 text-center text-slate-600">
                    <div>
                      <p className="text-lg font-semibold">Select a note from the library to preview.</p>
                      <p className="mt-3 text-sm text-slate-500">Your note details will appear here once a revision page is selected.</p>
                    </div>
                  </div>
                )}
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  )
}

export default LearningTopicNotes
