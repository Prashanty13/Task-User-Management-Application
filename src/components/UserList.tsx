import { Link } from 'react-router-dom'
import type { User } from '../types/user'

type UserListProps = {
  users: User[]
  onEdit: (user: User) => void
  onDelete: (id: number) => void
  busyUserId: number | null
}

export const UserList = ({
  users,
  onDelete,
  onEdit,
  busyUserId
}: UserListProps) => {
  if (!users.length) {
    return <p>No users available. Try creating one!</p>
  }

  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <div className="user-cell">
                  <div className="avatar-chip">{user.name.slice(0, 1)}</div>
                  <div>
                    <p className="user-name">{user.name}</p>
                    <p className="user-meta">{user.company?.name ?? 'Independent'}</p>
                  </div>
                </div>
              </td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td className="actions">
                <Link className="button ghost" to={`/users/${user.id}`}>
                  View
                </Link>
                <button
                  type="button"
                  className="button secondary"
                  onClick={() => onEdit(user)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="button danger"
                  onClick={() => onDelete(user.id)}
                  disabled={busyUserId === user.id}
                >
                  {busyUserId === user.id ? 'Deleting...' : 'Delete'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

