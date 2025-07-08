import React, { useState } from 'react';

const codingCategories = [
  {
    key: 'beginner',
    label: '🧠 Beginner-Friendly',
    platforms: [
      { name: 'freeCodeCamp', description: 'Web dev + DSA practice', link: 'https://www.freecodecamp.org/', tags: ['#Beginner', '#WebDev'] },
      { name: 'Edabit', description: 'Fun & simple coding challenges', link: 'https://edabit.com/', tags: ['#Beginner', '#Logic'] },
      { name: 'CS50 Lab', description: 'Harvard beginner-friendly problem sets', link: 'https://cs50.harvard.edu/labs/', tags: ['#CS50', '#Beginner'] },
      { name: 'The Odin Project', description: 'Fullstack curriculum with practice', link: 'https://www.theodinproject.com/', tags: ['#Beginner', '#WebDev'] },
      { name: 'Coding Ninjas (Practice)', description: 'Basic problems, some free', link: 'https://www.codingninjas.com/codestudio/problems', tags: ['#Beginner'] },
      { name: 'Codingame', description: 'Learn via games + puzzles', link: 'https://www.codingame.com/', tags: ['#Beginner', '#Games'] },
    ],
  },
  {
    key: 'competitive',
    label: '⚔️ Competitive Programming',
    platforms: [
      { name: 'Codeforces', description: 'Popular for contests, rated problems', link: 'https://codeforces.com/', tags: ['#Competitive'] },
      { name: 'CodeChef', description: 'Indian-based, DSA & CP challenges', link: 'https://www.codechef.com/', tags: ['#Competitive'] },
      { name: 'TopCoder', description: 'Oldest CP platform, tricky problems', link: 'https://www.topcoder.com/', tags: ['#Competitive'] },
      { name: 'AtCoder', description: 'Japanese contests, fast-paced', link: 'https://atcoder.jp/', tags: ['#Competitive'] },
      { name: 'SPOJ', description: 'Vast problem archive', link: 'https://www.spoj.com/', tags: ['#Competitive'] },
      { name: 'CSES', description: 'Curated CP problems by topic', link: 'https://cses.fi/problemset/', tags: ['#Competitive'] },
      { name: 'LightOJ', description: 'Problem-solving platform from Bangladesh', link: 'https://lightoj.com/', tags: ['#Competitive'] },
      { name: 'E-Olymp', description: 'International problem bank', link: 'https://www.e-olymp.com/', tags: ['#Competitive'] },
      { name: 'VJudge', description: 'Virtual judge for many platforms', link: 'https://vjudge.net/', tags: ['#Competitive'] },
      { name: 'A2OJ Ladders', description: 'Structured CP problem ladders', link: 'https://a2oj.com/Ladders', tags: ['#Competitive', '#Ladders'] },
    ],
  },
  {
    key: 'dsa',
    label: '📚 DSA & Interview Prep',
    platforms: [
      { name: 'LeetCode', description: 'DSA, mock interviews, curated lists', link: 'https://leetcode.com/', tags: ['#DSA', '#Interview', '#Intermediate'] },
      { name: 'HackerRank', description: 'Topic-wise DSA & languages', link: 'https://www.hackerrank.com/', tags: ['#DSA', '#Interview', '#Beginner'] },
      { name: 'GeeksforGeeks', description: 'Extensive DSA resources + practice', link: 'https://www.geeksforgeeks.org/', tags: ['#DSA', '#Beginner', '#Interview'] },
      { name: 'InterviewBit', description: 'Guided prep, company-wise problems', link: 'https://www.interviewbit.com/', tags: ['#DSA', '#Interview'] },
      { name: 'AlgoExpert', description: 'Paid, but partial access for learning', link: 'https://www.algoexpert.io/', tags: ['#DSA', '#Interview', '#Paid'] },
    ],
  },
  {
    key: 'logic',
    label: '🧮 Logic / Math Challenges',
    platforms: [
      { name: 'Project Euler', description: 'Math + logic based problems', link: 'https://projecteuler.net/', tags: ['#Math', '#Logic'] },
      { name: 'Brilliant', description: 'Logic, math, computer science (freemium)', link: 'https://brilliant.org/', tags: ['#Math', '#Logic', '#Freemium'] },
    ],
  },
  {
    key: 'language',
    label: '🌐 Language Practice',
    platforms: [
      { name: 'Exercism', description: 'Dozens of languages with mentors', link: 'https://exercism.org/', tags: ['#Language', '#Mentor'] },
    ],
  },
];

