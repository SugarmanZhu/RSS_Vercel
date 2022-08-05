import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    // default dark scheme
    <Html className='dark'>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}