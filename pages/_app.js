import './styles.css';


import { useRouter } from 'next/router'
import { hotjar } from 'react-hotjar'
import { useEffect } from 'react'
import ReactGA from 'react-ga';
const TRACKING_ID = "G-3QE8Z2R24F"; // YOUR_OWN_TRACKING_ID
ReactGA.initialize(TRACKING_ID);

function App({ Component, pageProps }) {
  const router = useRouter()


  useEffect(() => {
    hotjar.initialize(3272704, 6)
  }, [])
  return <Component {...pageProps} />
}
export default App;
