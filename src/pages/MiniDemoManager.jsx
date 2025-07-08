import React, { useState } from 'react';

const initialMiniProjects = [
  {
    title: 'MERN Todo App',
    description: 'A simple todo app built with MongoDB, Express, React, and Node.js.',
    link: 'https://github.com/yourusername/mern-todo-app',
    domain: 'MERN',
  },
  {
    title: 'CI/CD Pipeline',
    description: 'Automated deployment pipeline using GitHub Actions and Docker.',
    link: 'https://github.com/yourusername/cicd-demo',
    domain: 'DevOps',
  },
  {
    title: 'AI Chatbot',
    description: 'A simple AI chatbot using Python and NLP libraries.',
    link: 'https://github.com/yourusername/ai-chatbot',
    domain: 'AI',
  },
  {
    title: 'Fullstack Blog',
    description: 'A fullstack blog platform with authentication and CRUD.',
    link: 'https://github.com/yourusername/fullstack-blog',
    domain: 'Fullstack',
  },
];

const MiniDemoManager = () => {
  const [miniProjects, setMiniProjects] = useState(initialMiniProjects);
  const [form, setForm] = useState({ title: '', description: '', link: '', domain: '' });
  const [editIdx, setEditIdx] = useState(null);
  const [editForm, setEditForm] = useState({ title: '', description: '', link: '', domain: '' });

  // Add new mini demo
  const handleAdd = (e) => {
    e.preventDefault();
    if (!form.title || !form.description || !form.link || !form.domain) return;
    setMiniProjects([...miniProjects, { ...form }]);
    setForm({ title: '', description: '', link: '', domain: '' });
  };

  // Start editing
  const handleEdit = (idx) => {
    setEditIdx(idx);
    setEditForm({ ...miniProjects[idx] });
  };

  // Save edit
  const handleEditSave = (e) => {
    e.preventDefault();
    const updated = [...miniProjects];
    updated[editIdx] = { ...editForm };
    setMiniProjects(updated);
    setEditIdx(null);
  };

  // Delete mini demo
  const handleDelete = (idx) => {
    if (window.confirm('Delete this mini demo?')) {
      setMiniProjects(miniProjects.filter((_, i) => i !== idx));
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-800 rounded shadow mt-8">
      <h1 className="text-3xl font-bold mb-6">Mini Demos Manager</h1>
      {/* Add New Mini Demo Form */}
      <form onSubmit={handleAdd} className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
        <div>
          <label className="block font-semibold mb-1">Title</label>
          <input type="text" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} className="w-full px-3 py-2 border rounded" required />
        </div>
        <div>
          <label className="block font-semibold mb-1">Domain</label>
          <input type="text" value={form.domain} onChange={e => setForm(f => ({ ...f, domain: e.target.value }))} className="w-full px-3 py-2 border rounded" required />
        </div>
        <div className="md:col-span-2">
          <label className="block font-semibold mb-1">Description</label>
          <input type="text" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} className="w-full px-3 py-2 border rounded" required />
        </div>
        <div className="md:col-span-2">
          <label className="block font-semibold mb-1">Demo Link</label>
          <input type="url" value={form.link} onChange={e => setForm(f => ({ ...f, link: e.target.value }))} className="w-full px-3 py-2 border rounded" required />
        </div>
        <div className="md:col-span-2 flex justify-end">
          <button type="submit" className="btn-primary px-4 py-2 rounded">Add Mini Demo</button>
        </div>
      </form>

      {/* List of Mini Demos */}
      <div className="space-y-4">
        {miniProjects.map((project, idx) => (
          <div key={idx} className="p-4 border rounded shadow bg-gray-50 dark:bg-gray-900 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {editIdx === idx ? (
              <form onSubmit={handleEditSave} className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-2 items-end">
                <input type="text" value={editForm.title} onChange={e => setEditForm(f => ({ ...f, title: e.target.value }))} className="px-2 py-1 border rounded" required />
                <input type="text" value={editForm.domain} onChange={e => setEditForm(f => ({ ...f, domain: e.target.value }))} className="px-2 py-1 border rounded" required />
                <input type="text" value={editForm.description} onChange={e => setEditForm(f => ({ ...f, description: e.target.value }))} className="px-2 py-1 border rounded" required />
                <input type="url" value={editForm.link} onChange={e => setEditForm(f => ({ ...f, link: e.target.value }))} className="px-2 py-1 border rounded" required />
                <div className="flex gap-2 mt-2 md:mt-0">
                  <button type="submit" className="btn-primary px-3 py-1 rounded">Save</button>
                  <button type="button" onClick={() => setEditIdx(null)} className="btn-secondary px-3 py-1 rounded">Cancel</button>
                </div>
              </form>
            ) : (
              <>
                <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-2 items-center">
                  <div className="font-semibold">{project.title}</div>
                  <div className="text-xs bg-blue-100 text-blue-800 rounded px-2 py-1 w-fit">{project.domain}</div>
                  <div className="text-gray-700 dark:text-gray-300">{project.description}</div>
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Demo</a>
                </div>
                <div className="flex gap-2 mt-2 md:mt-0">
                  <button onClick={() => handleEdit(idx)} className="btn-primary px-3 py-1 rounded">Edit</button>
                  <button onClick={() => handleDelete(idx)} className="btn-secondary px-3 py-1 rounded">Delete</button>
                </div>
              </>
            )}
          </div>
        ))}
        {miniProjects.length === 0 && <div className="text-center text-gray-500">No mini demos yet.</div>}
      </div>
    </div>
  );
};

export default MiniDemoManager; 