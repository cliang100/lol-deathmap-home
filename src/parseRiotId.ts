export function parseRiotId(raw: string):
  | { ok: true; gameName: string; tagLine: string }
  | { ok: false; error: string } {
  const trimmed = raw.trim()
  const hashIndex = trimmed.lastIndexOf('#')
  if (hashIndex === -1) {
    return { ok: false, error: 'Use the format Name#TAG' }
  }
  const gameName = trimmed.slice(0, hashIndex).trim()
  const tagLine = trimmed.slice(hashIndex + 1).trim()
  if (!gameName) {
    return { ok: false, error: 'Game name cannot be empty' }
  }
  if (!tagLine) {
    return { ok: false, error: 'Tag line cannot be empty' }
  }
  if (gameName.length > 64) {
    return { ok: false, error: 'Game name must be at most 64 characters' }
  }
  if (/[/\\?#%]/.test(gameName)) {
    return { ok: false, error: 'Game name contains invalid characters' }
  }
  if (tagLine.length > 10) {
    return { ok: false, error: 'Tag line must be 1 to 10 characters' }
  }
  if (!/^[\p{L}\p{N}]{1,10}$/u.test(tagLine)) {
    return { ok: false, error: 'Tag line contains invalid characters' }
  }
  return { ok: true, gameName, tagLine }
}
