import { 
  TrendingUp, 
  BookOpen, 
  CheckSquare, 
  Target, 
  Plus, 
  Clock, 
  Calendar,
  BarChart3,
  Activity,
  Zap,
  ArrowRight,
  Users,
  Award,
  Lightbulb
} from 'lucide-react'
import { useFirebaseData } from '../hooks/useFirebaseData'

const Dashboard = () => {
  // Fetch real data
  const { data: projects = [], loading: loadingProjects } = useFirebaseData('projects');
  const { data: tasks = [], loading: loadingTasks } = useFirebaseData('tasks');
  const { data: learning = [], loading: loadingLearning } = useFirebaseData('learning');
  const { data: career = [], loading: loadingCareer } = useFirebaseData('career');

  // Calculate stats
  const totalProjects = projects.length;
  const activeTasks = tasks.filter(t => t.status === 'active' || t.status === 'Active').length;
  const learningTopics = learning.length;
  const applications = career.length;

  // Calculate changes (dummy for now, can be improved with timestamps)
  const stats = [
    { 
      title: 'Total Projects', 
      value: loadingProjects ? '...' : totalProjects, 
      icon: BookOpen, 
      color: 'bg-gradient-to-r from-blue-500 to-blue-600',
      change: '',
      changeColor: 'text-green-600'
    },
    { 
      title: 'Active Tasks', 
      value: loadingTasks ? '...' : activeTasks, 
      icon: CheckSquare, 
      color: 'bg-gradient-to-r from-yellow-500 to-orange-500',
      change: '',
      changeColor: 'text-yellow-600'
    },
    { 
      title: 'Learning Topics', 
      value: loadingLearning ? '...' : learningTopics, 
      icon: TrendingUp, 
      color: 'bg-gradient-to-r from-green-500 to-emerald-600',
      change: '',
      changeColor: 'text-green-600'
    },
    { 
      title: 'Applications', 
      value: loadingCareer ? '...' : applications, 
      icon: Target, 
      color: 'bg-gradient-to-r from-purple-500 to-pink-500',
      change: '',
      changeColor: 'text-purple-600'
    },
  ];

  // Recent activities: combine and sort by createdAt/updatedAt if available
  const allActivities = [
    ...projects.map(p => ({
      type: 'Project',
      title: p.title || 'Untitled Project',
      time: p.updatedAt || p.createdAt || '',
      icon: BookOpen,
      color: 'text-blue-600',
    })),
    ...tasks.map(t => ({
      type: 'Task',
      title: t.title || 'Untitled Task',
      time: t.updatedAt || t.createdAt || '',
      icon: CheckSquare,
      color: 'text-yellow-600',
    })),
    ...learning.map(l => ({
      type: 'Learning',
      title: l.title || 'Untitled Learning',
      time: l.updatedAt || l.createdAt || '',
      icon: TrendingUp,
      color: 'text-green-600',
    })),
    ...career.map(c => ({
      type: 'Career',
      title: c.title || 'Untitled Career',
      time: c.updatedAt || c.createdAt || '',
      icon: Target,
      color: 'text-purple-600',
    })),
  ];
  // Sort by time descending (if available)
  const recentActivities = allActivities
    .filter(a => a.time)
    .sort((a, b) => new Date(b.time) - new Date(a.time))
    .slice(0, 5);

  const quickActions = [
    {
      title: 'Add New Project',
      description: 'Create a new project entry',
      icon: Plus,
      color: 'bg-blue-500 hover:bg-blue-600',
      link: '/projects'
    },
    {
      title: 'Create Task',
      description: 'Add a new task to track',
      icon: CheckSquare,
      color: 'bg-green-500 hover:bg-green-600',
      link: '/tasks'
    },
    {
      title: 'Add Learning Topic',
      description: 'Track your learning progress',
      icon: TrendingUp,
      color: 'bg-purple-500 hover:bg-purple-600',
      link: '/learning'
    }
  ];

  return (
    <div className="space-y-8" data-aos="fade-up">
      {/* Welcome Section */}
      <div className="text-center" data-aos="fade-up">
        <h1 className="text-4xl font-bold gradient-text mb-4">
          Welcome back! 👋
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Track your progress and stay organized with your engineering journey. 
          Let's build something amazing today!
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon
          return (
            <div 
              key={index} 
              className="card hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-xl ${stat.color} text-white shadow-lg`}>
                  <IconComponent className="w-6 h-6" />
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </p>
                  <p className={`text-xs font-medium ${stat.changeColor}`}>
                    {stat.change}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activities */}
        <div className="lg:col-span-2">
          <div className="card" data-aos="fade-up" data-aos-delay="200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Recent Activities
              </h2>
              <button className="text-blue-600 hover:text-blue-800 dark:text-blue-400 text-sm flex items-center gap-1">
                View All
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-4">
              {recentActivities.length === 0 ? (
                <div className="text-center text-gray-500">No recent activities.</div>
              ) : recentActivities.map((activity, index) => {
                const IconComponent = activity.icon
                return (
                  <div 
                    key={index} 
                    className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    data-aos="fade-up"
                    data-aos-delay={300 + index * 50}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg bg-gray-100 dark:bg-gray-700 ${activity.color}`}>
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {activity.title}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {activity.time ? new Date(activity.time).toLocaleString() : ''}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full">
                      {activity.type}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <div className="card" data-aos="fade-up" data-aos-delay="400">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Quick Actions
            </h2>
            <div className="space-y-4">
              {quickActions.map((action, index) => {
                const IconComponent = action.icon
                return (
                  <button 
                    key={index}
                    className={`w-full p-4 rounded-lg text-white ${action.color} transition-all duration-200 transform hover:scale-105 hover:shadow-lg flex items-center gap-3`}
                    data-aos="fade-up"
                    data-aos-delay={500 + index * 100}
                  >
                    <IconComponent className="w-5 h-5" />
                    <div className="text-left">
                      <p className="font-semibold">{action.title}</p>
                      <p className="text-sm opacity-90">{action.description}</p>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Progress Overview */}
          <div className="card mt-6" data-aos="fade-up" data-aos-delay="600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              This Week's Progress
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Projects Completed</span>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">3/5</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '60%' }}></div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Tasks Done</span>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">12/15</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '80%' }}></div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Study Hours</span>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">18/25</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full" style={{ width: '72%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Motivation Section */}
      <div className="card bg-gradient-to-r from-blue-500 to-purple-600 text-white" data-aos="fade-up" data-aos-delay="700">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
              <Lightbulb className="w-5 h-5" />
              Today's Motivation
            </h3>
            <p className="text-blue-100">
              "The best way to predict the future is to invent it." - Alan Kay
            </p>
            <p className="text-sm text-blue-200 mt-2">
              Keep pushing forward with your engineering projects!
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">🚀</div>
            <p className="text-sm text-blue-200">You've got this!</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard 