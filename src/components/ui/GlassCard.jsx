export default function GlassCard({ children, className = '', highlight = false }) {
  return (
    <div
      className={`backdrop-blur-xl bg-white/[0.04] border ${
        highlight ? 'border-trilha-purple-500/40' : 'border-white/[0.12]'
      } rounded-2xl p-6 md:p-8 shadow-lg shadow-black/20 transition-all duration-300 hover:bg-white/[0.08] hover:border-white/[0.15] ${className}`}
    >
      {children}
    </div>
  )
}
