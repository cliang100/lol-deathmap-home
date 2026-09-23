import './App.css'

function App() {
  return (
    <>
      <section className="hero">
        <h1>LoL Death Map</h1>
        <p>See exactly where you keep dying on Summoner's Rift.</p>
        <a href="http://localhost:3000" className="cta-button">
          Try it now
        </a>
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