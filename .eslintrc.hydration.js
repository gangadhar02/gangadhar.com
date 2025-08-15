// ESLint rules to help prevent hydration errors
// Add these to your main .eslintrc.js file

const hydrationRules = {
  rules: {
    // Warn when accessing browser APIs without proper checks
    'no-restricted-globals': [
      'warn',
      {
        name: 'window',
        message: 'Use useSafeBrowserAPI() or useHasMounted() before accessing window'
      },
      {
        name: 'document', 
        message: 'Use useSafeBrowserAPI() or useHasMounted() before accessing document'
      },
      {
        name: 'localStorage',
        message: 'Use useSafeBrowserAPI() for localStorage access'
      },
      {
        name: 'sessionStorage', 
        message: 'Use useSafeBrowserAPI() for sessionStorage access'
      }
    ],
    
    // Warn when using Date.now() or Math.random() in render
    'no-restricted-syntax': [
      'warn',
      {
        selector: 'CallExpression[callee.object.name="Date"][callee.property.name="now"]',
        message: 'Date.now() can cause hydration mismatches. Use it in useEffect or useSafeBrowserAPI'
      },
      {
        selector: 'CallExpression[callee.object.name="Math"][callee.property.name="random"]',
        message: 'Math.random() can cause hydration mismatches. Use it in useEffect or useSafeBrowserAPI'
      }
    ]
  }
}

module.exports = hydrationRules