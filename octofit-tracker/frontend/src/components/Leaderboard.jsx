import { useEffect, useState } from 'react'

function getApiBaseUrl() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME

  if (codespaceName && typeof codespaceName === 'string' && codespaceName.trim()) {
    return `https://${codespaceName.trim()}-8000.app.github.dev`
  }

  return 'http://localhost:8000'
}

function Leaderboard() {
  const [leaders, setLeaders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    async function loadLeaderboard() {
      try {
        const apiBaseUrl = getApiBaseUrl()
        const response = await fetch(`${apiBaseUrl}/api/leaderboard/`)

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        const payload = await response.json()
        const data = Array.isArray(payload) ? payload : Array.isArray(payload?.results) ? payload.results : []

        if (isMounted) {
          setLeaders(data)
        }
      } catch (err) {
        if (isMounted) {
          console.error(err)
          setError('Unable to load the leaderboard.')
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    loadLeaderboard()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <section className="card shadow-sm border-0 rounded-4 h-100">
      <div className="card-header bg-white border-0 pt-4">
        <h2 className="h4 mb-0">Leaderboard</h2>
      </div>
      <div className="card-body">
        {loading ? (
          <p className="text-muted mb-0">Loading leaderboard...</p>
        ) : error ? (
          <div className="alert alert-danger mb-0">{error}</div>
        ) : (
          <ol className="list-group list-group-numbered list-group-flush">
            {leaders.map((entry) => (
              <li key={entry._id || `${entry.rank}-${entry.name}`} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <strong>#{entry.rank}</strong> {entry.name}
                </div>
                <span className="badge bg-info-subtle text-info rounded-pill">{entry.score} pts</span>
              </li>
            ))}
          </ol>
        )}
      </div>
    </section>
  )
}

export default Leaderboard
