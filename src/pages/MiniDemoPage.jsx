import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// Updated miniProjects array with demos array for each project
const miniProjects = [
  {
    title: 'MERN Todo App',
    domain: 'MERN',
    demos: [
      { description: 'Fullstack Demo', link: 'https://github.com/yourusername/mern-todo-app' },
    ],
  },
  {
    title: 'CI/CD Pipeline',
    domain: 'DevOps',
    demos: [
      { description: 'CI/CD Demo', link: 'https://github.com/yourusername/cicd-demo' },
    ],
  },
  {
    title: 'AI Chatbot',
    domain: 'AI',
    demos: [
      { description: 'Chatbot Demo', link: 'https://github.com/yourusername/ai-chatbot' },
    ],
  },
  {
    title: 'Fullstack Blog',
    domain: 'Fullstack',
    demos: [
      { description: 'Blog Demo', link: 'https://github.com/yourusername/fullstack-blog' },
    ],
  },
];

const MiniDemoPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const projectIdx = parseInt(id, 10);
  const project = miniProjects[projectIdx];

  // Local state for demos (not persistent)
  const [demos, setDemos] = useState(project?.demos || []);
  const [newDemo, setNewDemo] = useState({ description: '', link: '' });
  const [editIdx, setEditIdx] = useState(null);
  const [editDemo, setEditDemo] = useState({ description: '', link: '' });

  if (!project) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Project Not Found</h2>
        <button onClick={() => navigate('/projects')} className="btn-primary px-4 py-2 rounded">Back to Projects</button>
      </div>
    );
  }

  // Add new demo
  const handleAddDemo = (e) => {
    e.preventDefault();
    if (!newDemo.description || !newDemo.link) return;
    setDemos([...demos, { ...newDemo }]);
    setNewDemo({ description: '', link: '' });
  };

  // Start editing
  const handleEdit = (idx) => {
    setEditIdx(idx);
    setEditDemo({ ...demos[idx] });
  };

  // Save edit
  const handleEditSave = (e) => {
    e.preventDefault();
    const updated = [...demos];
    updated[editIdx] = { ...editDemo };
    setDemos(updated);
    setEditIdx(null);
  };

  // Delete demo
  const handleDelete = (idx) => {
    if (window.confirm('Delete this demo link?')) {
      setDemos(demos.filter((_, i) => i !== idx));
    }
  };

  return (
    <div className="min-h-screen w-full p-8 bg-white dark:bg-gray-800">
      <button onClick={() => navigate('/projects')} className="mb-4 text-blue-600 hover:underline">&larr; Back to Projects</button>
      <h1 className="text-3xl font-bold mb-2">{project.title}</h1>
      <span className="inline-block text-xs bg-blue-100 text-blue-800 rounded px-2 py-1 mb-4">{project.domain}</span>

      {/* Add New Demo Link/Description */}
      <form onSubmit={handleAddDemo} className="mb-6 flex flex-col md:flex-row gap-2 items-end">
        <div className="flex-1">
          <label className="block font-semibold mb-1">Description</label>
          <input type="text" value={newDemo.description} onChange={e => setNewDemo(d => ({ ...d, description: e.target.value }))} className="w-full px-3 py-2 border rounded" required />
        </div>
        <div className="flex-1">
          <label className="block font-semibold mb-1">Demo Link</label>
          <input type="url" value={newDemo.link} onChange={e => setNewDemo(d => ({ ...d, link: e.target.value }))} className="w-full px-3 py-2 border rounded" required />
        </div>
        <button type="submit" className="btn-primary px-4 py-2 rounded">Add</button>
      </form>

      {/* List of Demo Links/Descriptions */}
      <div className="space-y-4">
        {demos.map((demo, idx) => (
          <div key={idx} className="p-4 border rounded shadow bg-gray-50 dark:bg-gray-900 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {editIdx === idx ? (
              <form onSubmit={handleEditSave} className="flex-1 flex flex-col md:flex-row gap-2 items-end">
                <input type="text" value={editDemo.description} onChange={e => setEditDemo(d => ({ ...d, description: e.target.value }))} className="px-2 py-1 border rounded" required />
                <input type="url" value={editDemo.link} onChange={e => setEditDemo(d => ({ ...d, link: e.target.value }))} className="px-2 py-1 border rounded" required />
                <div className="flex gap-2 mt-2 md:mt-0">
                  <button type="submit" className="btn-primary px-3 py-1 rounded">Save</button>
                  <button type="button" onClick={() => setEditIdx(null)} className="btn-secondary px-3 py-1 rounded">Cancel</button>
                </div>
              </form>
            ) : (
              <>
                <div className="flex-1 flex flex-col md:flex-row gap-2 items-center">
                  <div className="text-gray-700 dark:text-gray-300 font-medium">{demo.description}</div>
                  <a href={demo.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{demo.link}</a>
                </div>
                <div className="flex gap-2 mt-2 md:mt-0">
                  <button onClick={() => handleEdit(idx)} className="btn-primary px-3 py-1 rounded">Edit</button>
                  <button onClick={() => handleDelete(idx)} className="btn-secondary px-3 py-1 rounded">Delete</button>
                </div>
              </>
            )}
          </div>
        ))}
        {demos.length === 0 && <div className="text-center text-gray-500">No demo links yet.</div>}
      </div>
    </div>
  );
};

export default MiniDemoPage; 