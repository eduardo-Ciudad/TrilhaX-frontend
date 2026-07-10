import { motion } from 'framer-motion'
import { FiArrowRight } from 'react-icons/fi'
import GlassCard from '../ui/GlassCard.jsx'
import BackgroundOrbs from '../ui/BackgroundOrbs.jsx'

const careers = [
  {
    name: 'Backend Java',
    description: 'Spring Boot, APIs REST, bancos de dados e arquitetura de sistemas.',
    roadmaps: 8,
  },
  {
    name: 'Frontend React',
    description: 'JavaScript moderno, React, hooks, e boas práticas de UI.',
    roadmaps: 6,
  },
  {
    name: 'Fullstack',
    description: 'Domine frontend e backend para construir produtos completos.',
    roadmaps: 10,
  },
  {
    name: 'DevOps',
    description: 'CI/CD, containers, cloud e automação de infraestrutura.',
    roadmaps: 5,
  },
]

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

const item = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

export default function Careers() {
  return (
    <section id="carreiras" className="relative py-24 md:py-32 overflow-hidden">
      <BackgroundOrbs variant="section" />
      <div className="relative max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold">Carreiras disponíveis</h2>
          <p className="mt-4 text-lg text-trilha-text-secondary">
            Trilhas organizadas para cada perfil de desenvolvedor
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {careers.map((career) => (
            <motion.div key={career.name} variants={item} whileHover={{ scale: 1.02 }}>
              <GlassCard className="h-full cursor-pointer group">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold text-white">{career.name}</h3>
                  <FiArrowRight className="text-trilha-text-muted group-hover:text-trilha-purple-400 group-hover:translate-x-1 transition-all duration-200" />
                </div>
                <p className="text-trilha-text-secondary mb-5">{career.description}</p>
                <span className="inline-block text-xs font-medium px-3 py-1.5 rounded-full bg-trilha-purple-600/15 border border-trilha-purple-500/20 text-trilha-purple-400">
                  {career.roadmaps} roadmaps disponíveis
                </span>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
