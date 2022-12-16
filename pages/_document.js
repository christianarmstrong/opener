import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <meta property="og:title" content="The Best Way to Open a Conversation" key="title" />
        <meta property="og:description" content="The Best Way to Open a Conversation" key="description" />
        <meta
          property="og:image"
          content="https://thechristianarmstrong.design/img/openerLinkPicture.png"
        />
        <meta name="twitter:card" content="summary_large_image"></meta>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