const extraCategories = [
  {
    key: 'opensource',
    label: '🌍 Open Source Contribution',
    platforms: [
      { name: 'GitHub', description: 'Open Source Projects & Collaboration', link: 'https://github.com/', tags: ['#OpenSource'] },
      { name: 'Open Source Guides', description: 'How to contribute to open source', link: 'https://opensource.guide/', tags: ['#OpenSource'] },
      { name: 'Google Open Source', description: 'Google’s open source projects', link: 'https://opensource.google/', tags: ['#OpenSource'] },
      { name: 'Arena by OpenGenus', description: 'Open source and competitive programming', link: 'https://arena.opengenus.org/', tags: ['#OpenSource', '#Competitive'] },
    ],
  },
  {
    key: 'ai',
    label: '🤖 AI/ML & Data Science',
    platforms: [
      { name: 'Kaggle', description: 'Data Science & Machine Learning', link: 'https://www.kaggle.com/', tags: ['#AI', '#ML', '#DataScience'] },
      { name: 'Google AI', description: 'AI research and tools by Google', link: 'https://ai.google/', tags: ['#AI', '#Research'] },
      { name: 'OpenML', description: 'Open platform for sharing datasets and ML experiments', link: 'https://www.openml.org/', tags: ['#ML', '#OpenData'] },
      { name: 'Papers with Code', description: 'Latest ML papers and code', link: 'https://paperswithcode.com/', tags: ['#ML', '#Research'] },
    ],
  },
  {
    key: 'web',
    label: '🌐 Web Development',
    platforms: [
      { name: 'MDN Web Docs', description: 'Web Development Resources', link: 'https://developer.mozilla.org/', tags: ['#WebDev'] },
      { name: 'freeCodeCamp', description: 'Learn to code for free', link: 'https://www.freecodecamp.org/', tags: ['#WebDev', '#Beginner'] },
      { name: 'The Odin Project', description: 'Fullstack web development curriculum', link: 'https://www.theodinproject.com/', tags: ['#WebDev'] },
      { name: 'Frontend Mentor', description: 'Real-world front-end challenges', link: 'https://www.frontendmentor.io/', tags: ['#WebDev', '#Frontend'] },
      { name: 'CSS-Tricks', description: 'Tips and tricks for CSS', link: 'https://css-tricks.com/', tags: ['#WebDev', '#CSS'] },
    ],
  },
];

const [openPanels, setOpenPanels] = [
  'beginner',
  'competitive',
  'dsa',
  'logic',
  'language',
  'opensource',
  'ai',
  'web',
];

const Notes = () => {
  const [activePanels, setActivePanels] = useState(openPanels);
  const togglePanel = (key) => {
    setActivePanels((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  return (
    <div className="space-y-8">
      <div className="mb-4">
        <a
          href="https://roadmap.sh/"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-3 rounded-lg shadow-lg hover:from-blue-600 hover:to-purple-600 transition mb-6"
        >
          🚀 Explore Developer Roadmaps at roadmap.sh
        </a>
      </div>
      {/* Collapsible Panels for Coding Practice/DSA and More */}
      <div className="space-y-4">
        {[...codingCategories, ...extraCategories].map((cat) => (
          <div key={cat.key} className="border rounded-lg bg-white dark:bg-gray-800 shadow">
            <button
              className="w-full flex justify-between items-center px-6 py-4 text-lg font-semibold focus:outline-none hover:bg-blue-50 dark:hover:bg-gray-700 transition"
              onClick={() => togglePanel(cat.key)}
            >
              <span>{cat.label}</span>
              <span>{activePanels.includes(cat.key) ? '−' : '+'}</span>
            </button>
            {activePanels.includes(cat.key) && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-6 pb-6">
                {cat.platforms.map((p, idx) => (
                  <div key={idx} className="card p-4 flex flex-col h-full justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-blue-700 dark:text-blue-300 mb-1">{p.name}</h3>
                      <p className="text-gray-700 dark:text-gray-300 mb-2">{p.description}</p>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {p.tags && p.tags.map((tag, i) => (
                          <span key={i} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs rounded text-gray-700 dark:text-gray-300">{tag}</span>
                        ))}
                      </div>
                    </div>
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary px-4 py-2 rounded text-white font-semibold mt-2"
                    >
                      Visit
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notes; 