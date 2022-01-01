import '../styles/globals.css'
import type { AppProps } from 'next/app'
import axios from 'axios'

// Redux
import { Provider } from 'react-redux'
import { store } from '../redux/store'

axios.defaults.baseURL = "http://localhost:3000/api"
axios.defaults.withCredentials = true
axios.defaults.headers.post['Content-Type'] = 'application/json';

function MyApp({ Component, pageProps }: AppProps) {
  return <Provider store={store}>
    <Component {...pageProps} />
  </Provider>
}

export default MyApp
