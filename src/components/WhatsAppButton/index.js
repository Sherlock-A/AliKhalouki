import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './index.scss'

const WhatsAppButton = () => (
  <a
    href="https://wa.me/212771747509"
    className="wa-fab"
    target="_blank"
    rel="noreferrer"
    title="Contacter sur WhatsApp"
    aria-label="WhatsApp"
  >
    <FontAwesomeIcon icon={faWhatsapp} />
  </a>
)

export default WhatsAppButton
