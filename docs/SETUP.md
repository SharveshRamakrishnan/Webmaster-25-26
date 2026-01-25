# Setup & Development Guide

## Prerequisites

- **Node.js** 16+ (LTS recommended)
- **npm** 8+ or **yarn**
- **Git** for version control
- Firebase account with Firestore and Authentication enabled
- Code editor (VS Code recommended)

## Initial Setup

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/CoppellCommunityHub.git
cd CoppellCommunityHub
```

### 2. Install Dependencies
```bash
npm install
```

This installs all packages listed in `package.json`, including:
- React 19.2.0
- React Router 7.10.1
- Firebase 12.8.0
- Vite 7.2.4
- Tailwind CSS
- And all other dependencies

### 3. Configure Environment Variables

Create a `.env` file in the root directory with your Firebase credentials:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

**Important:** Never commit `.env` file - it's in `.gitignore`

### 4. Firebase Setup

#### Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project
3. Enable Authentication (Email/Password and Google OAuth)
4. Create Firestore database in production mode
5. Copy credentials to `.env` file

#### Firebase Collections to Create

Create these collections in Firestore for the app to function:

**contactSubmissions**
- Auto-generated document structure when submitting contact form
- Fields: name, email, phone, subject, message, timestamp, status, read

**submissions**
- Auto-generated document structure when submitting resources
- Fields: firstName, lastName, resourceName, website, category, description, timestamp

**users**
- Auto-populated when users sign up
- Fields: uid, email, displayName, photoURL, emailVerified, createdAt

#### Firebase Security Rules

Set up these Firestore security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Public collections - anyone can read
    match /events/{document=**} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.uid == resource.data.uid;
    }
    
    match /resources/{document=**} {
      allow read: if true;
    }
    
    // Submissions - anyone can write, only admins read
    match /submissions/{document=**} {
      allow create: if true;
      allow read, update, delete: if request.auth != null;
    }
    
    match /contactSubmissions/{document=**} {
      allow create: if true;
      allow read, update, delete: if request.auth != null;
    }
    
    // User data - only user can read their own
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
    }
  }
}
```

### 5. Start Development Server
```bash
npm run dev
```

The app will start at `http://localhost:5173`

## Development

### Available Scripts

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run linting (ESLint)
npm run lint

# Format code (if Prettier is configured)
npm run format
```

### Project Structure Quick Reference

```
src/
├── components/      # Reusable UI components
├── pages/          # Page-level route components
├── context/        # React Context providers (Auth, DarkMode, Toast, Resources)
├── utils/          # Utility functions (validation, ID generation)
├── hooks/          # Custom React hooks
├── css/            # Stylesheet files
├── config/         # Configuration (Firebase setup)
└── assets/         # Static images and icons
```

### Key Files to Know

| File | Purpose |
|------|---------|
| `src/App.jsx` | Main app component with routing |
| `src/main.jsx` | Application entry point |
| `src/config/firebase.js` | Firebase initialization |
| `src/context/AuthContext.jsx` | User authentication state |
| `src/context/ToastContext.jsx` | Toast notification system |
| `src/utils/validation.js` | Form validation utilities |
| `vite.config.js` | Vite configuration with code splitting |
| `.env` | Environment variables (Firebase credentials) |

### Creating a New Page

1. Create file in `src/pages/YourPage.jsx`
2. Import and add route to `src/App.jsx`:
   ```jsx
   const YourPage = lazy(() => import('./pages/YourPage'));
   
   <Route path="/your-page" element={<YourPage />} />
   ```
3. Create corresponding CSS in `src/css/yourpage.css`

### Creating a New Component

1. Create file in `src/components/YourComponent.jsx`
2. Add PropTypes validation:
   ```jsx
   import PropTypes from 'prop-types';
   
   YourComponent.propTypes = {
     prop1: PropTypes.string.isRequired,
     prop2: PropTypes.number,
   };
   ```
3. Import and use in pages/other components

### Using the Toast System

```jsx
import { useToast } from '../context/ToastContext';

function MyComponent() {
  const { showSuccess, showError } = useToast();
  
  const handleAction = async () => {
    try {
      await doSomething();
      showSuccess('Action completed!');
    } catch (error) {
      showError('Action failed');
    }
  };
  
  return <button onClick={handleAction}>Do Action</button>;
}
```

### Using Form Validation

```jsx
import { isValidEmailStrict, validatePassword, sanitizeEmail } from '../utils/validation';

// Validate email
if (!isValidEmailStrict(email)) {
  setError('Invalid email');
}

// Validate password strength
const validation = validatePassword(password);
if (!validation.isValid) {
  setError('Password too weak');
}

// Sanitize inputs before storing
const cleanEmail = sanitizeEmail(userInput);
```

### Adding Loading States

```jsx
const [loading, setLoading] = useState(false);

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  
  try {
    await submitForm();
  } finally {
    setLoading(false);
  }
};

