import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiCheck } from 'react-icons/fi'
import { PrimaryButton } from '../ui/Button.jsx'

const plans = [
  {
    name: 'Plano Mensal',
    price: 'R$29,90',
    period: '/mês',
    highlight: false,
    benefits: [
      'Acesso a todas as carreiras',
      'Todos os roadmaps liberados',
      'Atualizações constantes',
      'Suporte via comunidade',
    ],
  },
  {
    name: 'Plano Anual',
    price: 'R$249,90',
    period: '/ano',
    highlight: true,
    benefits: [
      'Acesso a todas as carreiras',
      'Todos os roadmaps liberados',
      'Atualizações constantes',
      'Suporte prioritário',
      '2 meses grátis',
    ],
  },
]

export default function Plans() {
  return (
    <section id="planos" className="relative py-24 md:py-32">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold">Escolha seu plano</h2>
          <p className="mt-4 text-lg text-trilha-text-secondary">
            Acesso completo a todas as carreiras
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ scale: 1.02 }}
              className={`relative backdrop-blur-xl bg-white/5 border rounded-2xl p-8 ${
                plan.highlight
                  ? 'border-trilha-purple-500/50 shadow-[0_0_45px_rgba(139,92,246,0.15)]'
                  : 'border-white/10'
              }`}
            >
              {plan.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-medium px-3 py-1 rounded-full bg-trilha-purple-600 text-white">
                  Melhor custo-benefício
                </span>
              )}

              <h3 className="text-xl font-bold text-white">{plan.name}</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-white">{plan.price}</span>
                <span className="text-trilha-text-secondary">{plan.period}</span>
              </div>

              <ul className="mt-6 space-y-3">
                {plan.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-center gap-3 text-trilha-text-secondary">
                    <FiCheck className="text-trilha-purple-400 shrink-0" size={18} />
                    {benefit}
                  </li>
                ))}
              </ul>

              <Link to="/register" className="block mt-8">
                <PrimaryButton className="w-full">Assinar agora</PrimaryButton>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
