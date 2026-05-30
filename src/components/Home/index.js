import { useEffect, useRef, useState } from 'react'

import Loader from 'react-loaders'
import { Link } from 'react-router-dom'

import Logo from './Logo'
import LogoTitle from '../../assets/images/logo-s.png'
import { useI18n } from '../../i18n'
import AnimatedLetters from '../AnimatedLetters'
import SEO from '../SEO'
import './index.scss'

const STATS = [
  { value: 10, suffix: '+', key: 'projects' },
  { value: 3,  suffix: '',  key: 'experience' },
  { value: 8,  suffix: '+', key: 'clients' },
  { value: 15, suffix: '+', key: 'technologies' },
]

const CountUp = ({ target, duration = 1400 }) => {
  const [count, setCount] = useState(0)
  const ref = useRef(null)

  useEffect(() => {
    const start = Date.now()
    const tick = () => {
      const elapsed = Date.now() - start
      const progress = Math.min(elapsed / duration, 1)
      setCount(Math.floor(progress * target))
      if (progress < 1) ref.current = requestAnimationFrame(tick)
    }
    // Delay start to align with page animation
    const delay = setTimeout(() => { ref.current = requestAnimationFrame(tick) }, 2200)
    return () => { clearTimeout(delay); cancelAnimationFrame(ref.current) }
  }, [target, duration])

  return <>{count}</>
}

const Home = () => {
  const { t } = useI18n()
  const [letterClass, setLetterClass] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => setLetterClass('text-animate-hover'), 4000)
    return () => clearTimeout(timer)
  }, [])

  const greeting      = t('home.greeting').split('')
  const nameArray     = 'Ali Khalouki'.split('')
  const jobArray      = t('home.job').split('')
  const locationArray = t('home.location').split('')

  const nameIdx      = 13 + greeting.length
  const jobIdx       = nameIdx + nameArray.length + 2
  const locationIdx  = jobIdx  + jobArray.length  + 2

  return (
    <>
      <SEO
        title="Accueil"
        description="Ali Khalouki — Développeur Web Freelance à Fès, Maroc. Création de sites internet sur mesure, SEO, applications React & Laravel. Devis gratuit."
        path="/"
      />
      <div className="container home-page">
        <div className="text-zone">
          <h1>
            <span className={letterClass}>H</span>
            <span className={`${letterClass} _12`}>i,</span>
            <br />
            <AnimatedLetters
              letterClass={letterClass}
              strArray={greeting}
              idx={13}
            />
            <img src={LogoTitle} alt="Ali Khalouki" />
            <AnimatedLetters
              letterClass={letterClass}
              strArray={nameArray}
              idx={nameIdx}
            />
            <br />
            <AnimatedLetters
              letterClass={letterClass}
              strArray={jobArray}
              idx={jobIdx}
            />
            <br />
            <AnimatedLetters
              letterClass={letterClass}
              strArray={locationArray}
              idx={locationIdx}
            />
          </h1>
          <h2>{t('home.subtitle')}</h2>

          <div className="home-stats">
            {STATS.map((s, i) => (
              <div key={i} className="stat-item" style={{ animationDelay: `${2.2 + i * 0.1}s` }}>
                <span className="stat-number">
                  <CountUp target={s.value} />{s.suffix}
                </span>
                <span className="stat-label">{t(`home.stats.${s.key}`)}</span>
              </div>
            ))}
          </div>

          <Link to="/contact" className="flat-button">
            {t('home.cta')}
          </Link>
        </div>
        <Logo />
      </div>
      <Loader type="pacman" />
    </>
  )
}

export default Home
