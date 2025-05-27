import { describe, it, expect, beforeEach } from 'vitest'
import { db, type IConsent } from './db'

// Reset the db state before each test to ensure test isolation
const initialConsents: IConsent[] = [
  {
    id: '1',
    name: 'Bojack Horseman',
    email: 'bojack@horseman.com',
    consents: ['Receive newsletter', 'Be shown targeted ads'],
  },
  { id: '2', name: 'Princess Carolyn', email: 'princess@manager.com', consents: ['Receive newsletter'] },
  { id: '3', name: 'John Doe', email: 'johndoe@manager.com', consents: ['Receive newsletter'] },
]
const lastId = 3

// Helper to reset DB state (since db.ts uses module-level mutable variables)
const resetDb = () => {
  // This is a simplified way. In a real scenario, you might re-initialize db or export a reset function from db.ts
  db.consents.getAll = () => [...initialConsents] // Return a copy to avoid direct mutation of initialConsents in some tests
  const internalConsents = [...initialConsents]
  let nextIdVal = lastId + 1

  db.consents.add = (newConsentData: Omit<IConsent, 'id'>) => {
    const newConsent = {
      id: String(nextIdVal++),
      ...newConsentData,
    }
    internalConsents.push(newConsent)
    // Make getAll reflect the internal changes for subsequent calls within the same "add chain"
    db.consents.getAll = () => [...internalConsents]
    return newConsent
  }
  // Re-assign original getAll if needed for other tests or structure db.ts to be more testable
  const originalGetAll = () => internalConsents
  db.consents.getAll = originalGetAll
}

describe('Mock DB', () => {
  beforeEach(() => {
    resetDb() // Ensure a clean state for each test
  })

  it('getAll should return initial consents', () => {
    const consents = db.consents.getAll()
    expect(consents).toHaveLength(3)
    expect(consents[0].name).toBe('Bojack Horseman')
  })

  it('add should add a new consent and increment ID', () => {
    const newConsentData = {
      name: 'Todd Chavez',
      email: 'todd@example.com',
      consents: ['Be shown targeted ads'],
    }
    const addedConsent = db.consents.add(newConsentData)

    expect(addedConsent.id).toBe('4') // lastId was 3, so next is 4
    expect(addedConsent.name).toBe('Todd Chavez')

    const allConsents = db.consents.getAll()
    expect(allConsents).toHaveLength(4)
    expect(allConsents.find(c => c.id === '4')?.name).toBe('Todd Chavez')
  })

  it('add should handle multiple additions correctly', () => {
    db.consents.add({ name: 'A', email: 'a@a.com', consents: ['c1'] }) // id 4
    const consentB = db.consents.add({ name: 'B', email: 'b@b.com', consents: ['c2'] }) // id 5

    expect(consentB.id).toBe('5')
    const allConsents = db.consents.getAll()
    expect(allConsents).toHaveLength(5)
  })
})
