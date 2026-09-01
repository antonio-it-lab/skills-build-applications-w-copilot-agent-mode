import { useEffect, useState } from 'react'
import { fetchJson } from '../utils/api.js'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    async function loadWorkouts() {
      try {
        const data = await fetchJson('/api/workouts/')
        if (isMounted) {
          setWorkouts(data)
        }
      } catch (err) {
        if (isMounted) {
          console.error(err)
          setError('Unable to load workouts from the API.')
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    loadWorkouts()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <section className="card shadow-sm border-0 rounded-4 h-100">
      <div className="card-header bg-white border-0 pt-4">
        <h2 className="h4 mb-0">Workouts</h2>
      </div>
      <div className="card-body">
        {loading ? (
          <p className="text-muted mb-0">Loading workouts...</p>
        ) : error ? (
          <div className="alert alert-danger mb-0">{error}</div>
        ) : (
          <ul className="list-group list-group-flush">
            {workouts.map((workout) => (
              <li key={workout._id || workout.title} className="list-group-item">
                <div className="d-flex justify-content-between align-items-center gap-3">
                  <div>
                    <strong>{workout.title}</strong>
                    <div className="text-muted small">{workout.focus} • {workout.difficulty}</div>
                  </div>
                  <span className="badge bg-secondary-subtle text-secondary rounded-pill">{workout.duration} min</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}

export default Workouts
