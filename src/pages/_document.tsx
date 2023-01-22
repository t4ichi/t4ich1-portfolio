import NextDocument, { Head, Html, Main, NextScript } from 'next/document'

// HTMLの最外殻をここで定義する
export default class Document extends NextDocument {
  render() {
    return (
      <Html>
        <Head>
          <link rel='shortcut icon' href='/favicons/favicon.ico' />
          <title>伊藤太一のポートフォリオ</title>
        </Head>
        <body>
          <Main /> {/* pages/_app.tsxがここに読み込まれる */}
          <NextScript />
        </body>
      </Html>
    )
  }
}
