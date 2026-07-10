import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import BackgroundOrbs from '../components/ui/BackgroundOrbs.jsx'
import GlassCard from '../components/ui/GlassCard.jsx'
import Input from '../components/ui/Input.jsx'
import { PrimaryButton } from '../components/ui/Button.jsx'
import { useAuth } from '../hooks/useAuth.js'

function validate(form) {
  const errors = {}

  if (!form.nome.trim()) {
    errors.nome = 'Nome é obrigatório.'
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Informe um email válido.'
  }

  if (form.senha.length < 6) {
    errors.senha = 'A senha deve ter no mínimo 6 caracteres.'
  }

  if (form.confirmarSenha !== form.senha) {
    errors.confirmarSenha = 'As senhas não coincidem.'
  }

  return errors
}

export default function Register() {
  const navigate = useNavigate()
  const { register } = useAuth()
  const [form, setForm] = useState({ nome: '', email: '', senha: '', confirmarSenha: '' })
  const [errors, setErrors] = useState({})
  const [apiError, setApiError] = useState('')
  const [loading, setLoading] = useState(false)

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setApiError('')

    const validationErrors = validate(form)
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) return

    setLoading(true)
    try {
      await register(form.nome, form.email, form.senha)
      navigate('/dashboard')
    } catch (err) {
      setApiError(
        err.response?.data?.message || 'Não foi possível criar sua conta. Tente novamente.',
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center px-6 py-12 overflow-hidden">
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

          <h1 className="text-2xl font-bold text-white text-center mb-6">Criar sua conta</h1>

          {apiError && (
            <div className="mb-5 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/20 text-sm text-red-400">
              {apiError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Nome"
              name="nome"
              placeholder="Seu nome completo"
              value={form.nome}
              onChange={handleChange}
              error={errors.nome}
            />
            <Input
              label="Email"
              type="email"
              name="email"
              placeholder="seu@email.com"
              value={form.email}
              onChange={handleChange}
              error={errors.email}
            />
            <Input
              label="Senha"
              type="password"
              name="senha"
              placeholder="••••••••"
              value={form.senha}
              onChange={handleChange}
              error={errors.senha}
            />
            <Input
              label="Confirmar senha"
              type="password"
              name="confirmarSenha"
              placeholder="••••••••"
              value={form.confirmarSenha}
              onChange={handleChange}
              error={errors.confirmarSenha}
            />

            <PrimaryButton type="submit" className="w-full" disabled={loading}>
              {loading ? 'Criando conta...' : 'Criar conta'}
            </PrimaryButton>
          </form>

          <p className="mt-6 text-center text-sm text-trilha-text-secondary">
            Já tem conta?{' '}
            <Link to="/login" className="text-trilha-purple-400 hover:text-trilha-purple-300 font-medium">
              Entrar
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
