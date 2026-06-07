import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import Layout from './components/Layout'
import Login from './components/Login'
import Dashboard from './pages/Dashboard'
import Projects from './pages/Projects'
import Tasks from './pages/Tasks'
import Learning from './pages/Learning'
import LearningTopicNotes from './pages/LearningTopicNotes'
import LearningTopicQuestions from './pages/LearningTopicQuestions'
import LearningTopicMistakes from './pages/LearningTopicMistakes'
import Notes from './pages/Notes'
import Career from './pages/Career'
import MiniDemoPage from './pages/MiniDemoPage'
import MiniDemoManager from './pages/MiniDemoManager'
import React from 'react'

// Theme Context
const ThemeContext = React.createContext()

export const useTheme = () => {
  const context = React.useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme')
    return saved || 'light'
  })

  useEffect(() => {
    localStorage.setItem('theme', theme)
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();
  
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

function AppRoutes() {
  const { currentUser, logout } = useAuth();

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      offset: 100
    })
  }, [])

  return (
    <Router>
      <Routes>
        <Route path="/login" element={currentUser ? <Navigate to="/" /> : <Login />} />
        <Route path="/" element={
          <ProtectedRoute>
            <Layout>
              <Dashboard />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/projects" element={
          <ProtectedRoute>
            <Layout>
              <Projects />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/tasks" element={
          <ProtectedRoute>
            <Layout>
              <Tasks />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/learning" element={
          <ProtectedRoute>
            <Layout>
              <Learning />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/learning/topic/:id/notes" element={
          <ProtectedRoute>
            <Layout>
              <LearningTopicNotes />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/learning/topic/:id/notes/:noteId" element={
          <ProtectedRoute>
            <Layout>
              <LearningTopicNotes />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/learning/topic/:id/questions" element={
          <ProtectedRoute>
            <Layout>
              <LearningTopicQuestions />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/learning/topic/:id/mistakes" element={
          <ProtectedRoute>
            <Layout>
              <LearningTopicMistakes />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/notes" element={
          <ProtectedRoute>
            <Layout>
              <Notes />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/career" element={
          <ProtectedRoute>
            <Layout>
              <Career />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/mini-demo/:id" element={
          <ProtectedRoute>
            <Layout>
              <MiniDemoPage />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/mini-demo" element={
          <ProtectedRoute>
            <Layout>
              <MiniDemoManager />
            </Layout>
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  )
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
