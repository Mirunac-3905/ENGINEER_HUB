import { useState } from 'react'

const Career = () => {
  const [applications, setApplications] = useState([
    {
      id: 1,
      company: 'Google',
      role: 'Software Engineering Intern',
      appliedOn: '2024-01-15',
      status: 'Applied',
      resumeSent: true,
      jdLink: 'https://careers.google.com/jobs/results/123456',
      notes: 'Applied through Google Careers portal'
    },
    {
      id: 2,
      company: 'Microsoft',
      role: 'Summer Intern',
      appliedOn: '2024-01-10',
      status: 'Interview Scheduled',
      resumeSent: true,
      jdLink: 'https://careers.microsoft.com/us/en/job/789012',
      notes: 'First round interview on Jan 25th'
    },
    {
      id: 3,
      company: 'Amazon',
      role: 'SDE Intern',
      appliedOn: '2024-01-08',
      status: 'Rejected',
      resumeSent: true,
      jdLink: 'https://www.amazon.jobs/en/jobs/345678',
      notes: 'Rejected after coding round'
    }
  ])

  const [showAddForm, setShowAddForm] = useState(false)
  const [newApplication, setNewApplication] = useState({
    company: '',
    role: '',
    appliedOn: '',
    status: 'Applied',
    resumeSent: false,
    jdLink: '',
    notes: ''
  })

  const statusColors = {
    'Applied': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    'Interview Scheduled': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    'Interview Completed': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    'Offer Received': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    'Rejected': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
  }

  const handleAddApplication = (e) => {
    e.preventDefault()
    const application = {
      id: Date.now(),
      ...newApplication
    }
    setApplications([application, ...applications])
    setNewApplication({
      company: '',
      role: '',
      appliedOn: '',
      status: 'Applied',
      resumeSent: false,
      jdLink: '',
      notes: ''
    })
    setShowAddForm(false)
  }

  const updateStatus = (id, newStatus) => {
    setApplications(applications.map(app => 
      app.id === id ? { ...app, status: newStatus } : app
    ))
  }

  const deleteApplication = (id) => {
    setApplications(applications.filter(app => app.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Career Tracker 🎯
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Track your internship and job applications, manage your career journey.
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="btn-primary"
        >
          Add Application
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card text-center">
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {applications.length}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Total Applications</p>
        </div>
        <div className="card text-center">
          <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
            {applications.filter(app => app.status === 'Interview Scheduled').length}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Interviews</p>
        </div>
        <div className="card text-center">
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">
            {applications.filter(app => app.status === 'Offer Received').length}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Offers</p>
        </div>
        <div className="card text-center">
          <p className="text-2xl font-bold text-red-600 dark:text-red-400">
            {applications.filter(app => app.status === 'Rejected').length}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Rejections</p>
        </div>
      </div>

      {/* Add Application Form */}
      {showAddForm && (
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Add New Application
          </h2>
          <form onSubmit={handleAddApplication} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Company Name
                </label>
                <input
                  type="text"
                  value={newApplication.company}
                  onChange={(e) => setNewApplication({...newApplication, company: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Role/Position
                </label>
                <input
                  type="text"
                  value={newApplication.role}
                  onChange={(e) => setNewApplication({...newApplication, role: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Applied On
                </label>
                <input
                  type="date"
                  value={newApplication.appliedOn}
                  onChange={(e) => setNewApplication({...newApplication, appliedOn: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Status
                </label>
                <select
                  value={newApplication.status}
                  onChange={(e) => setNewApplication({...newApplication, status: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                >
                  <option value="Applied">Applied</option>
                  <option value="Interview Scheduled">Interview Scheduled</option>
                  <option value="Interview Completed">Interview Completed</option>
                  <option value="Offer Received">Offer Received</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={newApplication.resumeSent}
                  onChange={(e) => setNewApplication({...newApplication, resumeSent: e.target.checked})}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Resume Sent
                </label>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Job Description Link
              </label>
              <input
                type="url"
                value={newApplication.jdLink}
                onChange={(e) => setNewApplication({...newApplication, jdLink: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="https://company.com/careers/job-id"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Notes
              </label>
              <textarea
                value={newApplication.notes}
                onChange={(e) => setNewApplication({...newApplication, notes: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                rows="3"
                placeholder="Any additional notes about the application..."
              />
            </div>
            <div className="flex gap-3">
              <button type="submit" className="btn-primary">
                Add Application
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
      )}

      {/* Applications Table */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Applications
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Company</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Role</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Applied</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Resume</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((application) => (
                <tr key={application.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
                  <td className="py-3 px-4">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{application.company}</p>
                      {application.notes && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{application.notes}</p>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-700 dark:text-gray-300">{application.role}</td>
                  <td className="py-3 px-4 text-gray-700 dark:text-gray-300">
                    {new Date(application.appliedOn).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4">
                    <select
                      value={application.status}
                      onChange={(e) => updateStatus(application.id, e.target.value)}
                      className={`px-2 py-1 text-xs rounded-full ${statusColors[application.status]}`}
                    >
                      <option value="Applied">Applied</option>
                      <option value="Interview Scheduled">Interview Scheduled</option>
                      <option value="Interview Completed">Interview Completed</option>
                      <option value="Offer Received">Offer Received</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      application.resumeSent 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                    }`}>
                      {application.resumeSent ? 'Sent' : 'Not Sent'}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      {application.jdLink && (
                        <a
                          href={application.jdLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
                        >
                          JD
                        </a>
                      )}
                      <button
                        onClick={() => deleteApplication(application.id)}
                        className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Career 