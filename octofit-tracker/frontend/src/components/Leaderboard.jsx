import { useEffect, useState } from 'react'
import { fetchEndpoint } from '../api'

const endpointPath = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
  : 'http://localhost:8000/api/leaderboard/'

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    fetchEndpoint(endpointPath, 'leaderboard')
      .then((records) => {
        if (isMounted) {
          setLeaderboard(records)
          setStatus('ready')
        }
      })
      .catch((requestError) => {
        if (isMounted) {
          setError(requestError.message)
          setStatus('error')
        }
      })

    return () => {
      isMounted = false
    }
  }, [])

  if (status === 'loading') {
    return <p className="text-secondary">Loading leaderboard...</p>
  }

  if (status === 'error') {
    return <p className="text-danger">{error}</p>
  }

  return (
    <div className="leaderboard-list">
      {leaderboard.map((entry) => (
        <article className="leader-row" key={entry._id ?? entry.rank}>
          <div className="rank">#{entry.rank}</div>
          <div>
            <h2>{entry.userName}</h2>
            <p>{entry.teamName}</p>
          </div>
          <dl>
            <dt>Points</dt>
            <dd>{entry.points}</dd>
            <dt>Workouts</dt>
            <dd>{entry.workoutsCompleted}</dd>
            <dt>Minutes</dt>
            <dd>{entry.activeMinutes}</dd>
          </dl>
        </article>
      ))}
    </div>
  )
}

export default Leaderboard
