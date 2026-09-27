import { describe, it, expect } from 'vitest'
import { parseRiotId } from './App'

describe('parseRiotId', () => {
  it('splits name and tag', () => {
    expect(parseRiotId('Faker#KR1')).toEqual({ gameName: 'Faker', tagLine: 'KR1' })
  })

  it('trims whitespace', () => {
    expect(parseRiotId('Faker # KR1')).toEqual({ gameName: 'Faker', tagLine: 'KR1' })
  })

  it('returns undefined tagLine when no # present', () => {
    expect(parseRiotId('Faker')).toEqual({ gameName: 'Faker', tagLine: undefined })
  })
})