import { useState } from 'react'

import { faInstagram, faLinkedin, faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import {
  faAward,
  faBriefcase,
  faEllipsis,
  faEnvelope,
  faFolder,
  faHome,
  faNewspaper,
  faScrewdriverWrench,
  faUser,
  faXmark,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, NavLink } from 'react-router-dom'

import { LANGS, useI18n } from '../../i18n'
import { useTheme } from '../../theme'
import AkMark from '../AkMark'
import { FlagDE, FlagES, FlagFR, FlagGB } from '../AkMark/FlagIcon'

import './index.scss'

const FLAGS = { fr: FlagFR, en: FlagGB, es: FlagES, de: FlagDE }

const Sidebar = () => {
  const { theme } = useTheme()
  const { lang, changeLang } = useI18n()
  const [moreOpen, setMoreOpen] = useState(false)

  const nextLang = LANGS[(LANGS.indexOf(lang) + 1) % LANGS.length]
  const ActiveFlag = FLAGS[lang]

  return (
    <div className="nav-bar">
      <Link className="logo" to="/">
        <AkMark size={36} variant={theme === 'light' ? 'light' : 'dark'} className="sidebar-ak-mark" />
      </Link>

      <nav>
        {/* Liens primaires — toujours visibles */}
        <NavLink exact="true" activeclassname="active" to="/">
          <FontAwesomeIcon icon={faHome} color="#4d4d4e" />
        </NavLink>
        <NavLink activeclassname="active" className="about-link" to="/about">
          <FontAwesomeIcon icon={faUser} color="#4d4d4e" />
        </NavLink>
        <NavLink activeclassname="active" className="services-link" to="/services">
          <FontAwesomeIcon icon={faBriefcase} color="#4d4d4e" />
        </NavLink>
        <NavLink activeclassname="active" className="projects-link" to="/projects">
          <FontAwesomeIcon icon={faFolder} color="#4d4d4e" />
        </NavLink>
        <NavLink activeclassname="active" className="contact-link" to="/contact">
          <FontAwesomeIcon icon={faEnvelope} color="#4d4d4e" />
        </NavLink>

        {/* Liens secondaires — masqués sur mobile, visibles sur desktop */}
        <NavLink activeclassname="active" className="certificates-link nav-secondary" to="/certificates">
          <FontAwesomeIcon icon={faAward} color="#4d4d4e" />
        </NavLink>
        <NavLink activeclassname="active" className="blog-link nav-secondary" to="/blog">
          <FontAwesomeIcon icon={faNewspaper} color="#4d4d4e" />
        </NavLink>
        <NavLink activeclassname="active" className="skills-link nav-secondary" to="/skills">
          <FontAwesomeIcon icon={faScrewdriverWrench} color="#4d4d4e" />
        </NavLink>

        {/* Bouton "Plus" — visible uniquement sur mobile */}
        <button
          className="more-btn"
          onClick={() => setMoreOpen(o => !o)}
          aria-label="Plus"
        >
          <FontAwesomeIcon icon={moreOpen ? faXmark : faEllipsis} />
        </button>
      </nav>

      {/* Drawer secondaire mobile */}
      {moreOpen && (
        <div className="more-drawer">
          <NavLink activeclassname="active" className="certificates-link" to="/certificates" onClick={() => setMoreOpen(false)}>
            <FontAwesomeIcon icon={faAward} />
            <span>Certifs</span>
          </NavLink>
          <NavLink activeclassname="active" className="blog-link" to="/blog" onClick={() => setMoreOpen(false)}>
            <FontAwesomeIcon icon={faNewspaper} />
            <span>Blog</span>
          </NavLink>
          <NavLink activeclassname="active" className="skills-link" to="/skills" onClick={() => setMoreOpen(false)}>
            <FontAwesomeIcon icon={faScrewdriverWrench} />
            <span>Skills</span>
          </NavLink>
        </div>
      )}

      <ul>
        <li className="mob-lang">
          <button className="mob-lang-btn" onClick={() => changeLang(nextLang)} title={nextLang.toUpperCase()}>
            <ActiveFlag />
          </button>
        </li>
        <li>
          <a href="https://wa.me/212771747509" target="_blank" rel="noreferrer" title="WhatsApp">
            <FontAwesomeIcon icon={faWhatsapp} color="#25D366" />
          </a>
        </li>
        <li>
          <a href="https://instagram.com/sherlock15_" target="_blank" rel="noreferrer" title="Instagram">
            <FontAwesomeIcon icon={faInstagram} color="#E1306C" />
          </a>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/ali-khalouki-114975253/" target="_blank" rel="noreferrer" title="LinkedIn">
            <FontAwesomeIcon icon={faLinkedin} color="#b9b9b9" />
          </a>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar
