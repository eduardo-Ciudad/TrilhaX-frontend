import { motion } from 'framer-motion'
import { FiUserPlus, FiMap, FiBookOpen } from 'react-icons/fi'
import GlassCard from '../ui/GlassCard.jsx'

const steps = [
  {
    icon: FiUserPlus,
    title: 'Crie sua conta',
    description: 'Registre-se em segundos e escolha seu plano.',
  },
  {
    icon: FiMap,
    title: 'Escolha sua carreira',
    description: 'Backend, Frontend, Fullstack... encontre sua trilha.',
  },
  {
    icon: FiBookOpen,
    title: 'Siga o roadmap',
    description: 'Estude os tópicos na ordem certa, do básico ao avançado.',
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

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="relative py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-center"
        >
          Como funciona
        </motion.h2>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {steps.map((step) => (
            <motion.div key={step.title} variants={item} whileHover={{ scale: 1.02 }}>
              <GlassCard className="h-full">
                <div className="w-12 h-12 rounded-lg bg-trilha-purple-600/15 border border-trilha-purple-500/20 flex items-center justify-center mb-5">
                  <step.icon className="text-trilha-purple-400" size={22} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                <p className="text-trilha-text-secondary">{step.description}</p>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
