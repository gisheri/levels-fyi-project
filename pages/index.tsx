import type { NextPage } from 'next'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
      <main className={styles.main}>
        <h1 className={styles.title}>
          Hello World
        </h1>
        <br/>
        <Link href="/countries">
          <a  className={styles.card}>Go To Countries</a>
        </Link>
      </main>
  )
}

export default Home
