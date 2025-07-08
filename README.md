# MyEngineer Hub 🚀

A comprehensive personal productivity and portfolio dashboard for engineering students to manage academic, project, and career activities with real-time Firebase integration.

## ✨ Features

### 📊 Dashboard
- Overview of all activities and progress
- Quick stats and recent activities
- Real-time data synchronization

### 🎓 Project Portfolio
- Showcase completed mini-projects
- Categorize by domain (Web App, Android, Data Structures, etc.)
- Tech stack visualization with icons
- Customizable themes and colors
- Image/video previews
- Detailed notes with learnings, challenges, and improvements
- Real-time updates across devices

### 📋 Task Tracker
- Kanban board for task management
- Priority levels and due dates
- Drag-and-drop functionality
- Real-time collaboration
- Progress tracking

### 📚 Learning Tracker
- Track learning progress
- Course and topic management
- Progress visualization
- Real-time sync

### 🧠 Notes Organizer
- Structured note-taking
- Categorization and tagging
- Search functionality
- Real-time collaboration

### 🎯 Career Tracker
- Internship applications
- Job opportunities
- Interview preparation
- Career goals tracking

## 🔐 Authentication

- **Email/Password**: Traditional signup and login
- **Google OAuth**: One-click sign-in with Google
- **Protected Routes**: Secure access to all features
- **User Sessions**: Persistent login state

## 🗄️ Real-time Data Sync

Built with **Firebase Firestore** for:
- Real-time data synchronization
- Offline support
- Automatic conflict resolution
- Scalable cloud storage

## 🛠️ Tech Stack

- **Frontend**: React 19 + Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Backend**: Firebase
- **Database**: Firestore
- **Authentication**: Firebase Auth
- **Real-time**: Firebase Realtime Database

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Firebase account

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd myengineer-hub
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Firebase**
   - Follow the [Firebase Setup Guide](./FIREBASE_SETUP.md)
   - Update `src/firebase/config.js` with your Firebase credentials

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 📁 Project Structure

```
myengineer-hub/
├── src/
│   ├── components/          # Reusable UI components
│   ├── contexts/           # React contexts (Auth)
│   ├── firebase/           # Firebase configuration and services
│   ├── hooks/              # Custom React hooks
│   ├── pages/              # Main application pages
│   └── assets/             # Static assets
├── public/                 # Public assets
├── FIREBASE_SETUP.md       # Firebase setup guide
└── README.md              # This file
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌟 Key Features

### Real-time Collaboration
- All data syncs in real-time across devices
- Multiple users can collaborate simultaneously
- Offline support with automatic sync when online

### Responsive Design
- Mobile-first approach
- Dark/light theme support
- Optimized for all screen sizes

### User Experience
- Intuitive navigation
- Loading states and error handling
- Smooth animations and transitions
- Accessibility features

## 🔒 Security

- Firebase Authentication for user management
- Firestore security rules for data protection
- Protected routes requiring authentication
- Secure data transmission

## 📈 Performance

- Optimized bundle size with Vite
- Lazy loading for better performance
- Efficient state management
- Minimal re-renders with React hooks

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

- Check the [Firebase Setup Guide](./FIREBASE_SETUP.md) for configuration help
- Review the [Firebase Documentation](https://firebase.google.com/docs)
- Open an issue for bugs or feature requests

## 🎯 Roadmap

- [ ] File uploads for project images
- [ ] Advanced analytics and reporting
- [ ] Mobile app (React Native)
- [ ] Team collaboration features
- [ ] Advanced search and filtering
- [ ] Export/import functionality
- [ ] Integration with external APIs

---

**Built with ❤️ for engineering students worldwide**
