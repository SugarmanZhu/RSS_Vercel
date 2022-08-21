import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    // default dark scheme
    <Html className='dark p-0 m-0 scroll-smooth'>
      <Head />
      <body className='m-0 bg-neutral-50 dark:bg-neutral-800 
        text-neutral-900 dark:text-neutral-50 transition-colors'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}