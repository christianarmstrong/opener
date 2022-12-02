import './styles.css';

import * as gtag from '../lib/gtag.js'
import { useRouter } from 'next/router'
import { hotjar } from 'react-hotjar'
import { useEffect } from 'react'

function App({ Component, pageProps }) {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = url => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  useEffect(() => {
    hotjar.initialize(3272704, 6)
  }, [])
  return <Component {...pageProps} />
}
export default App;
