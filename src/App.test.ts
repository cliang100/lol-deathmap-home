import { describe, it, expect } from 'vitest'
import { parseRiotId } from './App'

describe('parseRiotId', () => {
  it('accepts a valid input', () => {
    expect(parseRiotId('Faker#KR1')).toEqual({
      ok: true,
      gameName: 'Faker',
      tagLine: 'KR1',
    })
  })

  it('trims whitespace around name and tag', () => {
    expect(parseRiotId('  Faker  #  KR1  ')).toEqual({
      ok: true,
      gameName: 'Faker',
      tagLine: 'KR1',
    })
  })

  it('splits on the last "#" but rejects when the name contains "#"', () => {
    expect(parseRiotId('My#Name#KR1')).toEqual({
      ok: false,
      error: 'Game name contains invalid characters',
    })
  })

  it('rejects input with no "#"', () => {
    expect(parseRiotId('Faker')).toEqual({
      ok: false,
      error: 'Use the format Name#TAG',
    })
  })

  it('rejects an empty name', () => {
    expect(parseRiotId('#KR1')).toEqual({
      ok: false,
      error: 'Game name cannot be empty',
    })
  })

  it('rejects an empty tag', () => {
    expect(parseRiotId('Faker#')).toEqual({
      ok: false,
      error: 'Tag line cannot be empty',
    })
  })

  it('rejects a tag that is too long', () => {
    expect(parseRiotId(`Name#${'a'.repeat(11)}`)).toEqual({
      ok: false,
      error: 'Tag line must be 1 to 10 characters',
    })
  })

  it('rejects a tag with a symbol', () => {
    expect(parseRiotId('Name#a!b')).toEqual({
      ok: false,
      error: 'Tag line contains invalid characters',
    })
  })

  it('accepts a non-Latin tag', () => {
    expect(parseRiotId('Name#한국어')).toEqual({
      ok: true,
      gameName: 'Name',
      tagLine: '한국어',
    })
  })

  it.each(['/', '\\', '?', '#', '%'])(
    'rejects a name containing %s',
    (char) => {
      expect(parseRiotId(`Name${char}#KR1`)).toEqual({
        ok: false,
        error: 'Game name contains invalid characters',
      })
    },
  )

  it('rejects a name over 64 characters', () => {
    expect(parseRiotId(`${'a'.repeat(65)}#KR1`)).toEqual({
      ok: false,
      error: 'Game name must be at most 64 characters',
    })
  })
})