import '../styles/globals.css'
import type { AppProps } from 'next/app'
import axios from 'axios'
import { SessionProvider } from 'next-auth/react'

// Redux
import { Provider } from 'react-redux'
import { store } from '../redux/store'
import Layout from '../components/Layout'

// axios.defaults.baseURL = "https://nextjs-fullstack-ecommerce.vercel.app/api"
const url = process.env.NODE_ENV === 'production' ? 'https://nextjs-fullstack-ecommerce.vercel.app/api' : 'http://localhost:3000/api'
axios.defaults.baseURL = url
// axios.defaults.baseURL = "/api"
axios.defaults.withCredentials = true
axios.defaults.headers.post['Content-Type'] = 'application/json';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </SessionProvider>
  )
}

export default MyApp
