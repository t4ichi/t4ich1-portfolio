import 'bootstrap/dist/css/bootstrap.min.css'
import type { AppProps } from 'next/app'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return <div className='page_root'><Component {...pageProps} /></div>
}

export default MyApp