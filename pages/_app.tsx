import React, { useEffect } from 'react'
import Head from 'next/head'
import type { AppProps } from 'next/app'

import 'tailwindcss/tailwind.css'
import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css'

import Layout from '../components/layout.component'

import LanguageProvider from '../context/language.context'
import UserProvider from '../context/user.context'
import { ToastContainer } from 'react-toastify'
import { subscribeNotifications } from '../services/notification.service'

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    subscribeNotifications()
  }, [])

  return (
    <LanguageProvider>
      <UserProvider>
        <Head>
          <title>Developer portal</title>
          <link
            href="https://fonts.googleapis.com/css?family=Poppins"
            rel="stylesheet"
          />
        </Head>
        <Layout>
          <ToastContainer />
          <Component {...pageProps} />
        </Layout>
      </UserProvider>
    </LanguageProvider>
  )
}
export default MyApp
