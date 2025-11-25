import type { ReactNode } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export const Layout = ({ children }: { children: ReactNode }) => {
  const { user, logout } = useAuth()

  return (
    <div className="app-shell">
      <header className="app-header">
        <Link to="/" className="brand">
          User Manager
        </Link>
        <nav>
          <NavLink to="/" end className="nav-link">
            Home
          </NavLink>
          {user && (
            <>
              <NavLink to="/users" className="nav-link">
                Users
              </NavLink>
              <NavLink to="/tasks" className="nav-link">
                Tasks
              </NavLink>
            </>
          )}
          <span className="nav-link status-pill">
            <span className="status-dot" />
            API Live
          </span>
          {user ? (
            <>
              <span className="nav-link user-badge">{user.name}</span>
              <button onClick={logout} className="button ghost small">
                Logout
              </button>
            </>
          ) : (
            <NavLink to="/login" className="button primary small">
              Login
            </NavLink>
          )}
        </nav>
      </header>
      <main className="app-main">{children}</main>
      <footer className="app-footer">
        <p>React CRUD demo powered by JSONPlaceholder.</p>
      </footer>
    </div>
  )
}
