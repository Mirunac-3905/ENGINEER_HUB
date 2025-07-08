import { useState } from 'react'

const Learning = () => {
  const [learningTopics, setLearningTopics] = useState({
    'Data Structures & Algorithms': [
      { id: 1, topic: 'Arrays and Strings', completed: true, resource: 'https://leetcode.com/explore/learn/card/array-and-string/' },
      { id: 2, topic: 'Linked Lists', completed: false, resource: 'https://www.geeksforgeeks.org/data-structures/linked-list/' },
      { id: 3, topic: 'Stacks and Queues', completed: false, resource: 'https://www.geeksforgeeks.org/stack-data-structure/' },
      { id: 4, topic: 'Trees and Graphs', completed: false, resource: 'https://www.geeksforgeeks.org/binary-tree-data-structure/' },
      { id: 5, topic: 'Dynamic Programming', completed: false, resource: 'https://www.geeksforgeeks.org/dynamic-programming/' }
    ],
    'Database Management Systems': [
      { id: 6, topic: 'SQL Basics', completed: true, resource: 'https://www.w3schools.com/sql/' },
      { id: 7, topic: 'Normalization', completed: false, resource: 'https://www.geeksforgeeks.org/database-normalization/' },
      { id: 8, topic: 'ER Diagrams', completed: false, resource: 'https://www.geeksforgeeks.org/er-diagram/' },
      { id: 9, topic: 'Indexing', completed: false, resource: 'https://www.geeksforgeeks.org/indexing-in-databases-set-1/' }
    ],
    'Operating Systems': [
      { id: 10, topic: 'Process Management', completed: false, resource: 'https://www.geeksforgeeks.org/operating-systems/' },
      { id: 11, topic: 'Memory Management', completed: false, resource: 'https://www.geeksforgeeks.org/memory-management-in-operating-system/' },
      { id: 12, topic: 'File Systems', completed: false, resource: 'https://www.geeksforgeeks.org/file-systems-in-operating-system/' }
    ],
    'Web Development': [
      { id: 13, topic: 'HTML & CSS', completed: true, resource: 'https://developer.mozilla.org/en-US/docs/Web/HTML' },
      { id: 14, topic: 'JavaScript', completed: true, resource: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
      { id: 15, topic: 'React.js', completed: false, resource: 'https://react.dev/learn' },
      { id: 16, topic: 'Node.js', completed: false, resource: 'https://nodejs.org/en/learn/' }
    ],
    'Java Programming': [
      { id: 17, topic: 'Core Java', completed: true, resource: 'https://docs.oracle.com/javase/tutorial/' },
      { id: 18, topic: 'Collections Framework', completed: false, resource: 'https://docs.oracle.com/javase/8/docs/api/java/util/package-summary.html' },
      { id: 19, topic: 'Multithreading', completed: false, resource: 'https://docs.oracle.com/javase/tutorial/essential/concurrency/' }
    ]
  })

  const [showAddForm, setShowAddForm] = useState(false)
  const [newTopic, setNewTopic] = useState({
    category: 'Data Structures & Algorithms',
    topic: '',
    resource: ''
  })

  const toggleTopic = (category, topicId) => {
    setLearningTopics(prev => ({
      ...prev,
      [category]: prev[category].map(topic =>
        topic.id === topicId ? { ...topic, completed: !topic.completed } : topic
      )
    }))
  }

  const handleAddTopic = (e) => {
    e.preventDefault()
    const topic = {
      id: Date.now(),
      topic: newTopic.topic,
      completed: false,
      resource: newTopic.resource
    }
    setLearningTopics(prev => ({
      ...prev,
      [newTopic.category]: [...prev[newTopic.category], topic]
    }))
    setNewTopic({ category: 'Data Structures & Algorithms', topic: '', resource: '' })
    setShowAddForm(false)
  }

  const getProgress = (topics) => {
    const completed = topics.filter(topic => topic.completed).length
    return Math.round((completed / topics.length) * 100)
  }

  const categories = Object.keys(learningTopics)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Learning Tracker 📚
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Track your learning progress across different subjects and topics.
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="btn-primary"
        >
          Add Topic
        </button>
      </div>

      {/* Add Topic Form */}
      {showAddForm && (
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Add Learning Topic
          </h2>
          <form onSubmit={handleAddTopic} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Category
                </label>
                <select
                  value={newTopic.category}
                  onChange={(e) => setNewTopic({...newTopic, category: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Topic Name
                </label>
                <input
                  type="text"
                  value={newTopic.topic}
                  onChange={(e) => setNewTopic({...newTopic, topic: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Resource Link (Optional)
              </label>
              <input
                type="url"
                value={newTopic.resource}
                onChange={(e) => setNewTopic({...newTopic, resource: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="https://example.com/resource"
              />
            </div>
            <div className="flex gap-3">
              <button type="submit" className="btn-primary">
                Add Topic
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

      {/* Learning Categories */}
      <div className="space-y-6">
        {categories.map((category) => (
          <div key={category} className="card">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {category}
              </h2>
              <div className="flex items-center gap-2">
                <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${getProgress(learningTopics[category])}%` }}
                  ></div>
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {getProgress(learningTopics[category])}%
                </span>
              </div>
            </div>
            
            <div className="space-y-2">
              {learningTopics[category].map((topic) => (
                <div key={topic.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={topic.completed}
                      onChange={() => toggleTopic(category, topic.id)}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <span className={`font-medium ${
                      topic.completed 
                        ? 'text-gray-500 dark:text-gray-400 line-through' 
                        : 'text-gray-900 dark:text-white'
                    }`}>
                      {topic.topic}
                    </span>
                  </div>
                  {topic.resource && (
                    <a
                      href={topic.resource}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
                    >
                      Resource
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Learning 