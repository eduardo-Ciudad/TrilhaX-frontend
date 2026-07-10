export default function BackgroundOrbs({ variant = 'default' }) {
  if (variant === 'auth') {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 -left-24 w-72 h-72 bg-trilha-purple-600/20 rounded-full blur-[120px] animate-float" />
        <div className="absolute bottom-0 -right-16 w-80 h-80 bg-trilha-blue-600/15 rounded-full blur-[130px] animate-float-delayed" />
      </div>
    )
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-1/4 -left-20 w-72 h-72 bg-trilha-purple-600/20 rounded-full blur-[120px] animate-float" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-trilha-blue-600/15 rounded-full blur-[150px] animate-float-delayed" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-trilha-cyan-500/10 rounded-full blur-[160px]" />
    </div>
  )
}
