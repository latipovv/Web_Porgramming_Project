module.exports = {
  root: true,
  env: { 
    browser: true, 
    es2020: true 
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended' // Enforce Prettier formatting
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { 
    ecmaVersion: 'latest', 
    sourceType: 'module' 
  },
  settings: { 
    react: { version: 'detect' } 
  },
  plugins: ['react-refresh', 'prettier'],
  rules: {
    'react/jsx-no-target-blank': ['warn', { allowReferrer: true }], // Prevent security issues
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'react-hooks/exhaustive-deps': 'warn', // Warn if dependencies are missing in useEffect
    'no-unused-vars': 'warn', // Warn about unused variables
    'prettier/prettier': 'warn' // Ensure Prettier formatting consistency
  },
}