// In JSX
<button disabled={loading}>
  {loading ? 'Saving...' : 'Save'}
</button>
```

## Code Style & Standards

### Naming Conventions
- **Components** - PascalCase: `MyComponent.jsx`
- **Files** - PascalCase for components, camelCase for utilities
- **Functions** - camelCase: `handleSubmit()`, `useAuth()`
- **Constants** - UPPER_SNAKE_CASE: `MAX_LENGTH = 100`
- **CSS Classes** - kebab-case: `.form-field`, `.submit-btn`

### File Organization
- One component per file
- Grouped imports (React, libraries, local files)
- PropTypes validation for all components
- Comments for complex logic

### CSS Organization
- Component-specific CSS in separate files
- Global styles in `global.css`
- Dark mode overrides use `.dark` prefix
- Mobile-first responsive design
- Tailwind utility classes for styling

### Linting
```bash
npm run lint
```

Fix common issues automatically:
- Remove unused imports
- Fix spacing and indentation
- Validate PropTypes
- Check for accessibility issues

## Building for Production

### Development Build
```bash
npm run build
```

This creates optimized bundles in the `dist/` folder with:
- Minified JavaScript and CSS
- Code splitting per route
- Asset hashing for cache busting
- Source maps for debugging

### Preview Production Build
```bash
npm run preview
```

Serves the `dist/` folder locally to test production build

## Deployment

### Deploy to Netlify

#### Option 1: GitHub Integration (Recommended)
1. Push to GitHub main branch
2. Connect repo to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `dist`
5. Add environment variables in Netlify dashboard
6. Deploys automatically on push

#### Option 2: Manual Deploy
```bash
npm run build
# Deploy dist/ folder to Netlify
```

#### Netlify Configuration
The `netlify.toml` file is already configured with:
- Build command: `npm run build`
- Publish directory: `dist`
- Redirect rules for SPA routing
- Cache headers for optimal performance

### Environment Variables for Production
Set these in Netlify dashboard:
- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- etc. (all from .env)

## Debugging

### Debug in VS Code
1. Install "Debugger for Chrome" extension
2. Create `.vscode/launch.json`:
   ```json
   {
     "version": "0.2.0",
     "configurations": [
       {
         "type": "chrome",
         "request": "launch",
         "name": "Launch Chrome",
         "url": "http://localhost:5173",
         "webRoot": "${workspaceFolder}/src",
         "sourceMaps": true
       }
     ]
   }
   ```
3. Start dev server: `npm run dev`
4. Press F5 to start debugging

### Check Bundle Size
```bash
npm run build
# Check dist/ folder size
```

The optimized bundle should be:
- Initial JS: ~6.31 KB gzipped
- CSS: ~21.82 KB gzipped (optimized with Tailwind)

## Common Issues & Solutions

### Firebase Connection Error
**Problem:** "Firebase initialization failed"
- **Solution:** Check `.env` file has correct Firebase credentials

### Port 5173 Already in Use
**Problem:** `npm run dev` fails with port conflict
- **Solution:** Kill existing process or use different port: `npm run dev -- --port 3000`

### Module Not Found Errors
**Problem:** Import errors in components
- **Solution:** Verify file paths are correct relative to current file

### Styles Not Loading
**Problem:** CSS not applied to components
- **Solution:** Check CSS file is imported in component or App.jsx

### Authentication Not Working
**Problem:** Login/signup failing
- **Solution:** Verify Firebase project has Authentication enabled and credentials in `.env`

### Build Fails
**Problem:** `npm run build` errors
- **Solution:** Check for TypeScript errors, missing imports, linting issues

## Performance Tips

1. **Use lazy loading for pages**
   ```jsx
   const HeavyPage = lazy(() => import('./pages/HeavyPage'));
   ```

2. **Memoize expensive components**
   ```jsx
   export default memo(MyComponent);
   ```

3. **Use service worker for offline support** (already configured)

4. **Optimize images**
   - Use `OptimizedImage` component
   - Serve WebP with fallbacks

5. **Monitor bundle size**
   ```bash
   npm run build
   # Check dist/ folder
   ```

## Resources

- [React Documentation](https://react.dev)
- [React Router](https://reactrouter.com)
- [Firebase Docs](https://firebase.google.com/docs)
- [Vite Documentation](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Netlify Docs](https://docs.netlify.com)

## Getting Help

1. Check the `docs/` folder for detailed guides
2. Review component examples in existing pages
3. Check browser console for error messages
4. Use VS Code debugging tools
5. Check Firebase console for database errors

## Next Steps

1. Read [ARCHITECTURE.md](./ARCHITECTURE.md) for system overview
2. Review [COMPONENTS.md](./COMPONENTS.md) for component usage
3. Create a feature branch: `git checkout -b feature/your-feature`
4. Build your feature with loading states and proper validation
5. Test thoroughly before submitting PR
6. Deploy to Netlify for preview
