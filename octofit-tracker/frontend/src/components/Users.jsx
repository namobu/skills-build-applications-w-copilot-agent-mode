import { useEffect, useState } from 'react'
import { fetchCollection } from '../api'

function Users() {
  const [users, setUsers] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    fetchCollection('users', 'users')
      .then((records) => {
        if (isMounted) {
          setUsers(records)
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
    return <p className="text-secondary">Loading users...</p>
  }

  if (status === 'error') {
    return <p className="text-danger">{error}</p>
  }

  return (
    <div className="row g-3">
      {users.map((user) => (
        <div className="col-md-6 col-xl-4" key={user._id ?? user.email}>
          <article className="data-card h-100">
            <div className="eyebrow">{user.role}</div>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            <dl>
              <dt>Team</dt>
              <dd>{user.team}</dd>
              <dt>Goal</dt>
              <dd>{user.fitnessGoal}</dd>
            </dl>
          </article>
        </div>
      ))}
    </div>
  )
}

export default Users
