import { useEffect } from 'react'

import ReactGA from 'react-ga4'
import { useLocation } from 'react-router-dom'

const usePageTracking = () => {
  const location = useLocation()

  useEffect(() => {
    if (process.env.REACT_APP_GA4_ID) {
      ReactGA.send({ hitType: 'pageview', page: location.pathname })
    } else if (process.env.NODE_ENV !== 'production') {
      console.debug('[GA4] pageview:', location.pathname)
    }
  }, [location])
}

export default usePageTracking
