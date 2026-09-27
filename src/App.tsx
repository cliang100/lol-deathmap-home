import { useState } from 'react'
import './App.css'

export function parseRiotId(raw: string): { gameName: string; tagLine: string } {
  const [gameName, tagLine] = raw.split('#').map((s) => s.trim())
  return { gameName, tagLine }
}

function App() {
  const [riotId, setRiotId] = useState('')
  const [region, setRegion] = useState('na1')
  const [isSearching, setIsSearching] = useState(false)

  const handleSearch = async () => {
    const { gameName, tagLine } = parseRiotId(riotId)
    if (!gameName || !tagLine) return

    setIsSearching(true)
    const res = await fetch(`http://localhost:3000/api/deaths/${region}/${gameName}/${tagLine}`)

    if (!res.ok) {
        setIsSearching(false)
        return
    }

    const deaths = await res.json()
    sessionStorage.setItem('deathData', JSON.stringify(deaths))
    window.location.href = `http://localhost:3000/index.html?riotId=${gameName}&tag=${tagLine}&region=${region}`
  }

  return (
    <>
      <section className="hero">
        <h1>LoL Death Map</h1>
        <p>See exactly where you keep dying on Summoner's Rift.</p>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Game name + #NA1"
            value={riotId}
            onChange={(e) => setRiotId(e.target.value)}
          />
          <select value={region} onChange={(e) => setRegion(e.target.value)}>
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
          <button onClick={handleSearch} disabled={isSearching}>
            {isSearching ? 'Loading...' : 'Search'}
          </button>
        </div>
      </section>

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
    </>
  )
}

export default App