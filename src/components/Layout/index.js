import { Outlet } from 'react-router-dom'

import usePageTracking from '../../hooks/usePageTracking'
import BackToTop from '../BackToTop'
import ErrorBoundary from '../ErrorBoundary'
import ScrollProgress from '../ScrollProgress'
import Sidebar from '../Sidebar/'
import StarsCanvas from '../StarsCanvas'
import WhatsAppButton from '../WhatsAppButton'
import './index.scss'

const Layout = () => {
  usePageTracking()

  return (
    <div className="App">
      <StarsCanvas />
      <ScrollProgress />
      <Sidebar />
      <div className="page">
        <span className="tags top-tags">&lt;body&gt;</span>

        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
        <span className="tags bottom-tags">
          &lt;/body&gt;
          <br />
          <span className="bottom-tag-html">&lt;/html&gt;</span>
        </span>
      </div>
      <BackToTop />
      <WhatsAppButton />
    </div>
  )
}

export default Layout
