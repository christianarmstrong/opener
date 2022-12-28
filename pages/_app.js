import './globals.css';

import { Navbar } from '../components/Navbar'
import { useRouter } from 'next/router'
import { hotjar } from 'react-hotjar'
import { useEffect } from 'react'
import ReactGA from 'react-ga';
import { ClerkProvider, RedirectToSignUp, SignedIn, SignedOut, SignIn, SignUp, UserButton } from '@clerk/nextjs';
const TRACKING_ID = "G-3QE8Z2R24F"; // YOUR_OWN_TRACKING_ID
ReactGA.initialize(TRACKING_ID);
const clerkFrontendApi = process.env.NEXT_PUBLIC_CLERK_FRONTEND_API;

const publicPages = ["/sign-in/[[...index]]", "/sign-up/[[...index]]"]

function App({ Component, pageProps }) {
  const router = useRouter()

  useEffect(() => {
    hotjar.initialize(3272704, 6)
  }, [])

  return (<ClerkProvider frontendApi={clerkFrontendApi}
    navigate={(to) => router.push(to)}>
    {publicPages.includes(router.pathname) ? (
      <Component {...pageProps} />
    ) : (
      <>
        <SignedIn>
          <Navbar />
          <Component {...pageProps} />
        </SignedIn>
        <SignedOut>
          <Navbar />
          <Component {...pageProps} />
        </SignedOut>
      </>
    )}

  </ClerkProvider>)
}
export default App;
