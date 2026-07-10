import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import BackgroundOrbs from '../components/ui/BackgroundOrbs.jsx'
import GlassCard from '../components/ui/GlassCard.jsx'
import Input from '../components/ui/Input.jsx'
import { PrimaryButton } from '../components/ui/Button.jsx'
import { useAuth } from '../hooks/useAuth.js'

export default function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [form, setForm] = useState({ email: '', senha: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(form.email, form.senha)
      navigate('/dashboard')
    } catch (err) {
      setError(
        err.response?.data?.message || 'Credenciais inválidas. Verifique seu email e senha.',
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
      <BackgroundOrbs variant="auth" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md"
      >
        <GlassCard>
          <Link to="/" className="block text-center text-2xl font-extrabold tracking-tight mb-8">
            Trilha
            <span className="bg-gradient-to-r from-trilha-purple-400 to-trilha-cyan-400 bg-clip-text text-transparent">
              X
            </span>
          </Link>

          <h1 className="text-2xl font-bold text-white text-center mb-6">Entrar na sua conta</h1>

          {error && (
            <div className="mb-5 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/20 text-sm text-red-400">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email"
              type="email"
              name="email"
              placeholder="seu@email.com"
              value={form.email}
              onChange={handleChange}
              required
            />
            <Input
              label="Senha"
              type="password"
              name="senha"
              placeholder="••••••••"
              value={form.senha}
              onChange={handleChange}
              required
            />

            <PrimaryButton type="submit" className="w-full" disabled={loading}>
              {loading ? 'Entrando...' : 'Entrar'}
            </PrimaryButton>
          </form>

          <p className="mt-6 text-center text-sm text-trilha-text-secondary">
            Não tem conta?{' '}
            <Link to="/register" className="text-trilha-purple-400 hover:text-trilha-purple-300 font-medium">
              Criar conta
            </Link>
          </p>

          <p className="mt-3 text-center text-sm">
            <Link to="/" className="text-trilha-text-muted hover:text-white transition-colors duration-200">
              Voltar para início
            </Link>
          </p>
        </GlassCard>
      </motion.div>
    </div>
  )
}
