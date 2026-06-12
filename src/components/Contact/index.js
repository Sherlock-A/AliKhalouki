import { useEffect, useRef, useState } from 'react'

import emailjs from '@emailjs/browser'
import { faInstagram, faLinkedin, faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import {
  faClock,
  faLocationDot,
  faPaperPlane,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import Loader from 'react-loaders'
import { ClipLoader } from 'react-spinners'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import 'leaflet/dist/leaflet.css'
import { useI18n } from '../../i18n'
import AnimatedLetters from '../AnimatedLetters'
import SEO from '../SEO'
import './index.scss'

const Contact = () => {
  const { t } = useI18n()
  const [letterClass, setLetterClass] = useState('text-animate')
  const form = useRef()
  const [loading, setLoading] = useState(false)
  const [formErrors, setFormErrors] = useState({})
  const [sent, setSent] = useState(false)

  useEffect(() => {
    setTimeout(() => setLetterClass('text-animate-hover'), 3000)
  }, [])

  const verifyEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())
  }

  const validate = (fields) => {
    const errors = {}
    if (!fields.name.trim()) errors.name = t('contact.errorName') || 'Nom requis'
    if (!verifyEmail(fields.email)) errors.email = t('contact.errorEmail') || 'Email invalide'
    if (!fields.subject.trim()) errors.subject = t('contact.errorSubject') || 'Sujet requis'
    if (fields.message.trim().length < 20) errors.message = t('contact.errorMessage') || 'Message trop court (20 caractères min.)'
    return errors
  }

  const sendEmail = async (e) => {
    e.preventDefault()
    setLoading(true)

    const fullName    = form.current.name.value
    const email       = form.current.email.value
    const phone       = form.current.phone.value
    const projectType = form.current.projectType.value
    const budget      = form.current.budget.value
    const deadline    = form.current.deadline.value
    const subject     = form.current.subject.value
    const message     = form.current.message.value

    const errors = validate({ name: fullName, email, subject, message })
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      setLoading(false)
      return
    }
    setFormErrors({})

    const firstName   = fullName.split(' ')[0]
      .charAt(0).toUpperCase() + fullName.split(' ')[0].slice(1).toLowerCase()

    const structuredMessage = [
      '--- DETAILS DU PROJET ---',
      `Type de projet : ${projectType}`,
      `Budget estime  : ${budget}`,
      `Delai souhaite : ${deadline}`,
      phone ? `Telephone      : ${phone}` : null,
      '-------------------------',
      '',
      'MESSAGE :',
      '',
      message,
    ].filter(Boolean).join('\n')

    const templateParams = {
      firstname : firstName,
      name      : fullName,
      email     : email,
      subject   : subject,
      message   : structuredMessage,
      to_email  : 'okhalouki46@gmail.com',
    }

    emailjs
      .send(
        process.env.REACT_APP_EMAIL_SERVICE_ID,
        process.env.REACT_APP_TEMPLATE_ID,
        templateParams,
        process.env.REACT_APP_PUBLIC_KEY
      )
      .then(
        () => {
          setLoading(false)
          setSent(true)
          if (window.va) window.va('event', { name: 'contact_submit' })
        },
        (err) => {
          setLoading(false)
          console.error('EmailJS error:', err)
          toast.error(`Erreur: ${err?.text || err?.status || JSON.stringify(err)}`, {
            position: 'bottom-center', autoClose: 8000, theme: 'dark',
          })
        }
      )
  }

  return (
    <>
      <SEO
        title="Contact — Devis Gratuit"
        description="Demandez votre devis gratuit pour création de site web, SEO ou application à Casablanca, Maroc. Ali Khalouki répond sous 24h. WhatsApp : +212 771 747 509."
        path="/contact"
      />
      <div className="container contact-page">
        <div className="text-zone">
          <h1>
            <AnimatedLetters
              letterClass={letterClass}
              strArray={t('contact.title').split('')}
              idx={15}
            />
          </h1>
          <p>{t('contact.intro')}</p>

          <div className="contact-availability">
            <span className="avail-dot" />
            <span className="avail-text">{t('contact.available')}</span>
          </div>
          <p className="contact-response-time">
            <FontAwesomeIcon icon={faClock} /> {t('contact.responseTime')}
          </p>

          <a
            href="https://wa.me/212771747509"
            target="_blank"
            rel="noreferrer"
            className="whatsapp-cta"
          >
            <FontAwesomeIcon icon={faWhatsapp} />
            {t('contact.whatsappCta')}
          </a>

          {sent ? (
            <div className="form-success">
              <span className="form-success-icon">✓</span>
              <h3>{t('contact.successTitle') || 'Message envoyé !'}</h3>
              <p>{t('contact.successMsg') || 'Je vous répondrai sous 24h. En attendant, vous pouvez me contacter directement sur WhatsApp.'}</p>
              <a
                href="https://wa.me/212771747509"
                target="_blank"
                rel="noreferrer"
                className="flat-button form-success-wa"
              >
                <FontAwesomeIcon icon={faWhatsapp} />
                {t('contact.successWa') || 'Discutons maintenant →'}
              </a>
              <button
                type="button"
                className="form-success-reset"
                onClick={() => setSent(false)}
              >
                {t('contact.successReset') || 'Envoyer un autre message'}
              </button>
            </div>
          ) : (
          <div className="contact-form">
            <form ref={form} onSubmit={sendEmail}>

              {/* Row 1 — Nom + Email */}
              <div className="form-row">
                <div className="form-group">
                  <label>{t('contact.name')} *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Ali Khalouki"
                    className={formErrors.name ? 'input-error' : ''}
                    onChange={() => formErrors.name && setFormErrors(prev => ({ ...prev, name: '' }))}
                  />
                  {formErrors.name && <span className="field-error">{formErrors.name}</span>}
                </div>
                <div className="form-group">
                  <label>{t('contact.email')} *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="ali@example.com"
                    className={formErrors.email ? 'input-error' : ''}
                    onChange={() => formErrors.email && setFormErrors(prev => ({ ...prev, email: '' }))}
                  />
                  {formErrors.email && <span className="field-error">{formErrors.email}</span>}
                </div>
              </div>

              {/* Row 2 — Téléphone + Type de projet */}
              <div className="form-row">
                <div className="form-group">
                  <label>{t('contact.phone')}</label>
                  <input type="tel" name="phone" placeholder="+212 6XX XXX XXX" />
                </div>
                <div className="form-group">
                  <label>{t('contact.projectType')} *</label>
                  <select name="projectType" required defaultValue="">
                    <option value="" disabled>{t('contact.selectProjectType')}</option>
                    {t('contact.projectTypes').map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 3 — Budget + Délai */}
              <div className="form-row">
                <div className="form-group">
                  <label>{t('contact.budget')} *</label>
                  <select name="budget" required defaultValue="">
                    <option value="" disabled>{t('contact.selectBudget')}</option>
                    {t('contact.budgets').map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>{t('contact.deadline')} *</label>
                  <select name="deadline" required defaultValue="">
                    <option value="" disabled>{t('contact.selectDeadline')}</option>
                    {t('contact.deadlines').map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 4 — Sujet */}
              <div className="form-group full-width">
                <label>{t('contact.subject')} *</label>
                <input
                  type="text"
                  name="subject"
                  required
                  placeholder="Ex: Création site vitrine pour mon entreprise"
                  className={formErrors.subject ? 'input-error' : ''}
                  onChange={() => formErrors.subject && setFormErrors(prev => ({ ...prev, subject: '' }))}
                />
                {formErrors.subject && <span className="field-error">{formErrors.subject}</span>}
              </div>

              {/* Row 5 — Message */}
              <div className="form-group full-width">
                <label>{t('contact.message')} *</label>
                <textarea
                  name="message"
                  required
                  placeholder="Décrivez votre projet en détail : fonctionnalités souhaitées, public cible, références visuelles..."
                  className={formErrors.message ? 'input-error' : ''}
                  onChange={() => formErrors.message && setFormErrors(prev => ({ ...prev, message: '' }))}
                />
                {formErrors.message && <span className="field-error">{formErrors.message}</span>}
              </div>

              {/* Submit */}
              <div className="form-submit">
                <button type="submit" className="flat-button" disabled={loading}>
                  {loading
                    ? <ClipLoader color="#fff" size={18} />
                    : <><FontAwesomeIcon icon={faPaperPlane} /> {t('contact.send')}</>
                  }
                </button>
              </div>

              {/* Carte mobile — visible uniquement sur mobile, après ENVOYER */}
              <div className="map-mobile">
                <MapContainer center={[33.5731, -7.5898]} zoom={12}>
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <Marker position={[33.5731, -7.5898]}>
                    <Popup>{t('contact.popup')}</Popup>
                  </Marker>
                </MapContainer>
              </div>

              <ToastContainer />
            </form>
          </div>
          )}
        </div>

        <div className="map-wrap">
          <div className="info-map">
            <div className="info-name">Ali Khalouki</div>
            <div className="info-location">
              <FontAwesomeIcon icon={faLocationDot} /> Casablanca, Maroc
            </div>
            <div className="info-socials">
              <a href="https://wa.me/212771747509" target="_blank" rel="noreferrer" className="social-pill social-pill--wa">
                <FontAwesomeIcon icon={faWhatsapp} /> WhatsApp
              </a>
              <a href="https://instagram.com/sherlock15_" target="_blank" rel="noreferrer" className="social-pill social-pill--ig">
                <FontAwesomeIcon icon={faInstagram} /> sherlock15_
              </a>
              <a href="https://www.linkedin.com/in/ali-khalouki-114975253/" target="_blank" rel="noreferrer" className="social-pill social-pill--li">
                <FontAwesomeIcon icon={faLinkedin} /> LinkedIn
              </a>
            </div>
          </div>
          <MapContainer center={[33.5731, -7.5898]} zoom={13}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[33.5731, -7.5898]}>
              <Popup>{t('contact.popup')}</Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
      <Loader type="pacman" />
    </>
  )
}

export default Contact
