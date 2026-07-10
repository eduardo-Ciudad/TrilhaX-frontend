import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { PrimaryButton, SecondaryButton } from '../ui/Button.jsx'
import BackgroundOrbs from '../ui/BackgroundOrbs.jsx'

function scrollToCareers(e) {
  e.preventDefault()
  document.querySelector('#carreiras')?.scrollIntoView({ behavior: 'smooth' })
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      <BackgroundOrbs variant="hero" />

      <div className="relative max-w-5xl mx-auto px-6">
        <div className="backdrop-blur-2xl bg-white/[0.03] border border-white/[0.08] rounded-3xl p-10 sm:p-12 md:p-16 shadow-[0_0_80px_rgba(139,92,246,0.08)] text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-sm uppercase tracking-wider text-trilha-purple-400 font-medium mb-6"
          >
            Plataforma de roadmaps de programação
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-white via-purple-200 to-trilha-purple-400 bg-clip-text text-transparent"
          >
            Sua trilha para o primeiro emprego em tech
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-lg md:text-xl text-trilha-text-secondary max-w-2xl mx-auto"
          >
            Roadmaps organizados por carreira, do zero ao deploy. Aprenda o que estudar, na ordem
            certa, sem perder tempo.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/register" className="w-full sm:w-auto">
              <PrimaryButton className="w-full sm:w-auto">Começar agora</PrimaryButton>
            </Link>
            <a href="#carreiras" onClick={scrollToCareers} className="w-full sm:w-auto">
              <SecondaryButton className="w-full sm:w-auto">Ver carreiras</SecondaryButton>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
