import { useEffect, useRef } from 'react'

const STAR_COUNT  = 300
const SPEED_MIN   = 0.08
const SPEED_MAX   = 0.25

const StarsCanvas = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let width  = canvas.width  = window.innerWidth
    let height = canvas.height = window.innerHeight
    let rafId

    // Build star pool
    const stars = Array.from({ length: STAR_COUNT }, () => ({
      x:     Math.random() * width,
      y:     Math.random() * height,
      r:     Math.random() * 1.4 + 0.3,
      speed: Math.random() * (SPEED_MAX - SPEED_MIN) + SPEED_MIN,
      alpha: Math.random() * 0.6 + 0.4,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, width, height)
      for (const s of stars) {
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${s.alpha})`
        ctx.fill()

        s.y -= s.speed
        if (s.y + s.r < 0) {
          s.y = height + s.r
          s.x = Math.random() * width
        }
      }
      rafId = requestAnimationFrame(draw)
    }

    rafId = requestAnimationFrame(draw)

    const onResize = () => {
      width  = canvas.width  = window.innerWidth
      height = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', onResize, { passive: true })

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      id="stars-canvas"
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  )
}

export default StarsCanvas
