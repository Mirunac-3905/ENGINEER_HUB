# Firebase Setup Guide for MyEngineer Hub

This guide will help you set up Firebase for real-time data synchronization in your MyEngineer Hub project.

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or "Add project"
3. Enter a project name (e.g., "myengineer-hub")
4. Choose whether to enable Google Analytics (optional)
5. Click "Create project"

## Step 2: Enable Authentication

1. In your Firebase project console, go to "Authentication" in the left sidebar
2. Click "Get started"
3. Go to the "Sign-in method" tab
4. Enable the following providers:
   - **Email/Password**: Click "Enable" and save
   - **Google**: Click "Enable", add your authorized domain, and save

## Step 3: Set up Firestore Database

1. In your Firebase project console, go to "Firestore Database" in the left sidebar
2. Click "Create database"
3. Choose "Start in test mode" for development (you can secure it later)
4. Select a location for your database (choose the closest to your users)
5. Click "Done"

## Step 4: Get Your Firebase Configuration

1. In your Firebase project console, click the gear icon (⚙️) next to "Project Overview"
2. Select "Project settings"
3. Scroll down to "Your apps" section
4. Click the web icon (</>)
5. Register your app with a nickname (e.g., "myengineer-hub-web")
6. Copy the configuration object that looks like this:

```javascript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id"
};
```

## Step 5: Update Your Firebase Configuration

1. Open `src/firebase/config.js` in your project
2. Replace the placeholder configuration with your actual Firebase config:

```javascript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-actual-project-id.firebaseapp.com",
  projectId: "your-actual-project-id",
  storageBucket: "your-actual-project-id.appspot.com",
  messagingSenderId: "your-actual-messaging-sender-id",
  appId: "your-actual-app-id"
};
```

## Step 6: Set up Firestore Security Rules

1. In your Firebase console, go to "Firestore Database" → "Rules"
2. Replace the default rules with these more secure rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow users to read and write their own data
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

3. Click "Publish"

## Step 7: Test Your Setup

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to your app and try to:
   - Sign up with email/password
   - Sign in with Google
   - Add a project or task
   - Verify that data persists and syncs in real-time

## Features Enabled

With this setup, your MyEngineer Hub now has:

### 🔐 Authentication
- Email/password signup and login
- Google OAuth sign-in
- Protected routes (users must be logged in)
- User session management

### 📊 Real-time Data Sync
- **Projects**: Add, edit, delete projects with real-time updates
- **Tasks**: Kanban board with real-time task management
- **Learning**: Track learning progress in real-time
- **Notes**: Collaborative note-taking
- **Career**: Track career goals and applications

### 🗄️ Data Structure

The app creates the following collections in Firestore:

- `projects` - Project portfolio data
- `tasks` - Task management data
- `learning` - Learning progress tracking
- `notes` - Note-taking and organization
- `career` - Career planning and applications

## Security Considerations

For production deployment:

1. **Update Firestore Rules**: Implement more restrictive rules based on user ownership
2. **Enable App Check**: Add additional security layer
3. **Set up Custom Domain**: Configure your own domain for authentication
4. **Monitor Usage**: Set up billing alerts and monitor Firebase usage

## Troubleshooting

### Common Issues:

1. **Authentication not working**: Check that you've enabled the authentication providers in Firebase console
2. **Database access denied**: Ensure Firestore rules allow authenticated users
3. **Real-time updates not working**: Verify your Firebase configuration is correct
4. **CORS errors**: Make sure your domain is added to authorized domains in Firebase

### Getting Help:

- Check the [Firebase Documentation](https://firebase.google.com/docs)
- Review the [Firebase Console](https://console.firebase.google.com/) for error messages
- Check browser console for JavaScript errors

## Next Steps

Once Firebase is set up, you can:

1. **Add more features**: File uploads, real-time collaboration, notifications
2. **Optimize performance**: Implement pagination, caching strategies
3. **Add analytics**: Track user behavior and app usage
4. **Scale up**: Consider Firebase Functions for server-side logic

Your MyEngineer Hub is now a fully functional real-time application! 🚀 