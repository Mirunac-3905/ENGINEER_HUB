import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useState, useRef } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { 
  Home, 
  FolderOpen, 
  CheckSquare, 
  BookOpen, 
  Brain, 
  Target,
  LogOut,
  Search,
  User,
  Menu,
  X
} from 'lucide-react'

const Layout = ({ children }) => {
  const location = useLocation()
  const { currentUser, logout } = useAuth()
  const [searchQuery, setSearchQuery] = useState('')
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [profileOpen, setProfileOpen] = useState(false)
  const profileRef = useRef(null)

  // Optional: Add your resume link here or fetch from user profile
  const resumeLink = null // e.g. 'https://yourdomain.com/resume.pdf'

  // Close dropdown on outside click
  React.useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const navItems = [
    { path: '/', label: 'Dashboard', icon: Home },
    { path: '/projects', label: 'Projects', icon: FolderOpen },
    { path: '/tasks', label: 'Tasks', icon: CheckSquare },
    { path: '/learning', label: 'Learning', icon: BookOpen },
    { path: '/notes', label: 'Notes', icon: Brain },
    { path: '/career', label: 'Career', icon: Target },
  ]

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error('Error logging out:', error)
    }
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  MyEngineer Hub
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 font-medium">
                  Your Personal Productivity Dashboard
                </p>
              </div>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>
          </div>
          
          {/* User Info */}
          {currentUser && (
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                  <User className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                    {currentUser.displayName || currentUser.email}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {currentUser.email}
                  </p>
                </div>
              </div>
            </div>
          )}
          
          {/* Search Bar */}
          <div className="px-6 py-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-sm"
              />
            </div>
          </div>
          
          <nav className="flex-1 px-4">
            <ul className="space-y-2">
              {navItems.map((item) => {
                const IconComponent = item.icon
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 group ${
                        location.pathname === item.path
                          ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:shadow-md'
                      }`}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      <IconComponent className={`w-5 h-5 mr-3 ${
                        location.pathname === item.path ? 'text-white' : 'text-gray-500 group-hover:text-blue-500'
                      }`} />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* Logout Button */}
          {currentUser && (
            <div className="px-4 py-4 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={handleLogout}
                className="w-full flex items-center px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-red-100 dark:hover:bg-red-900 hover:text-red-700 dark:hover:text-red-300 transition-colors duration-200"
              >
                <LogOut className="w-5 h-5 mr-3" />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
          <div className="flex items-center justify-between gap-2">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Menu className="w-6 h-6 text-gray-600 dark:text-gray-400" />
            </button>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex-1">
              {location.pathname === '/notes'
                ? 'Skill Builder'
                : navItems.find(item => item.path === location.pathname)?.label || 'Dashboard'}
            </h2>
            {/* Profile Dropdown */}
            {currentUser && (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setProfileOpen((v) => !v)}
                  className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
                  title="Profile"
                >
                  <User className="w-6 h-6" />
                </button>
                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-100 dark:border-gray-700 z-50 animate-fade-in-up">
                    <div className="p-4 border-b border-gray-100 dark:border-gray-700">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                          <User className="w-7 h-7" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900 dark:text-white">
                            {currentUser.displayName || currentUser.email?.split('@')[0]}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {currentUser.email}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 space-y-2">
                      {resumeLink && (
                        <a
                          href={resumeLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block w-full text-left px-4 py-2 rounded-lg text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 font-medium"
                        >
                          View Resume
                        </a>
                      )}
                      <button
                        onClick={logout}
                        className="block w-full text-left px-4 py-2 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 font-medium"
                      >
                        <LogOut className="inline w-4 h-4 mr-2" /> Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto bg-gray-50 dark:bg-gray-900">
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

export default Layout 