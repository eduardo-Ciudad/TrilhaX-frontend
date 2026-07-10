import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiMenu, FiX } from 'react-icons/fi'
import { PrimaryButton } from '../ui/Button.jsx'

const links = [
  { label: 'Como funciona', href: '#como-funciona' },
  { label: 'Carreiras', href: '#carreiras' },
  { label: 'Planos', href: '#planos' },
  { label: 'Contato', href: '#contato' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  function handleScroll(e, href) {
    e.preventDefault()
    setOpen(false)
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate('/')
    }
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-trilha-bg/70 border-b border-white/5 shadow-lg shadow-black/10">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="text-xl font-extrabold tracking-tight">
          Trilha
          <span className="bg-gradient-to-r from-trilha-purple-400 to-trilha-cyan-400 bg-clip-text text-transparent">
            X
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleScroll(e, link.href)}
              className="text-sm font-medium text-trilha-text-secondary hover:text-white transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:block">
          <Link to="/register">
            <PrimaryButton className="px-5 py-2.5 text-sm">Começar agora</PrimaryButton>
          </Link>
        </div>

        <button
          className="md:hidden text-white p-2"
          onClick={() => setOpen((v) => !v)}
          aria-label="Abrir menu"
        >
          {open ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden backdrop-blur-xl bg-trilha-bg/95 border-b border-white/5 px-6 py-6 flex flex-col gap-5">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleScroll(e, link.href)}
              className="text-sm font-medium text-trilha-text-secondary hover:text-white transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
          <Link to="/register" onClick={() => setOpen(false)}>
            <PrimaryButton className="w-full text-sm">Começar agora</PrimaryButton>
          </Link>
        </div>
      )}
    </nav>
  )
}
