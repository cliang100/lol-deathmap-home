import { useState } from 'react'
import './App.css'
import { buildResultsUrl } from './redirect'

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

function App() {
  const [riotId, setRiotId] = useState('')
  const [region, setRegion] = useState('na1')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const parsed = parseRiotId(riotId)
    if (!parsed.ok) {
      setError(parsed.error)
      return
    }
    setError('')
    const { gameName, tagLine } = parsed

    window.location.href = buildResultsUrl(
      import.meta.env.VITE_RESULTS_URL,
      gameName,
      tagLine,
      region,
    )
  }

  return (
    <>
      <section className="hero">
        <h1>LoL Death Map</h1>
        <p>See exactly where you keep dying on Summoner's Rift.</p>

        <form className="search-wrap" onSubmit={handleSubmit}>
  <div className="search-bar">
    <select aria-label="Region" value={region} onChange={(e) => setRegion(e.target.value)}>
      <option value="na1">NA</option>
      <option value="euw1">EUW</option>
      <option value="eun1">EUNE</option>
      <option value="kr">KR</option>
      <option value="jp1">JP</option>
      <option value="br1">BR</option>
      <option value="la1">LAN</option>
      <option value="la2">LAS</option>
      <option value="oc1">OCE</option>
      <option value="tr1">TR</option>
      <option value="ru">RU</option>
    </select>
    <input
      aria-label="Riot ID"
      type="text"
      placeholder="Name#TAG"
      value={riotId}
      onChange={(e) => {
        setRiotId(e.target.value)
        setError("")
      }}
      aria-invalid={!!error}
      {...(error ? { "aria-describedby": "riot-id-error" } : {})}
    />
    <button
      type="submit"
      aria-label="Search"
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="7" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    </button>
  </div>
  {error && <p id="riot-id-error" className="search-error" role="alert">{error}</p>}
</form>      </section>

      <section className="how-it-works">
        <h2>How it works</h2>
        <div className="steps-row">
          <div className="step">
            <p className="step-number">1</p>
            <p>Enter your Riot ID</p>
          </div>
          <div className="step">
            <p className="step-number">2</p>
            <p>We pull your recent SR games</p>
          </div>
          <div className="step">
            <p className="step-number">3</p>
            <p>See your death hotspots</p>
          </div>
        </div>
      </section>
      <footer className="site-footer">
        <p>
          LoL Death Map isn't endorsed by Riot Games and doesn't reflect the views or opinions of Riot Games or anyone officially involved in producing or managing Riot Games properties. Riot Games, and all associated properties are trademarks or registered trademarks of Riot Games, Inc.
        </p>
      </footer>
    </>
  )
}

export default App