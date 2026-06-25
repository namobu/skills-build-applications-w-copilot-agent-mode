import { useEffect, useState } from 'react'
import { fetchEndpoint } from '../api'

const endpointPath = '/api/activities/'

function formatDate(value) {
  if (!value) {
    return 'Not logged'
  }

  return new Intl.DateTimeFormat(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(value))
}

function Activities() {
  const [activities, setActivities] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    fetchEndpoint(endpointPath, 'activities')
      .then((records) => {
        if (isMounted) {
          setActivities(records)
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
    return <p className="text-secondary">Loading activities...</p>
  }

  if (status === 'error') {
    return <p className="text-danger">{error}</p>
  }

  return (
    <div className="table-responsive data-table-wrap">
      <table className="table align-middle mb-0">
        <thead>
          <tr>
            <th>Activity</th>
            <th>User</th>
            <th>Duration</th>
            <th>Distance</th>
            <th>Calories</th>
            <th>Logged</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((activity) => (
            <tr key={activity._id ?? `${activity.userEmail}-${activity.loggedAt}`}>
              <td>{activity.type}</td>
              <td>{activity.userEmail}</td>
              <td>{activity.durationMinutes} min</td>
              <td>{activity.distanceKm} km</td>
              <td>{activity.caloriesBurned}</td>
              <td>{formatDate(activity.loggedAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Activities
