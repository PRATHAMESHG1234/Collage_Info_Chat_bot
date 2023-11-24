// pages/_document.js
import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          <meta charSet="UTF-8" />
          <link rel="icon" href="/favicon.png" sizes="16*16" type="image/png" />

          <link
            rel="stylesheet"
            type="text/css"
            href="../public/nprogress.css"
          />
          <link rel="stylesheet" type="text/css" href="../public/Chat.css" />
          <link
            rel="stylesheet"
            type="text/css"
            href="../public/ResponseFormats.css"
          />

          <title>Mini Chat Bot</title>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
