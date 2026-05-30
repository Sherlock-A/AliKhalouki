import { useEffect, useState } from 'react'

import './index.scss'

const SCROLLABLE = [
  '.services-wrap',
  '.projects-wrap',
  '.certificates-wrap',
  '.tagcloud-wrap',
]

const ScrollProgress = () => {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const handlers = []

    const attach = () => {
      SCROLLABLE.forEach((sel) => {
        const el = document.querySelector(sel)
        if (!el) return
        const onScroll = () => {
          const { scrollTop, scrollHeight, clientHeight } = el
          const pct = scrollHeight <= clientHeight
            ? 0
            : (scrollTop / (scrollHeight - clientHeight)) * 100
          setWidth(pct)
        }
        el.addEventListener('scroll', onScroll, { passive: true })
        handlers.push({ el, onScroll })
      })
    }

    // Attach after page animations settle
    const t = setTimeout(attach, 1200)
    return () => {
      clearTimeout(t)
      handlers.forEach(({ el, onScroll }) => el.removeEventListener('scroll', onScroll))
    }
  }, [])

  return <div className="scroll-progress" style={{ width: `${width}%` }} />
}

export default ScrollProgress
