# CoppellCommunityHub Architecture

## Project Overview
CoppellCommunityHub is a community resource and event management platform built with React, Firebase, and modern web technologies. It serves as a centralized hub for Coppell residents to discover resources, events, and community information.

## Technology Stack

### Frontend
- **React 19.2.0** - UI framework with functional components and hooks
- **React Router 7.10.1** - Client-side routing for SPA navigation
- **Vite 7.2.4** - Build tool with code splitting and optimizations
- **Tailwind CSS** - Utility-first CSS framework for styling
- **Lucide React** - Icon library for UI components
- **libphonenumber-js** - International phone number validation

### Backend & Database
- **Firebase 12.8.0**
  - Authentication (Email/Password, Google OAuth)
  - Firestore - NoSQL document database for data persistence
  - Real-time database capabilities

### Build & Deployment
- **Netlify** - Hosting and deployment platform
- **Service Worker** - Offline support with cache-first strategy
- **PostCSS** - CSS post-processing for vendor prefixes

## Folder Structure

```
src/
├── assets/              # Static assets (images, icons)
├── components/          # Reusable React components
│   ├── ErrorBoundary.jsx
│   ├── ProtectedRoute.jsx
│   ├── ToastContainer.jsx       # Toast notification display
│   ├── ResourceForm.jsx
│   └── ... (other UI components)
├── context/             # React Context for state management
│   ├── AuthContext.jsx          # User authentication state
│   ├── DarkModeContext.jsx      # Theme preference (light/dark)
│   ├── ResourceContext.jsx      # Resource data management
│   └── ToastContext.jsx         # Toast notification state
├── css/                 # Stylesheet files (organized by page/component)
├── data/                # Static data files
├── hooks/               # Custom React hooks
│   └── useScrollAnimation.js
├── pages/               # Page-level components (routes)
│   ├── Home.jsx
│   ├── Events.jsx
│   ├── Resources/
│   ├── Forum/
│   ├── Blog/
│   ├── NotFound.jsx             # 404 error page
│   └── ... (other pages)
├── utils/               # Utility functions
│   ├── validation.js            # Email, password, phone, name validation
│   ├── idGenerator.js           # UUID generation for preventing duplicates
│   └── imageOptimization.js
├── config/              # Configuration files
│   └── firebase.js              # Firebase initialization
├── App.jsx              # Main app component with routing
├── main.jsx             # Application entry point
└── index.css            # Global styles
```

## State Management

### Context-Based Architecture
The app uses React Context API for state management with multiple contexts:

#### AuthContext
- Manages user authentication state
- Provides `useAuth()` hook for accessing current user
- Handles login, signup, logout, and email verification
- Stores authentication tokens

#### DarkModeContext
- Manages light/dark theme preference
- Uses sessionStorage for instant initialization (prevents flash)
- Falls back to localStorage for persistence across sessions
- Provides `useDarkMode()` hook

#### ResourceContext
- Manages resource and event data
- Handles CRUD operations for resources
- Provides methods for favorite/saved items
- Caches data for performance

#### ToastContext
- Global toast notification management
- Provides `useToast()` hook with methods:
  - `showSuccess()` - Green success notification
  - `showError()` - Red error notification
  - `showInfo()` - Blue info notification
  - `showWarning()` - Orange warning notification
- Notifications auto-dismiss after 4 seconds

## Core Features

### Authentication
- Email/password signup with Firebase email verification
- Google OAuth integration
- Protected routes requiring authentication
- Session persistence with Firebase tokens

### Validation
- **Email validation** - RFC 5322 compliant using strict regex
- **Password validation** - Strength requirements with visual meter
  - Minimum 8 characters
  - At least 1 uppercase, 1 lowercase, 1 number, 1 special character
- **Phone validation** - Supports US and international formats using libphonenumber-js
- **Name validation** - 2-50 characters, no special characters except hyphens/apostrophes
- **Form validation** - Field-level errors with real-time feedback

### User Feedback
- **Toast Notifications** - Non-blocking notification system for success/error/info/warning messages
- **Loading States** - Visual feedback during async operations (disabled buttons, loading text)
- **Error Messages** - Field-level validation errors with helpful guidance
- **Success Messages** - Confirmation when actions complete successfully

### Performance Optimizations
- **Code Splitting** - Lazy loading of pages with React.lazy() and Suspense
  - All route pages are dynamically imported
  - Reduces initial bundle size
  - CSS is automatically split and served per-route
- **Service Worker** - Offline support with cache-first strategy
- **Static Asset Caching** - Long-term caching headers via Netlify configuration
- **CSS Minification** - Tailwind CSS purges unused styles
- **Image Optimization** - imageOptimization.js utility for responsive images

