export default function BackgroundOrbs({ variant = 'section' }) {
  if (variant === 'hero') {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -mt-[300px] -ml-[400px] w-[800px] h-[600px] bg-trilha-purple-600/30 rounded-full blur-[150px] animate-drift" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-trilha-blue-600/25 rounded-full blur-[130px] animate-drift-slow" />
        <div className="absolute -top-20 -left-20 w-[500px] h-[500px] bg-trilha-cyan-500/15 rounded-full blur-[120px] animate-drift-slower" />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(139,92,246,0.08) 0%, transparent 70%)',
          }}
        />
      </div>
    )
  }

  if (variant === 'auth') {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 -left-24 w-[420px] h-[420px] bg-trilha-purple-600/20 rounded-full blur-[120px] animate-drift" />
        <div className="absolute bottom-0 -right-16 w-[440px] h-[440px] bg-trilha-blue-600/15 rounded-full blur-[130px] animate-drift-slow" />
      </div>
    )
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-trilha-purple-600/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-[350px] h-[350px] bg-trilha-blue-600/[0.08] rounded-full blur-[100px]" />
    </div>
  )
}
