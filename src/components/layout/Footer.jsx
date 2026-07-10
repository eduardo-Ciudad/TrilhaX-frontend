import { FiInstagram } from 'react-icons/fi'

export default function Footer() {
  return (
    <footer id="contato" className="bg-trilha-surface border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-xl font-extrabold tracking-tight">
          Trilha
          <span className="bg-gradient-to-r from-trilha-purple-400 to-trilha-cyan-400 bg-clip-text text-transparent">
            X
          </span>
        </div>

        <div className="flex items-center gap-6 text-sm text-trilha-text-secondary">
          <a href="#como-funciona" className="hover:text-white transition-colors duration-200">
            Como funciona
          </a>
          <a href="#carreiras" className="hover:text-white transition-colors duration-200">
            Carreiras
          </a>
          <a href="#planos" className="hover:text-white transition-colors duration-200">
            Planos
          </a>
        </div>

        <a
          href="https://instagram.com/ciudad_dev"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 text-sm text-trilha-text-secondary hover:text-white transition-colors duration-200"
        >
          <FiInstagram size={18} />
          @ciudad_dev
        </a>
      </div>

      <div className="border-t border-white/5 py-6 text-center text-sm text-trilha-text-muted">
        © 2026 TrilhaX. Todos os direitos reservados.
      </div>
    </footer>
  )
}
