# Hydration-Safe Development Guide

This guide provides permanent solutions to prevent hydration errors in our Next.js application.

## What Causes Hydration Errors

Hydration errors occur when the server-side rendered HTML doesn't match what React renders on the client-side. Common causes:

1. **Browser API Access**: Using `window`, `document`, `localStorage`, `sessionStorage` during SSR
2. **Random Values**: Math.random(), Date.now(), unique IDs generated differently on server/client
3. **Third-party Libraries**: Libraries that behave differently on server vs client
4. **Conditional Rendering**: Logic that produces different results on server vs client

## Permanent Solutions

### 1. Use ClientOnly Component

For components that should only render on the client:

```jsx
import ClientOnly from '../components/ClientOnly'

function MyComponent() {
  return (
    <ClientOnly fallback={<div>Loading...</div>}>
      <ComponentThatUsesWindowOrDocument />
    </ClientOnly>
  )
}
```

### 2. Use useHasMounted Hook

For conditional client-side rendering:

```jsx
import { useHasMounted } from '../components/ClientOnly'

function MyComponent() {
  const mounted = useHasMounted()
  
  if (!mounted) {
    return <div>Loading...</div> // or null
  }
  
  return <div>Client-side content</div>
}
```

### 3. Use useSafeBrowserAPI Hook

For safe browser API access:

```jsx
import { useSafeBrowserAPI } from '../components/ClientOnly'

function MyComponent() {
  const windowWidth = useSafeBrowserAPI(
    () => window.innerWidth,
    800 // fallback value
  )
  
  const savedData = useSafeBrowserAPI(
    () => localStorage.getItem('key'),
    null // fallback value
  )
  
  return <div>Window width: {windowWidth}</div>
}
```

## Rules to Follow

### ✅ DO:
- Wrap client-only components with `ClientOnly`
- Use `useHasMounted()` before accessing browser APIs
- Use `useSafeBrowserAPI()` for localStorage, sessionStorage, window, document
- Set safe defaults for SSR (null, empty strings, default values)
- Test components in both SSR and client environments

### ❌ DON'T:
- Access browser APIs directly in component render
- Use `typeof window !== 'undefined'` checks in render logic
- Generate random values or timestamps in render
- Use third-party libraries without checking SSR compatibility

## Common Patterns

### Theme Management
```jsx
// ✅ Good - Using hydration-safe hooks
const theme = useSafeBrowserAPI(() => localStorage.getItem('theme'), 'dark')
const mounted = useHasMounted()

useEffect(() => {
  if (mounted) {
    document.documentElement.className = theme
  }
}, [mounted, theme])
```

### Mobile Detection
```jsx
// ✅ Good - Client-side only
const [isMobile, setIsMobile] = useState(false)
const mounted = useHasMounted()

useEffect(() => {
  if (mounted) {
    setIsMobile(window.innerWidth <= 768)
  }
}, [mounted])
```

### Dynamic Imports
```jsx
// ✅ Good - For client-only libraries
const DynamicComponent = dynamic(
  () => import('./ClientOnlyComponent'),
  { ssr: false }
)
```

## Testing for Hydration Issues

1. **Enable Strict Mode** in development
2. **Check Console** for hydration warnings
3. **Test with JavaScript Disabled** to see SSR output
4. **Use React DevTools** to inspect hydration mismatches

## Automatic Checks

Consider adding these to your development workflow:

1. ESLint rules to catch browser API usage
2. Pre-commit hooks to scan for common hydration issues
3. CI/CD checks for hydration warnings in build logs

## Emergency Fix Patterns

If you encounter hydration errors after making changes:

1. **Wrap the problematic component** with `ClientOnly`
2. **Move browser API calls** into `useEffect`
3. **Add `useHasMounted()` checks** before conditional rendering
4. **Set safe defaults** for any dynamic values

Remember: It's better to show a loading state than to break hydration!