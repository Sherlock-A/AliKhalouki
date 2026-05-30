import './index.scss'
import { faInstagram, faLinkedin, faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import {
  faAward,
  faBriefcase,
  faEnvelope,
  faFolder,
  faHome,
  faNewspaper,
  faScrewdriverWrench,
  faUser,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, NavLink } from 'react-router-dom'

import { useTheme } from '../../theme'
import AkMark from '../AkMark'

const Sidebar = () => {
  const { theme } = useTheme()

  return (
    <div className="nav-bar">
      <Link className="logo" to="/">
        <AkMark size={36} variant={theme === 'light' ? 'light' : 'dark'} className="sidebar-ak-mark" />
      </Link>

      <nav>
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
        <NavLink activeclassname="active" className="certificates-link" to="/certificates">
          <FontAwesomeIcon icon={faAward} color="#4d4d4e" />
        </NavLink>
        <NavLink activeclassname="active" className="blog-link" to="/blog">
          <FontAwesomeIcon icon={faNewspaper} color="#4d4d4e" />
        </NavLink>
        <NavLink activeclassname="active" className="skills-link" to="/skills">
          <FontAwesomeIcon icon={faScrewdriverWrench} color="#4d4d4e" />
        </NavLink>
        <NavLink activeclassname="active" className="contact-link" to="/contact">
          <FontAwesomeIcon icon={faEnvelope} color="#4d4d4e" />
        </NavLink>
      </nav>

      <ul>
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
