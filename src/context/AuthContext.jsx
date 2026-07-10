import { createContext, useEffect, useState } from 'react'
import api from '../services/api'

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(() => localStorage.getItem('trilhax_token'))
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem('trilhax_user')
    if (token && storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [token])

  function persistSession(data) {
    const { token: newToken, ...userData } = data
    localStorage.setItem('trilhax_token', newToken)
    localStorage.setItem('trilhax_user', JSON.stringify(userData))
    setToken(newToken)
    setUser(userData)
  }

  async function login(email, senha) {
    const { data } = await api.post('/auth/login', { email, senha })
    persistSession(data)
    return data
  }

  async function register(nome, email, senha) {
    const { data } = await api.post('/auth/register', { nome, email, senha })
    persistSession(data)
    return data
  }

  function logout() {
    localStorage.removeItem('trilhax_token')
    localStorage.removeItem('trilhax_user')
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{ user, token, loading, login, register, logout, isAuthenticated: !!token }}
    >
      {children}
    </AuthContext.Provider>
  )
}
