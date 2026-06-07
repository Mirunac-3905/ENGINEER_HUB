import { useState } from 'react'
import { useFirebaseData } from '../hooks/useFirebaseData'
import { 
  Plus, 
  Search, 
  Filter, 
  ExternalLink, 
  Github, 
  Eye, 
  Edit3, 
  Trash2,
  Calendar,
  Tag,
  Code,
  Globe,
  Video,
  Image,
  CheckCircle,
  Clock,
  AlertCircle,
  Pause,
  X,
  Brain,
  BookOpen,
  Target
} from 'lucide-react'
import { Link } from 'react-router-dom'

const Projects = () => {
  const { data: projects, loading, error, addItem, updateItem, deleteItem } = useFirebaseData('projects')
  
  const [showAddForm, setShowAddForm] = useState(false)
  const [selectedDomain, setSelectedDomain] = useState('All')
  const [selectedProject, setSelectedProject] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    techStack: '',
    githubLink: '',
    demoLink: '',
    domain: 'Web App',
    tags: '',
    imageUrl: '',
    videoUrl: '',
    theme: 'blue',
    status: 'Completed',
    notes: {
      features: [''],
      learnings: [''],
      challenges: [''],
      improvements: ['']
    }
  })

  const domains = [
    { name: 'Web App', icon: '💻', color: 'bg-blue-500' },
    { name: 'Android', icon: '📱', color: 'bg-green-500' },
    { name: 'Data Structures', icon: '🔢', color: 'bg-purple-500' },
    { name: 'AI/ML', icon: '🔬', color: 'bg-red-500' },
    { name: 'Desktop App', icon: '🖥️', color: 'bg-orange-500' },
    { name: 'Game Dev', icon: '🎮', color: 'bg-pink-500' },
    { name: 'Database', icon: '🗄️', color: 'bg-indigo-500' },
    { name: 'DevOps', icon: '⚙️', color: 'bg-gray-500' }
  ]

  const techIcons = {
    'React': '⚛️',
    'JavaScript': '🟨',
    'Python': '🐍',
    'Java': '☕',
    'HTML': '🌐',
    'CSS': '🎨',
    'Node.js': '🟢',
    'MongoDB': '🍃',
    'MySQL': '🐬',
    'Android': '🤖',
    'iOS': '🍎',
    'Flutter': '🦋',
    'Vue': '💚',
    'Angular': '🔴',
    'TypeScript': '🔵',
    'Docker': '🐳',
    'AWS': '☁️',
    'Firebase': '🔥'
  }

  const themeColors = {
    blue: { bg: 'bg-blue-500', text: 'text-blue-600', light: 'bg-blue-100', dark: 'bg-blue-900' },
    green: { bg: 'bg-green-500', text: 'text-green-600', light: 'bg-green-100', dark: 'bg-green-900' },
    purple: { bg: 'bg-purple-500', text: 'text-purple-600', light: 'bg-purple-100', dark: 'bg-purple-900' },
    red: { bg: 'bg-red-500', text: 'text-red-600', light: 'bg-red-100', dark: 'bg-red-900' },
    orange: { bg: 'bg-orange-500', text: 'text-orange-600', light: 'bg-orange-100', dark: 'bg-orange-900' },
    pink: { bg: 'bg-pink-500', text: 'text-pink-600', light: 'bg-pink-100', dark: 'bg-pink-900' },
    indigo: { bg: 'bg-indigo-500', text: 'text-indigo-600', light: 'bg-indigo-100', dark: 'bg-indigo-900' },
    gray: { bg: 'bg-gray-500', text: 'text-gray-600', light: 'bg-gray-100', dark: 'bg-gray-900' }
  }

  const getDomainColor = (domainName) => {
    const domain = domains.find(d => d.name === domainName)
    return domain ? domain.color : 'bg-gray-500'
  }

  const getDomainIcon = (domainName) => {
    const domain = domains.find(d => d.name === domainName)
    return domain ? domain.icon : '📁'
  }

  const getTechIcon = (tech) => {
    return techIcons[tech] || '💻'
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Completed': return <CheckCircle className="w-4 h-4" />
      case 'In Progress': return <Clock className="w-4 h-4" />
      case 'Planning': return <AlertCircle className="w-4 h-4" />
      case 'On Hold': return <Pause className="w-4 h-4" />
      default: return <Clock className="w-4 h-4" />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'In Progress': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      case 'Planning': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      case 'On Hold': return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  const handleAddProject = async (e) => {
    e.preventDefault()
    try {
      const projectData = {
        ...newProject,
        techStack: newProject.techStack.split(',').map(tech => tech.trim()).filter(tech => tech),
        tags: newProject.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      }
      
      await addItem(projectData)
      
      setNewProject({ 
        title: '', 
        description: '', 
        techStack: '', 
        githubLink: '', 
        demoLink: '', 
        domain: 'Web App',
        tags: '',
        imageUrl: '',
        videoUrl: '',
        theme: 'blue',
        status: 'Completed',
        notes: {
          features: [''],
          learnings: [''],
          challenges: [''],
          improvements: ['']
        }
      })
      setShowAddForm(false)
    } catch (error) {
      console.error('Error adding project:', error)
      alert('Failed to add project. Please try again.')
    }
  }

  const handleDeleteProject = async (projectId) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteItem(projectId)
      } catch (error) {
        console.error('Error deleting project:', error)
        alert('Failed to delete project. Please try again.')
      }
    }
  }

  const filteredProjects = selectedDomain === 'All' 
    ? projects 
    : projects.filter(project => project.domain === selectedDomain)

  const searchedProjects = filteredProjects.filter(project =>
    project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (Array.isArray(project.techStack) ? project.techStack.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase())) : false)
  )

  const addNoteItem = async (projectId, noteType) => {
    const project = projects.find(p => p.id === projectId)
    if (!project) return

    const updatedNotes = {
      ...project.notes,
      [noteType]: [...(project.notes[noteType] || []), '']
    }

    try {
      await updateItem(projectId, { notes: updatedNotes })
    } catch (error) {
      console.error('Error updating notes:', error)
      alert('Failed to update notes. Please try again.')
    }
  }

  const updateNoteItem = async (projectId, noteType, index, value) => {
    const project = projects.find(p => p.id === projectId)
    if (!project) return

    const currentNotes = project.notes[noteType] || []
    const updatedNotes = {
      ...project.notes,
      [noteType]: currentNotes.map((item, i) => i === index ? value : item)
    }

    try {
      await updateItem(projectId, { notes: updatedNotes })
    } catch (error) {
      console.error('Error updating notes:', error)
      alert('Failed to update notes. Please try again.')
    }
  }

  const removeNoteItem = async (projectId, noteType, index) => {
    const project = projects.find(p => p.id === projectId)
    if (!project) return

    const currentNotes = project.notes[noteType] || []
    const updatedNotes = {
      ...project.notes,
      [noteType]: currentNotes.filter((_, i) => i !== index)
    }

    try {
      await updateItem(projectId, { notes: updatedNotes })
    } catch (error) {
      console.error('Error updating notes:', error)
      alert('Failed to update notes. Please try again.')
    }
  }

  // Debug logging
  console.log('projects:', projects)
  console.log('searchedProjects:', searchedProjects)

  // Defensive: ensure projects is always an array
  const safeProjects = Array.isArray(projects) ? projects : []
  const safeSearchedProjects = Array.isArray(searchedProjects) ? searchedProjects : []

  // Mini Projects Data
  const miniProjects = [
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
    // Add more mini projects as needed
  ];

  const miniDomains = ['All', ...Array.from(new Set(miniProjects.map(p => p.domain)))];
  const [selectedMiniDomain, setSelectedMiniDomain] = useState('All');
  const filteredMiniProjects = selectedMiniDomain === 'All'
    ? miniProjects
    : miniProjects.filter(p => p.domain === selectedMiniDomain);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading projects...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-red-600 text-6xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Error Loading Projects
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {error.message}
          </p>
          <button 
            onClick={() => window.location.reload()} 
            className="btn-primary"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Project Portfolio 🎓
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Showcase your completed mini-projects and track your progress.
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Project
        </button>
      </div>

      {/* Search and Filter Bar */}
      <div className="card">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
          </div>
          
          {/* Domain Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-500" />
            <select
              value={selectedDomain}
              onChange={(e) => setSelectedDomain(e.target.value)}
              className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              <option value="All">All Domains</option>
              {domains.map(domain => (
                <option key={domain.name} value={domain.name}>
                  {domain.icon} {domain.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Domain Filter Pills */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Filter className="w-5 h-5" />
          Filter by Domain
        </h2>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedDomain('All')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
              selectedDomain === 'All'
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 hover:shadow-md'
            }`}
          >
            <Globe className="w-4 h-4" />
            All Projects ({projects.length})
          </button>
          {domains.map((domain) => (
            <button
              key={domain.name}
              onClick={() => setSelectedDomain(domain.name)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                selectedDomain === domain.name
                  ? `${domain.color} text-white shadow-lg`
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 hover:shadow-md'
              }`}
            >
              <span>{domain.icon}</span>
              {domain.name} ({projects.filter(p => p.domain === domain.name).length})
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {(() => {
          try {
            if (safeSearchedProjects.length === 0) {
              return (
                <div className="col-span-full text-center py-12">
                  <div className="text-gray-400 text-6xl mb-4">📁</div>
                  <p className="text-gray-500 dark:text-gray-400 text-lg">
                    {searchQuery ? 'No projects found matching your search.' : 'No projects found in this category.'}
                  </p>
                  <p className="text-gray-400 dark:text-gray-500 mt-2">
                    Add your first project to get started!
                  </p>
                </div>
              )
            }
            return safeSearchedProjects.map((project, index) => {
              // Defensive: fallback for missing fields
              const techStack = Array.isArray(project.techStack) ? project.techStack : []
              const tags = Array.isArray(project.tags) ? project.tags : []
              return (
                <div 
                  key={project.id || index} 
                  className={`card border-l-4 ${themeColors[project.theme]?.text} border-l-${project.theme}-500 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}
                >
                  {/* Project Image */}
                  {project.imageUrl && (
                    <div className="mb-4 relative group">
                      <img 
                        src={project.imageUrl} 
                        alt={project.title}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 rounded-lg flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <Image className="w-8 h-8 text-white" />
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{getDomainIcon(project.domain)}</span>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {project.title || 'Untitled'}
                      </h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(project.status)} flex items-center gap-1`}>
                        {getStatusIcon(project.status)}
                        {project.status}
                      </span>
                      <button
                        onClick={() => handleDeleteProject(project.id)}
                        className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 p-1 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                        title="Delete project"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="mb-3">
                    <span className={`px-3 py-1 text-xs rounded-full text-white ${getDomainColor(project.domain)} flex items-center gap-1`}>
                      <Code className="w-3 h-3" />
                      {project.domain}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                    {project.description}
                  </p>
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-1">
                      <Code className="w-4 h-4" />
                      Tech Stack:
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {techStack.length > 0 ? techStack.map((tech, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded flex items-center gap-1"
                        >
                          <span>{getTechIcon(tech)}</span>
                          {tech}
                        </span>
                      )) : (
                        <span className="text-gray-500 text-xs">No tech stack specified</span>
                      )}
                    </div>
                  </div>
                  {tags && tags.length > 0 && (
                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-1">
                        <Tag className="w-4 h-4" />
                        Tags:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-xs rounded flex items-center gap-1"
                          >
                            <Tag className="w-3 h-3" />
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="flex gap-2">
                    {project.githubLink && (
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-secondary text-sm flex items-center gap-1"
                      >
                        <Github className="w-4 h-4" />
                        GitHub
                      </a>
                    )}
                    {project.demoLink && (
                      <a
                        href={project.demoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary text-sm flex items-center gap-1"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Live Demo
                      </a>
                    )}
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="btn-primary text-sm flex items-center gap-1"
                    >
                      <Edit3 className="w-4 h-4" />
                      Edit
                    </button>
                  </div>
                </div>
              )
            })
          } catch (err) {
            return (
              <div className="col-span-full text-center py-12 text-red-600">
                Error rendering projects: {err.message}
              </div>
            )
          }
        })()}
      </div>

      {/* Mini Demos & Skills Showcase Section */}
      <section className="mini-projects my-8">
        <h2 className="text-2xl font-bold mb-4">Mini Demos & Skills Showcase</h2>
        <div className="mb-4">
          <label htmlFor="mini-domain" className="mr-2 font-semibold">Choose Domain:</label>
          <select
            id="mini-domain"
            value={selectedMiniDomain}
            onChange={e => setSelectedMiniDomain(e.target.value)}
            className="border rounded px-2 py-1"
          >
            {miniDomains.map(domain => (
              <option key={domain} value={domain}>{domain}</option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredMiniProjects.map((project, idx) => (
            <div key={idx} className="p-4 border rounded shadow bg-white dark:bg-gray-800">
              <h3 className="text-xl font-semibold">{project.title}</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-2">{project.description}</p>
              <span className="inline-block text-xs bg-blue-100 text-blue-800 rounded px-2 py-1 mb-2">{project.domain}</span>
              <Link
                to={`/mini-demo/${idx}`}
                className="text-blue-600 hover:underline"
              >
                View
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Add Project Form */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Add New Project
                </h2>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <form onSubmit={handleAddProject} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Project Title
                    </label>
                    <input
                      type="text"
                      value={newProject.title}
                      onChange={(e) => setNewProject({...newProject, title: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Domain
                    </label>
                    <select
                      value={newProject.domain}
                      onChange={(e) => setNewProject({...newProject, domain: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    >
                      {domains.map(domain => (
                        <option key={domain.name} value={domain.name}>
                          {domain.icon} {domain.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Status
                    </label>
                    <select
                      value={newProject.status}
                      onChange={(e) => setNewProject({...newProject, status: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    >
                      <option value="Completed">Completed</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Planning">Planning</option>
                      <option value="On Hold">On Hold</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Theme Color
                    </label>
                    <select
                      value={newProject.theme}
                      onChange={(e) => setNewProject({...newProject, theme: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    >
                      {Object.keys(themeColors).map(theme => (
                        <option key={theme} value={theme}>
                          {theme.charAt(0).toUpperCase() + theme.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Tech Stack (comma separated)
                    </label>
                    <input
                      type="text"
                      value={newProject.techStack}
                      onChange={(e) => setNewProject({...newProject, techStack: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      placeholder="React, JavaScript, CSS"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Tags (comma separated)
                    </label>
                    <input
                      type="text"
                      value={newProject.tags}
                      onChange={(e) => setNewProject({...newProject, tags: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      placeholder="Frontend, React, API"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-1">
                      <Image className="w-4 h-4" />
                      Image URL (optional)
                    </label>
                    <input
                      type="url"
                      value={newProject.imageUrl}
                      onChange={(e) => setNewProject({...newProject, imageUrl: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-1">
                      <Video className="w-4 h-4" />
                      Video URL (optional)
                    </label>
                    <input
                      type="url"
                      value={newProject.videoUrl}
                      onChange={(e) => setNewProject({...newProject, videoUrl: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      placeholder="https://example.com/video.mp4"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Description
                  </label>
                  <textarea
                    value={newProject.description}
                    onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    rows="4"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-1">
                      <Github className="w-4 h-4" />
                      GitHub Link
                    </label>
                    <input
                      type="url"
                      value={newProject.githubLink}
                      onChange={(e) => setNewProject({...newProject, githubLink: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-1">
                      <ExternalLink className="w-4 h-4" />
                      Demo Link
                    </label>
                    <input
                      type="url"
                      value={newProject.demoLink}
                      onChange={(e) => setNewProject({...newProject, demoLink: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <button type="submit" className="btn-primary flex items-center gap-2">
                    <Plus className="w-5 h-5" />
                    Add Project
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Project Details Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Get the current project data from real-time updates */}
              {(() => {
                const currentProject = projects.find(p => p.id === selectedProject.id)
                if (!currentProject) return null
                
                return (
                  <>
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{getDomainIcon(currentProject.domain)}</span>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                          {currentProject.title}
                        </h2>
                      </div>
                      <button
                        onClick={() => setSelectedProject(null)}
                        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                      >
                        <X className="w-6 h-6" />
                      </button>
                    </div>

                    {/* Project Image/Video */}
                    {currentProject.imageUrl && (
                      <div className="mb-6">
                        <img 
                          src={currentProject.imageUrl} 
                          alt={currentProject.title}
                          className="w-full h-64 object-cover rounded-lg"
                        />
                      </div>
                    )}

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Project Info */}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                          <Edit3 className="w-5 h-5" />
                          Project Information
                        </h3>
                        
                        <div className="space-y-4">
                          <div>
                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</p>
                            <textarea
                              value={currentProject.description}
                              onChange={(e) => updateItem(currentProject.id, { description: e.target.value })}
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                              rows="3"
                              placeholder="Enter project description..."
                            />
                          </div>

                          <div>
                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-1">
                              {getStatusIcon(currentProject.status)}
                              Status
                            </p>
                            <select
                              value={currentProject.status}
                              onChange={(e) => updateItem(currentProject.id, { status: e.target.value })}
                              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                            >
                              <option value="Completed">Completed</option>
                              <option value="In Progress">In Progress</option>
                              <option value="Planning">Planning</option>
                              <option value="On Hold">On Hold</option>
                            </select>
                          </div>

                          <div>
                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-1">
                              <Code className="w-4 h-4" />
                              Tech Stack
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {Array.isArray(currentProject.techStack) && currentProject.techStack.length > 0 ? currentProject.techStack.map((tech, index) => (
                                <span
                                  key={index}
                                  className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded flex items-center gap-1"
                                >
                                  <span>{getTechIcon(tech)}</span>
                                  {tech}
                                </span>
                              )) : (
                                <span className="text-gray-500 text-sm">No tech stack specified</span>
                              )}
                            </div>
                          </div>

                          <div className="flex gap-4">
                            {currentProject.githubLink && (
                              <a
                                href={currentProject.githubLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-primary flex items-center gap-2"
                              >
                                <Github className="w-4 h-4" />
                                View on GitHub
                              </a>
                            )}
                            {currentProject.demoLink && (
                              <a
                                href={currentProject.demoLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-secondary flex items-center gap-2"
                              >
                                <ExternalLink className="w-4 h-4" />
                                Live Demo
                              </a>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Project Notes */}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                          <Brain className="w-5 h-5" />
                          Project Notes & Learnings
                        </h3>

                        <div className="space-y-4">
                          {/* Key Features */}
                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <h4 className="font-medium text-gray-900 dark:text-white flex items-center gap-1">
                                <CheckCircle className="w-4 h-4" />
                                Key Features
                              </h4>
                              <button
                                onClick={() => addNoteItem(currentProject.id, 'features')}
                                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 text-sm flex items-center gap-1"
                              >
                                <Plus className="w-4 h-4" />
                                Add
                              </button>
                            </div>
                            <div className="space-y-2">
                              {(currentProject.notes?.features || []).map((feature, index) => (
                                <div key={index} className="flex gap-2">
                                  <input
                                    type="text"
                                    value={feature}
                                    onChange={(e) => updateNoteItem(currentProject.id, 'features', index, e.target.value)}
                                    className="flex-1 px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700 dark:text-white"
                                    placeholder="Enter feature..."
                                  />
                                  <button
                                    onClick={() => removeNoteItem(currentProject.id, 'features', index)}
                                    className="text-red-600 hover:text-red-800 text-sm p-1 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                                  >
                                    <X className="w-4 h-4" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* What You Learned */}
                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <h4 className="font-medium text-gray-900 dark:text-white flex items-center gap-1">
                                <BookOpen className="w-4 h-4" />
                                What You Learned
                              </h4>
                              <button
                                onClick={() => addNoteItem(currentProject.id, 'learnings')}
                                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 text-sm flex items-center gap-1"
                              >
                                <Plus className="w-4 h-4" />
                                Add
                              </button>
                            </div>
                            <div className="space-y-2">
                              {(currentProject.notes?.learnings || []).map((learning, index) => (
                                <div key={index} className="flex gap-2">
                                  <input
                                    type="text"
                                    value={learning}
                                    onChange={(e) => updateNoteItem(currentProject.id, 'learnings', index, e.target.value)}
                                    className="flex-1 px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700 dark:text-white"
                                    placeholder="Enter learning..."
                                  />
                                  <button
                                    onClick={() => removeNoteItem(currentProject.id, 'learnings', index)}
                                    className="text-red-600 hover:text-red-800 text-sm p-1 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                                  >
                                    <X className="w-4 h-4" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Challenges Faced */}
                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <h4 className="font-medium text-gray-900 dark:text-white flex items-center gap-1">
                                <AlertCircle className="w-4 h-4" />
                                Challenges Faced
                              </h4>
                              <button
                                onClick={() => addNoteItem(currentProject.id, 'challenges')}
                                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 text-sm flex items-center gap-1"
                              >
                                <Plus className="w-4 h-4" />
                                Add
                              </button>
                            </div>
                            <div className="space-y-2">
                              {(currentProject.notes?.challenges || []).map((challenge, index) => (
                                <div key={index} className="flex gap-2">
                                  <input
                                    type="text"
                                    value={challenge}
                                    onChange={(e) => updateNoteItem(currentProject.id, 'challenges', index, e.target.value)}
                                    className="flex-1 px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700 dark:text-white"
                                    placeholder="Enter challenge..."
                                  />
                                  <button
                                    onClick={() => removeNoteItem(currentProject.id, 'challenges', index)}
                                    className="text-red-600 hover:text-red-800 text-sm p-1 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                                  >
                                    <X className="w-4 h-4" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Future Improvements */}
                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <h4 className="font-medium text-gray-900 dark:text-white flex items-center gap-1">
                                <Target className="w-4 h-4" />
                                Future Improvements
                              </h4>
                              <button
                                onClick={() => addNoteItem(currentProject.id, 'improvements')}
                                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 text-sm flex items-center gap-1"
                              >
                                <Plus className="w-4 h-4" />
                                Add
                              </button>
                            </div>
                            <div className="space-y-2">
                              {(currentProject.notes?.improvements || []).map((improvement, index) => (
                                <div key={index} className="flex gap-2">
                                  <input
                                    type="text"
                                    value={improvement}
                                    onChange={(e) => updateNoteItem(currentProject.id, 'improvements', index, e.target.value)}
                                    className="flex-1 px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700 dark:text-white"
                                    placeholder="Enter improvement..."
                                  />
                                  <button
                                    onClick={() => removeNoteItem(currentProject.id, 'improvements', index)}
                                    className="text-red-600 hover:text-red-800 text-sm p-1 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                                  >
                                    <X className="w-4 h-4" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )
              })()}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Projects 