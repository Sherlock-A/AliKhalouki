import AkMark from '../../AkMark'
import './index.scss'

const Logo = () => (
  <div className="logo-container">
    <div className="logo-ring-outer" />
    <div className="logo-ring" />
    <div className="logo-glow" />
    <AkMark size={200} variant="dark" className="ak-mark-main" />
  </div>
)

export default Logo
