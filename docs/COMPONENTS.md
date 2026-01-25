# Components Documentation

## Core System Components

### ToastContext & ToastContainer

**Purpose:** Global toast notification system for user feedback (success, error, info, warning messages)

**Location:** 
- Context: `src/context/ToastContext.jsx`
- Container: `src/components/ToastContainer.jsx`
- Styles: `src/css/toast.css`

**Setup in App.jsx:**
```jsx
import { ToastProvider } from './context/ToastContext';
import ToastContainer from './components/ToastContainer';

export default function App() {
  return (
    <ToastProvider>
      <YourApp />
      <ToastContainer />
    </ToastProvider>
  );
}
```

**Usage:**
```jsx
import { useToast } from '../context/ToastContext';

function MyComponent() {
  const { showSuccess, showError, showInfo, showWarning } = useToast();

  const handleSubmit = async () => {
    try {
      // Do something
      showSuccess('Operation completed successfully!');
    } catch (error) {
      showError('Something went wrong. Please try again.');
    }
  };

  return <button onClick={handleSubmit}>Submit</button>;
}
```

**Available Methods:**
- `showSuccess(message, duration)` - Green toast with check icon
- `showError(message, duration)` - Red toast with X icon
- `showInfo(message, duration)` - Blue toast with info icon
- `showWarning(message, duration)` - Orange toast with alert icon

**Parameters:**
- `message` (string) - Toast notification text
- `duration` (number, optional) - Auto-dismiss time in ms (default: 4000)

**Features:**
- Auto-dismisses after 4 seconds
- Manual close button on each toast
- Slide-in animation from top-right
- Stack multiple toasts
- Dark mode support
- Mobile responsive

---

### ErrorBoundary

**Purpose:** Catches React component errors and prevents full app crashes

**Location:** `src/components/ErrorBoundary.jsx`

**Usage in App.jsx:**
```jsx
<ErrorBoundary>
  <YourApp />
</ErrorBoundary>
```

**Features:**
- Displays error fallback UI instead of blank page
- Logs errors to console
- Allow users to refresh or go home
- Wraps entire app at root level

---

### ProtectedRoute

**Purpose:** Wrapper component that restricts access to authenticated users only

**Location:** `src/components/ProtectedRoute.jsx`

**Usage:**
```jsx
<Route 
  path="/saved-items" 
  element={<ProtectedRoute><SavedItems /></ProtectedRoute>} 
/>
```

**Behavior:**
- If user is authenticated: renders child component
- If user is not authenticated: redirects to `/login`
- Uses `useAuth()` hook to check authentication state

---

## Form Components

### Contact Form (`src/pages/Contact.jsx`)

**Features:**
- Name validation (2-50 chars)
- Email validation (RFC 5322 compliant)
- Phone validation (optional, US format)
- Subject validation (3+ chars)
- Message validation (10-5000 chars)
- Field-level error messages
- Loading state during submission
- Success message display
- Firestore integration

**Validation Flow:**
1. Real-time error clearing on input change
2. Form-level validation on submit
3. Field-specific error messages displayed below each input
4. Loading state prevents multiple submissions
5. Success confirmation after submission

---

### Signup Form (`src/pages/Signup.jsx`)

**Features:**
- Email validation with RFC 5322 compliance
- Password strength meter with visual requirements
- Real-time password validation feedback
- Firebase email verification
- Auto-login after signup (no redirect to login)
- Loading state with "Creating Account..." text
- Field-level error messages

