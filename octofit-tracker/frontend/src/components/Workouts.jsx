import { useEffect, useState } from 'react'
import { fetchEndpoint } from '../api'

const endpointPath = '/api/workouts/'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    fetchEndpoint(endpointPath, 'workouts')
      .then((records) => {
        if (isMounted) {
          setWorkouts(records)
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
    return <p className="text-secondary">Loading workouts...</p>
  }

  if (status === 'error') {
    return <p className="text-danger">{error}</p>
  }

  return (
    <div className="row g-3">
      {workouts.map((workout) => (
        <div className="col-lg-4" key={workout._id ?? workout.title}>
          <article className="data-card workout-card h-100">
            <div className="eyebrow">{workout.category}</div>
            <h2>{workout.title}</h2>
            <p>{workout.coachNotes}</p>
            <div className="badge-row">
              <span>{workout.difficulty}</span>
              <span>{workout.durationMinutes} min</span>
            </div>
            <dl>
              <dt>Equipment</dt>
              <dd>{workout.equipment?.join(', ')}</dd>
              <dt>Focus</dt>
              <dd>{workout.focusAreas?.join(', ')}</dd>
            </dl>
          </article>
        </div>
      ))}
    </div>
  )
}

export default Workouts