### Security
- **Data Sanitization** - Input sanitization for name, email, and text fields
- **Email Verification** - Firebase email verification for new signups
- **Protected Routes** - ProtectedRoute component guards sensitive pages
- **Firestore Security Rules** - Database-level access control
- **XSS Prevention** - React's built-in XSS protection

## ID Generation Strategy

To prevent duplicate event/resource IDs:
- **UUID v4** - `generateUUID()` for general use cases
- **Firestore ID** - `generateFirestoreID()` for 20-character Firestore-style IDs
- **Resource ID** - `generateResourceID()` uses appropriate generator based on context

## Data Models

### Firestore Collections

#### contactSubmissions
```javascript
{
  name: string,
  email: string,
  phone: string,
  subject: string,
  message: string,
  timestamp: Timestamp,
  status: 'new' | 'read' | 'resolved',
  read: boolean
}
```

#### submissions (Resource submissions)
```javascript
{
  firstName: string,
  lastName: string,
  resourceName: string,
  website: string,
  category: string,
  description: string,
  timestamp: Timestamp
}
```

#### users (User profiles)
```javascript
{
  uid: string,
  email: string,
  displayName: string,
  photoURL: string,
  emailVerified: boolean,
  createdAt: Timestamp
}
```

## Component Hierarchy

```
<App>
  <ErrorBoundary>
    <ToastProvider>
      <AuthProvider>
        <ResourceProvider>
          <DarkModeProvider>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/resources" element={<ResourceDirectory />} />
              <Route path="/events" element={<Events />} />
              <Route path="/contact" element={<Contact />} />
              ... (other routes)
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
            <ToastContainer />
          </DarkModeProvider>
        </ResourceProvider>
      </AuthProvider>
    </ToastProvider>
  </ErrorBoundary>
</App>
```

## Routing

The application uses React Router v7 with the following route structure:

### Public Routes
- `/` - Home page
- `/resources` - Resource directory
- `/events` - Events listing
- `/calendar` - Event calendar
- `/forum` - Forum topics
- `/blog` - Blog posts
- `/about` - About page
- `/contact` - Contact form
- `/login` - User login
- `/signup` - User registration
- `/404` - Catch-all not found page

### Protected Routes
- `/saved-items` - User's saved resources/events
- `/calendar` - Interactive calendar (auth required)
- `/profile` - User profile page
- `/submit-resource` - Submit new resource
- `/forum/new-topic` - Create new forum topic
- `/blog/write` - Write new blog post
- `/admin/resources` - Admin resource management

## CSS Architecture

### Design System
- **Color Palette**
  - Primary: Orange (`#ea580c`, `#ff8c42` dark)
  - Secondary: Pink/Magenta (`#ec4899`)
  - Neutral: Gray scale for text and backgrounds
- **Typography** - System font stack with fallbacks
- **Spacing** - 4px base unit for consistent spacing
- **Breakpoints**
  - Mobile: < 480px
  - Tablet: 480px - 768px
  - Desktop: > 768px

### CSS Files Organization
- `global.css` - Global styles and reset
- `app.css` - App-level layout
- `components.css` - Shared component styles
- `pages.css` - Page-level styles
- `dark.css` - Dark mode overrides
- Component-specific: `navbar.css`, `login.css`, `contact.css`, etc.

## Development Workflow

### Environment Setup
1. Clone repository
2. Install dependencies: `npm install`
3. Configure Firebase credentials in `.env`
4. Run dev server: `npm run dev`

### Building
- Development: `npm run dev` - Starts Vite dev server with HMR
- Production: `npm run build` - Creates optimized bundle in `/dist`
- Preview: `npm run preview` - Preview production build locally

### Git Workflow
- Main branch is production-ready
- Create feature branches for new features
- Commit messages should reference issue numbers (e.g., "Issue #29-33")
- Code splitting and lazy loading should be maintained

## Performance Metrics

### Bundle Size (Gzipped)
- CSS: ~21.82 KB (reduced from 43.64 KB)
- JS: ~6.31 KB (main bundle)
- Total Initial Load: ~13 KB
- Per-route chunks: 0.3-1.0 KB

### Optimization Strategies
- Code splitting reduces initial bundle by ~50%
- Service worker enables offline functionality
- Lazy loading pages on-demand reduces memory footprint
- Tailwind CSS purges unused styles automatically

## Security Considerations

1. **Firebase Security Rules** - Restrict database access based on user authentication
2. **Input Validation** - All user inputs are validated before submission
3. **Data Sanitization** - String inputs are trimmed and length-limited
4. **CORS** - Firebase handles CORS automatically
5. **Environment Variables** - Sensitive keys stored in `.env` file (not committed)

## Future Enhancements

- Real-time collaboration features
- Advanced search and filtering
- User notifications system
- Analytics and reporting dashboard
- Mobile app (React Native)
- Email notifications for events/resources
