import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import { getApiBaseUrl } from './utils/api.js'
import './App.css'

const navItems = [
  { to: '/users', label: 'Users' },
  { to: '/activities', label: 'Activities' },
  { to: '/teams', label: 'Teams' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/workouts', label: 'Workouts' },
]

function App() {
  const apiBaseUrl = getApiBaseUrl()

  return (
    <main className="container py-5">
      <div className="row justify-content-center mb-4">
        <div className="col-lg-10">
          <div className="card shadow-sm border-0 rounded-4">
            <div className="card-body p-5 text-center">
              <span className="badge bg-primary-subtle text-primary fw-semibold mb-3">OctoFit Tracker</span>
              <h1 className="display-5 fw-bold mb-3">Stay on top of every workout</h1>
              <p className="lead text-secondary mb-4">
                Track activities, build stronger routines, and compete with your team in one modern dashboard.
              </p>
              <div className="text-start small text-muted">API: {apiBaseUrl}</div>
              <div className="mt-3 small text-muted">
                Set VITE_CODESPACE_NAME in .env.local for Codespaces; otherwise the app falls back to http://localhost:8000.
              </div>
            </div>
          </div>
        </div>
      </div>

      <nav className="navbar navbar-expand-lg bg-white rounded-4 shadow-sm mb-4 border">
        <div className="container-fluid px-3 py-2">
          <span className="navbar-brand mb-0 h5">OctoFit</span>
          <div className="navbar-nav flex-row flex-wrap gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => `nav-link px-3 py-2 rounded-pill ${isActive ? 'bg-primary text-white' : 'text-dark'}`}
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Navigate to="/users" replace />} />
        <Route path="/users" element={<Users />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/workouts" element={<Workouts />} />
      </Routes>
    </main>
  )
}

export default App
