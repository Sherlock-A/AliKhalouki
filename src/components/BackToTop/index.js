import { useEffect, useState } from 'react'

import { faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './index.scss'

const SCROLLABLE = [
  '.services-wrap',
  '.projects-wrap',
  '.certificates-wrap',
  '.tagcloud-wrap',
]

const BackToTop = () => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handlers = []

    const attach = () => {
      SCROLLABLE.forEach((sel) => {
        const el = document.querySelector(sel)
        if (!el) return
        const onScroll = () => setVisible(el.scrollTop > 80)
        el.addEventListener('scroll', onScroll, { passive: true })
        handlers.push({ el, onScroll })
      })
    }

    const t = setTimeout(attach, 1200)
    return () => {
      clearTimeout(t)
      handlers.forEach(({ el, onScroll }) => el.removeEventListener('scroll', onScroll))
    }
  }, [])

  const scrollUp = () => {
    SCROLLABLE.forEach((sel) => {
      const el = document.querySelector(sel)
      if (el) el.scrollTo({ top: 0, behavior: 'smooth' })
    })
  }

  return (
    <button
      className={`back-to-top${visible ? ' back-to-top--visible' : ''}`}
      onClick={scrollUp}
      aria-label="Back to top"
    >
      <FontAwesomeIcon icon={faArrowUp} />
    </button>
  )
}

export default BackToTop
