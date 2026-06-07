# Firebase Setup Instructions

## Current Issue
The application is showing "Missing or insufficient permissions" errors because the Firebase Firestore security rules are too restrictive.

## Solution

### 1. Deploy Firestore Security Rules

You need to deploy the security rules to your Firebase project. Follow these steps:

1. **Install Firebase CLI** (if not already installed):
   ```bash
   npm install -g firebase-tools
   ```

2. **Login to Firebase**:
   ```bash
   firebase login
   ```

3. **Initialize Firebase in your project**:
   ```bash
   cd ENGINEER_HUB
   firebase init firestore
   ```
   - Select "Use an existing project"
   - Choose your project: `myengineer-hub`
   - Use the existing `firestore.rules` file
   - Use the existing `firestore.indexes.json` file (or create empty one)

4. **Deploy the rules**:
   ```bash
   firebase deploy --only firestore:rules
   ```

### 2. Alternative: Update Rules in Firebase Console

If you prefer to update the rules directly in the Firebase Console:

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `myengineer-hub`
3. Go to **Firestore Database** → **Rules**
4. Replace the existing rules with the content from `firestore.rules` file
5. Click **Publish**

### 3. Test the Application

After deploying the rules:
1. Start the development server: `npm run dev`
2. Sign up or sign in to the application
3. The permission errors should be resolved

## What the Rules Do

The security rules ensure that:
- Only authenticated users can access data
- Users can only read/write their own data (filtered by `userId`)
- Each document must have a `userId` field matching the authenticated user's UID

## Troubleshooting

If you still see permission errors:
1. Make sure you're signed in to the application
2. Check the browser console for any other errors
3. Verify the rules were deployed successfully
4. Try refreshing the page after signing in

## Development Mode (Temporary)

If you want to test without authentication restrictions (NOT recommended for production):

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

**⚠️ WARNING**: This allows anyone to read/write your database. Only use for development and testing!
