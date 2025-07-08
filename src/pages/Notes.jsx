import React from 'react'

const resources = [
  { name: 'GeeksforGeeks', description: 'DSA, Algorithms, Programming', link: 'https://www.geeksforgeeks.org/' },
  { name: 'LeetCode', description: 'Coding Practice & Problems', link: 'https://leetcode.com/' },
  { name: 'MDN Web Docs', description: 'Web Development Resources', link: 'https://developer.mozilla.org/' },
  { name: 'freeCodeCamp', description: 'Learn to code for free', link: 'https://www.freecodecamp.org/' },
  { name: 'HackerRank', description: 'Practice coding, interview prep', link: 'https://www.hackerrank.com/' },
  { name: 'Codeforces', description: 'Competitive Programming', link: 'https://codeforces.com/' },
  { name: 'Exercism', description: 'Practice coding in many languages', link: 'https://exercism.org/' },
  { name: 'Coursera', description: 'Online courses from top universities', link: 'https://www.coursera.org/' },
  { name: 'edX', description: 'Open online courses', link: 'https://www.edx.org/' },
  { name: 'Kaggle', description: 'Data Science & Machine Learning', link: 'https://www.kaggle.com/' },
  { name: 'GitHub', description: 'Open Source Projects & Collaboration', link: 'https://github.com/' },
  { name: 'Open Source Guides', description: 'How to contribute to open source', link: 'https://opensource.guide/' },
  { name: 'Project Euler', description: 'Math-based programming challenges', link: 'https://projecteuler.net/' },
  { name: 'The Odin Project', description: 'Fullstack web development curriculum', link: 'https://www.theodinproject.com/' },
  { name: 'CS50', description: 'Harvard’s free computer science course', link: 'https://cs50.harvard.edu/' },
  { name: 'Codecademy', description: 'Interactive coding lessons', link: 'https://www.codecademy.com/' },
  { name: 'Brilliant', description: 'Math, science, and computer science', link: 'https://brilliant.org/' },
  { name: 'Edabit', description: 'Fun coding challenges', link: 'https://edabit.com/' },
  { name: 'TopCoder', description: 'Competitive programming & challenges', link: 'https://www.topcoder.com/' },
  { name: 'Google Open Source', description: 'Google’s open source projects', link: 'https://opensource.google/' },
  // Add more as needed
];

const Notes = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Quick Resources 🚀
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Explore top coding practice platforms, open source learning, and developer resources to boost your skills!
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((res, idx) => (
            <a
              key={idx}
              href={res.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block card hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 p-6"
            >
              <h2 className="text-xl font-semibold text-blue-700 dark:text-blue-300 mb-2">{res.name}</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-2">{res.description}</p>
              <span className="text-blue-500 hover:underline">Visit &rarr;</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notes; 