**Password Requirements:**
- Minimum 8 characters
- At least 1 uppercase letter
- At least 1 lowercase letter
- At least 1 number
- At least 1 special character (!@#$%^&*)

**Validation Process:**
1. Email format check (RFC 5322)
2. Password strength meter updates in real-time
3. Confirm password matches
4. Form submit creates Firebase user
5. Email verification sent to user's email
6. User logged in and redirected to home page

---

### Resource Form (`src/components/ResourceForm.jsx`)

**Features:**
- First/last name validation
- Resource name validation
- URL or phone number validation
- Category selection (8 categories)
- Description with character count (10-5000 chars)
- Loading state prevents duplicate submissions
- Success message confirmation
- Firestore integration
- All fields disabled during submission

**Categories:**
- Health
- Education
- Volunteering
- Events
- Support Services
- Recreation
- Nonprofits
- Other

---

## Validation Utilities

**Location:** `src/utils/validation.js`

### Available Functions

#### `validatePassword(password)`
Returns object with:
- `isValid` (boolean) - Meets all requirements
- `strength` (string) - 'weak', 'fair', 'good', 'strong'
- `requirements` (object) - Status of each requirement
- `message` (string) - User-friendly message

```javascript
const { isValid, strength, requirements } = validatePassword('MyPass123!');
```

#### `isValidEmailStrict(email)`
RFC 5322 compliant email validation
```javascript
if (isValidEmailStrict('user@example.com')) {
  // Valid email
}
```

#### `validatePhoneNumberSimple(phone)`
Returns object with:
- `isValid` (boolean)
- `formatted` (string) - Formatted phone number
- `message` (string) - Error message if invalid

```javascript
const { isValid, formatted } = validatePhoneNumberSimple('(555) 123-4567');
```

#### `validateName(name)`
Returns object with:
- `isValid` (boolean) - 2-50 chars, no special chars except -/'
- `message` (string) - Error description

```javascript
const { isValid, message } = validateName('John Doe');
```

#### `validateSignupForm(formData)`
Validates entire signup form:
```javascript
const errors = validateSignupForm({
  email: 'user@example.com',
  password: 'MyPass123!',
  confirmPassword: 'MyPass123!'
});

if (Object.keys(errors).length > 0) {
  // Show errors
}
```

#### Sanitization Functions
- `sanitizeEmail(email)` - Trim and lowercase
- `sanitizeName(name)` - Trim, limit to 100 chars
- `sanitizeInput(str)` - Trim, limit to 500 chars

---

## ID Generation

**Location:** `src/utils/idGenerator.js`

### Available Functions

#### `generateUUID()`
Generates RFC 4122 v4 UUID string
```javascript
const id = generateUUID();
// Returns: "550e8400-e29b-41d4-a716-446655440000"
```

#### `generateFirestoreID()`
Generates Firestore-style 20-character ID
```javascript
const id = generateFirestoreID();
// Returns: "AbCdEfGhIjKlMnOpQrSt"
```

#### `generateResourceID()`
Intelligent ID generator (uses UUID by default)
```javascript
const id = generateResourceID();
```

**Use Cases:**
- Events: Use `generateUUID()` for collision-free IDs
- Resources: Use `generateResourceID()` for consistency
- Mock data: Use `generateFirestoreID()` for realistic test IDs

---

## Page Components

### NotFound Page (`src/pages/NotFound.jsx`)

**Purpose:** 404 error page for invalid routes

**Features:**
- Large 404 title with animation
- Helpful error message
- Home button (primary action)
- Back button (secondary action)
- Quick navigation links to main sections:
  - Home
  - Resources
  - Events
  - Forum
  - Blog
  - Contact
- Dark mode support
- Mobile responsive

**Styling:** `src/css/notFound.css`

---

## Hooks

### useAuth()
**Location:** `src/context/AuthContext.jsx`
```javascript
const { user, loading, login, signup, logout } = useAuth();
```

### useDarkMode()
**Location:** `src/context/DarkModeContext.jsx`
```javascript
const { isDarkMode, toggleDarkMode } = useDarkMode();
```

### useToast()
**Location:** `src/context/ToastContext.jsx`
```javascript
const { showSuccess, showError, showInfo, showWarning } = useToast();
```

### useScrollAnimation()
**Location:** `src/hooks/useScrollAnimation.js`
```javascript
const ref = useScrollAnimation();
// Returns ref object for intersection observer
```

---

## Props Reference

### ProtectedRoute
```jsx
<ProtectedRoute>
  <ComponentToProtect />
</ProtectedRoute>
```
- Accepts single child component
- Returns child if authenticated, redirects to /login if not

### ToastContainer
```jsx
<ToastContainer />
```
- No props required
- Reads from ToastContext automatically

### ErrorBoundary
```jsx
<ErrorBoundary>
  <App />
</ErrorBoundary>
```
- Wraps components to catch errors
- Displays fallback UI on error

---

## Best Practices

1. **Always wrap app with ToastProvider and ErrorBoundary** at the root level

2. **Use useToast() for user feedback instead of alerts:**
   ```javascript
   // Good
   showSuccess('Changes saved!');
   
   // Avoid
   alert('Changes saved!');
   ```

3. **Validate inputs before submission:**
   ```javascript
   if (!validateEmail(email)) {
     showError('Invalid email address');
     return;
   }
   ```

4. **Show loading states during async operations:**
   ```javascript
   <button disabled={loading}>
     {loading ? 'Saving...' : 'Save'}
   </button>
   ```

5. **Use field-level error messages for forms:**
   ```jsx
   {fieldErrors.email && (
     <span className="field-error">{fieldErrors.email}</span>
   )}
   ```

6. **Sanitize user inputs before storing:**
   ```javascript
   const cleanName = sanitizeName(userInput);
   ```

7. **Use ProtectedRoute for authenticated pages:**
   ```jsx
   <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
   ```

---

## Common Patterns

### Form Submission with Validation
```jsx
const [loading, setLoading] = useState(false);
const [fieldErrors, setFieldErrors] = useState({});
const { showSuccess, showError } = useToast();

const handleSubmit = async (e) => {
  e.preventDefault();
  setFieldErrors({});
  
  if (!validateForm()) return;
  
  setLoading(true);
  try {
    await submitData();
    showSuccess('Submitted successfully!');
  } catch (error) {
    showError('Submission failed');
  } finally {
    setLoading(false);
  }
};
```

### Real-time Field Validation
```jsx
const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData(prev => ({ ...prev, [name]: value }));
  
  // Clear error on input
  if (fieldErrors[name]) {
    setFieldErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[name];
      return newErrors;
    });
  }
};
```

---

## Troubleshooting

**Toast not appearing?**
- Ensure `<ToastProvider>` wraps your app
- Ensure `<ToastContainer />` is rendered in the app
- Check `useToast()` is called within a component inside ToastProvider

**Protected route redirecting?**
- Verify user is authenticated via `useAuth()`
- Check Firebase authentication is properly configured
- Ensure route is wrapped with `<ProtectedRoute>`

**Validation not working?**
- Ensure validation function is called before form submission
- Check field names match validation function parameters
- Verify error messages are displayed in JSX

**Dark mode flashing?**
- Ensure DarkModeContext reads from sessionStorage first
- Check dark class is applied to documentElement
- Verify CSS dark mode selectors use `.dark` prefix
