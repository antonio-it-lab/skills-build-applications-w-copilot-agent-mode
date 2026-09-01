import { useEffect, useState } from 'react'
import { fetchJson } from '../utils/api.js'

function Activities() {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    async function loadActivities() {
      try {
        const data = await fetchJson('/api/activities/')
        if (isMounted) {
          setActivities(data)
        }
      } catch (err) {
        if (isMounted) {
          console.error(err)
          setError('Unable to load activities from the API.')
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    loadActivities()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <section className="card shadow-sm border-0 rounded-4 h-100">
      <div className="card-header bg-white border-0 pt-4">
        <h2 className="h4 mb-0">Activities</h2>
      </div>
      <div className="card-body">
        {loading ? (
          <p className="text-muted mb-0">Loading activities...</p>
        ) : error ? (
          <div className="alert alert-danger mb-0">{error}</div>
        ) : (
          <ul className="list-group list-group-flush">
            {activities.map((activity) => (
              <li key={activity._id || `${activity.type}-${activity.date}`} className="list-group-item">
                <div className="d-flex justify-content-between align-items-center gap-3">
                  <div>
                    <strong>{activity.type}</strong>
                    <div className="text-muted small">{new Date(activity.date).toLocaleDateString()}</div>
                  </div>
                  <span className="badge bg-success-subtle text-success rounded-pill">{activity.duration} min</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}

export default Activities
