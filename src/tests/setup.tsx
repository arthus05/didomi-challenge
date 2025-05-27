// src/tests/setup.ts
import '@testing-library/jest-dom' // Adds jest-dom matchers
import { cleanup } from '@testing-library/react'
import { afterEach, vi } from 'vitest'

// Optional: Mock window.alert globally as it's used in GiveConsent.tsx
// If you switch to MUI Snackbar/Alert, you might not need this global mock.
global.alert = vi.fn()

// Optional: Automatically clean up the DOM after each test
afterEach(() => {
  cleanup()
})
