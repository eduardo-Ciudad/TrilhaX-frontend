export default function GlassCard({ children, className = '', highlight = false }) {
  return (
    <div
      className={`backdrop-blur-xl bg-white/5 border ${
        highlight ? 'border-trilha-purple-500/40' : 'border-white/10'
      } rounded-2xl p-6 md:p-8 ${className}`}
    >
      {children}
    </div>
  )
}
