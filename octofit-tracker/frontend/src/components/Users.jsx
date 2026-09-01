import { useEffect, useState } from 'react'

function Users() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    async function loadUsers() {
      try {
        const codespaceName = import.meta.env.VITE_CODESPACE_NAME
        const apiUrl = codespaceName
          ? `https://${codespaceName}-8000.app.github.dev/api/users/`
          : 'http://localhost:8000/api/users/'

        const response = await fetch(apiUrl)

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        const payload = await response.json()
        const data = Array.isArray(payload) ? payload : Array.isArray(payload?.results) ? payload.results : []

        if (isMounted) {
          setUsers(data)
        }
      } catch (err) {
        if (isMounted) {
          console.error(err)
          setError('Unable to load users from the API.')
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    loadUsers()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <section className="card shadow-sm border-0 rounded-4 h-100">
      <div className="card-header bg-white border-0 pt-4">
        <h2 className="h4 mb-0">Users</h2>
      </div>
      <div className="card-body">
        {loading ? (
          <p className="text-muted mb-0">Loading users...</p>
        ) : error ? (
          <div className="alert alert-danger mb-0">{error}</div>
        ) : (
          <ul className="list-group list-group-flush">
            {users.map((user) => (
              <li key={user._id || user.email || user.name} className="list-group-item">
                <div className="d-flex justify-content-between align-items-center gap-3">
                  <div>
                    <strong>{user.name}</strong>
                    <div className="text-muted small">{user.email}</div>
                  </div>
                  <span className="badge bg-primary-subtle text-primary rounded-pill">{user.team}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}

export default Users
