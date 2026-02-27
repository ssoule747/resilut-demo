import { useState, useRef, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

// --- Flow field function ---
function flowAngle(x, y, time) {
  const scale = 0.003
  const angle =
    Math.sin(x * scale + time * 0.2) *
      Math.cos(y * scale * 0.8 + time * 0.15) *
      Math.PI *
      2 +
    Math.sin(x * scale * 0.5 + y * scale * 0.3 + time * 0.1) * Math.PI * 0.5
  return angle
}

// --- Color interpolation based on x-progress ---
function getParticleColor(progress, opacity) {
  // progress 0..1 across the screen
  // Left: blue (59,130,246)  Middle: teal (6,182,212)  Right: green (16,185,129)
  let r, g, b
  if (progress < 0.4) {
    const t = progress / 0.4
    r = 59 + (6 - 59) * t
    g = 130 + (182 - 130) * t
    b = 246 + (212 - 246) * t
  } else {
    const t = (progress - 0.4) / 0.6
    r = 6 + (16 - 6) * t
    g = 182 + (185 - 182) * t
    b = 212 + (129 - 212) * t
  }
  return `rgba(${Math.round(r)},${Math.round(g)},${Math.round(b)},${opacity})`
}

// --- Create a particle ---
function createParticle(w, h, isPulse = false) {
  return {
    x: Math.random() * 50 - 10,
    y: Math.random() * h,
    speed: isPulse ? 0.6 + Math.random() * 0.4 : 0.3 + Math.random() * 0.5,
    size: isPulse ? 3 + Math.random() * 2 : 1.5 + Math.random() * 1.5,
    isPulse,
    trail: [],
    maxTrail: isPulse ? 12 : 8,
    baseOpacity: isPulse ? 0.6 + Math.random() * 0.2 : 0.3 + Math.random() * 0.2,
  }
}

export default function Login() {
  const navigate = useNavigate()
  const canvasRef = useRef(null)
  const animFrameRef = useRef(null)
  const speedRef = useRef(1.0)
  const particlesRef = useRef(null)
  const timeRef = useRef(0)

  const [email, setEmail] = useState('admin@resilut.com')
  const [password, setPassword] = useState('resilut2026')
  const [isLoading, setIsLoading] = useState(false)
  const [isExiting, setIsExiting] = useState(false)

  // --- Canvas animation ---
  const initParticles = useCallback((w, h) => {
    const particles = []
    for (let i = 0; i < 65; i++) {
      particles.push(createParticle(w, h, false))
      // Spread initial x across screen so it doesn't start empty
      particles[i].x = Math.random() * w
    }
    for (let i = 0; i < 7; i++) {
      const p = createParticle(w, h, true)
      p.x = Math.random() * w
      particles.push(p)
    }
    return particles
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let w = window.innerWidth
    let h = window.innerHeight
    canvas.width = w
    canvas.height = h

    particlesRef.current = initParticles(w, h)

    const handleResize = () => {
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = w
      canvas.height = h
    }
    window.addEventListener('resize', handleResize)

    const loop = () => {
      const speed = speedRef.current
      timeRef.current += 0.016 * speed

      // Trail fade
      ctx.fillStyle = 'rgba(2,6,23,0.08)'
      ctx.fillRect(0, 0, w, h)

      const particles = particlesRef.current
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        const angle = flowAngle(p.x, p.y, timeRef.current)

        // Move: flow field + rightward drift
        p.x += (Math.cos(angle) * 0.5 + 0.8) * p.speed * speed
        p.y += Math.sin(angle) * 0.5 * p.speed * speed

        // Store trail
        p.trail.push({ x: p.x, y: p.y })
        if (p.trail.length > p.maxTrail) {
          p.trail.shift()
        }

        // Respawn if off-screen
        if (p.x > w + 20 || p.y < -50 || p.y > h + 50) {
          p.x = Math.random() * 50 - 10
          p.y = Math.random() * h
          p.trail.length = 0
        }

        const progress = Math.max(0, Math.min(1, p.x / w))

        // Draw trail
        for (let t = 0; t < p.trail.length - 1; t++) {
          const trailProgress = t / p.trail.length
          const trailOpacity = p.baseOpacity * trailProgress * 0.5
          ctx.beginPath()
          ctx.arc(
            p.trail[t].x,
            p.trail[t].y,
            p.size * trailProgress * 0.6,
            0,
            Math.PI * 2
          )
          ctx.fillStyle = getParticleColor(progress, trailOpacity)
          ctx.fill()
        }

        // Pulse glow
        if (p.isPulse) {
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2)
          ctx.fillStyle = getParticleColor(progress, 0.08)
          ctx.fill()
        }

        // Main particle
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = getParticleColor(progress, p.baseOpacity)
        ctx.fill()
      }

      animFrameRef.current = requestAnimationFrame(loop)
    }

    animFrameRef.current = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(animFrameRef.current)
      window.removeEventListener('resize', handleResize)
    }
  }, [initParticles])

  // --- Login handler ---
  const handleLogin = (e) => {
    e.preventDefault()
    setIsLoading(true)
    speedRef.current = 3.0
    setTimeout(() => {
      setIsExiting(true)
      setTimeout(() => navigate('/dashboard'), 400)
    }, 800)
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#020617]">
      <div className="noise-overlay" />
      {/* Canvas background */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full"
        style={{ zIndex: 0 }}
      />

      {/* Login card */}
      <div
        className="relative flex items-center justify-center min-h-screen"
        style={{ zIndex: 10 }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={
            isExiting
              ? { opacity: 0, scale: 0.96, y: -10 }
              : { opacity: 1, y: 0, scale: 1 }
          }
          transition={
            isExiting
              ? { duration: 0.4 }
              : { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
          }
          style={{
            background: 'rgba(15, 23, 42, 0.85)',
            backdropFilter: 'blur(24px)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '16px',
            boxShadow:
              '0 0 60px rgba(59,130,246,0.08), 0 25px 50px rgba(0,0,0,0.4)',
          }}
          className="px-12 py-10 w-[420px]"
        >
          {/* Logo */}
          <div className="text-center">
            <h1 className="font-heading text-3xl font-bold text-white tracking-[0.25em] uppercase">
              RESILUT
            </h1>
            <div
              className="mx-auto mt-3"
              style={{
                width: '24px',
                height: '1px',
                background:
                  'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
              }}
            />
            <p className="mt-3 text-sm text-[#64748b]">
              AI-Powered Real Estate at Scale
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="mt-8">
            {/* Email */}
            <div>
              <label className="block text-xs text-[#64748b] uppercase tracking-wider mb-1.5">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-11 px-3.5 rounded-lg text-[#f8fafc] text-sm bg-white/5 border border-white/10 outline-none transition-all focus:border-[#3b82f6]/50 focus:ring-1 focus:ring-[#3b82f6]/20"
                placeholder="admin@resilut.com"
              />
            </div>

            {/* Password */}
            <div className="mt-4">
              <label className="block text-xs text-[#64748b] uppercase tracking-wider mb-1.5">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-11 px-3.5 rounded-lg text-[#f8fafc] text-sm bg-white/5 border border-white/10 outline-none transition-all focus:border-[#3b82f6]/50 focus:ring-1 focus:ring-[#3b82f6]/20"
                placeholder="Password"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="mt-6 w-full h-12 flex items-center justify-center gap-2 bg-[#3b82f6] hover:bg-[#2563eb] text-white font-semibold rounded-lg transition-colors disabled:opacity-80 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <span
                    className="inline-block w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin"
                  />
                  <span>Entering...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <p className="mt-6 text-xs text-[#475569] text-center">
            Demo Environment — No credentials required
          </p>
        </motion.div>
      </div>
    </div>
  )
}
