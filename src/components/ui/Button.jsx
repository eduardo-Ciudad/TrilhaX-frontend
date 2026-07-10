export function PrimaryButton({ children, className = '', ...props }) {
  return (
    <button
      className={`px-6 py-3 bg-trilha-purple-600 hover:bg-trilha-purple-500 text-white font-medium rounded-lg transition-all duration-300 shadow-[0_0_30px_rgba(139,92,246,0.35)] hover:shadow-[0_0_45px_rgba(139,92,246,0.5)] disabled:opacity-60 disabled:cursor-not-allowed ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export function SecondaryButton({ children, className = '', ...props }) {
  return (
    <button
      className={`px-6 py-3 backdrop-blur-sm bg-white/5 border border-white/10 text-white font-medium rounded-lg hover:bg-white/10 transition-all duration-300 ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
