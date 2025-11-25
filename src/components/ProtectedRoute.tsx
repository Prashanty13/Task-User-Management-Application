import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { LoadingSpinner } from './LoadingSpinner'

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth()

  if (loading) return <LoadingSpinner label="Loading..." />
  if (!user) return <Navigate to="/login" replace />

  return <>{children}</>
}
