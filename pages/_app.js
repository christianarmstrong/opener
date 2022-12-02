import './styles.css';
import { hotjar } from 'react-hotjar'
import { useEffect } from 'react'

function App({ Component, pageProps }) {
  useEffect(() => {
    hotjar.initialize(3272704, 6)
  }, [])
  return <Component {...pageProps} />
}
export default App;
