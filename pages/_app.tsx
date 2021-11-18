import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

function MyApp({ Component, pageProps }: AppProps) {
  return <div className={styles.container}>
    <Head>
      <title>Levels FYI Project</title>
      <meta name="description" content="Levels FYI Project" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Providers>
      <Component {...pageProps} />
    </Providers>
  </div>
}


const Providers: React.FC = ({ children }) => {
  const client = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity,
      }
    }
  });
  return <QueryClientProvider client={client}>
    {children}
  </QueryClientProvider>
}

export default MyApp
