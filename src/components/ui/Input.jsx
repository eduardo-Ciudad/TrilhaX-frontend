export default function Input({ label, error, className = '', ...props }) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-trilha-text-secondary mb-2">
          {label}
        </label>
      )}
      <input
        className={`w-full px-4 py-3 rounded-lg bg-white/5 border ${
          error ? 'border-red-500/60' : 'border-white/10'
        } text-white placeholder-trilha-text-muted focus:outline-none focus:border-trilha-purple-500/60 focus:bg-white/[0.07] transition-colors duration-200 ${className}`}
        {...props}
      />
      {error && <p className="mt-1.5 text-sm text-red-400">{error}</p>}
    </div>
  )
}
