import type { NextPage } from 'next'
import Head from 'next/head'
import db from '../utils/db'
import useSWR from 'swr'
import fetchApi from '../utils/fetchApi'
import axios from 'axios'
import { ICategory } from '../redux/slices/optionsSlice'
import Filters from '../components/Filters'

const Home: NextPage<{ categories: ICategory[] }> = ({ categories }) => {
  // const { data, error } = useSWR('/categories', fetchApi)
  // console.log('Categories: ', data)
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='container'>
        <h1>Hello</h1>
        <Filters />
      </main>
    </div>
  )
}

// export async function getServerSideProps() {
//   await db.connect()
//   const { data } = await axios.get('/categories')
//   console.log(data)
//   return {
//     props: {
//       categories: data.data
//     }
//   }
// }

export default Home
