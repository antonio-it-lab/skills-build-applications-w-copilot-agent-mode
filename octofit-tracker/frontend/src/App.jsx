import './App.css'

function App() {
  return (
    <main className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-sm border-0 rounded-4">
            <div className="card-body p-5 text-center">
              <span className="badge bg-primary-subtle text-primary fw-semibold mb-3">OctoFit Tracker</span>
              <h1 className="display-5 fw-bold mb-3">Stay on top of every workout</h1>
              <p className="lead text-secondary mb-4">
                Track activities, build stronger routines, and compete with your team in one modern dashboard.
              </p>
              <div className="d-flex justify-content-center gap-3 flex-wrap">
                <button type="button" className="btn btn-primary btn-lg px-4">
                  View Leaderboard
                </button>
                <button type="button" className="btn btn-outline-primary btn-lg px-4">
                  Start Tracking
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default App
