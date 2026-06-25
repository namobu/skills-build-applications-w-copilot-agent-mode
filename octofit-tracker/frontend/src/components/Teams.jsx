import { useEffect, useState } from 'react'
import { fetchCollection } from '../api'

function Teams() {
  const [teams, setTeams] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    fetchCollection('teams', 'teams')
      .then((records) => {
        if (isMounted) {
          setTeams(records)
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
    return <p className="text-secondary">Loading teams...</p>
  }

  if (status === 'error') {
    return <p className="text-danger">{error}</p>
  }

  return (
    <div className="row g-3">
      {teams.map((team) => (
        <div className="col-md-6 col-xl-4" key={team._id ?? team.name}>
          <article className="data-card h-100">
            <div className="eyebrow">{team.city}</div>
            <h2>{team.name}</h2>
            <p>{team.motto}</p>
            <dl>
              <dt>Members</dt>
              <dd>{team.memberCount}</dd>
              <dt>Weekly Goal</dt>
              <dd>{team.weeklyGoalMinutes} minutes</dd>
            </dl>
          </article>
        </div>
      ))}
    </div>
  )
}

export default Teams
