import { Navigate, useNavigate } from 'react-router-dom'
import GlassCard from '../components/ui/GlassCard.jsx'
import { SecondaryButton } from '../components/ui/Button.jsx'
import BackgroundOrbs from '../components/ui/BackgroundOrbs.jsx'
import { useAuth } from '../hooks/useAuth.js'

export default function Dashboard() {
  const navigate = useNavigate()
  const { user, isAuthenticated, loading, logout } = useAuth()

  if (loading) return null
  if (!isAuthenticated) return <Navigate to="/login" replace />

  function handleLogout() {
    logout()
    navigate('/')
  }

  return (
    <div className="relative min-h-screen bg-trilha-bg overflow-hidden">
      <BackgroundOrbs variant="hero" />

      <nav className="relative z-10 flex items-center justify-between px-6 h-16 border-b border-white/5 backdrop-blur-md bg-trilha-bg/80">
        <div className="text-xl font-extrabold tracking-tight">
          Trilha
          <span className="bg-gradient-to-r from-trilha-purple-400 to-trilha-cyan-400 bg-clip-text text-transparent">
            X
          </span>
        </div>
        <SecondaryButton onClick={handleLogout} className="px-5 py-2.5 text-sm">
          Sair
        </SecondaryButton>
      </nav>

      <main className="relative flex items-center justify-center px-6 py-24">
        <GlassCard className="max-w-md w-full text-center">
          <h1 className="text-2xl font-bold text-white">Bem-vindo, {user?.nome}!</h1>
          <p className="mt-3 text-trilha-text-secondary">
            Seu painel de trilhas está em construção. Em breve você poderá acompanhar seu progresso por aqui.
          </p>
        </GlassCard>
      </main>
    </div>
  )
}
