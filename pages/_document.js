import Document, { Head, Html, Main, NextScript } from 'next/document'
import React from 'react'
import { GA_TRACKING_ID } from '../lib/gtag'
import { getCssText } from '../stitches.config'

export default class extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    const lang = this.props.__NEXT_DATA__.props.pageProps?.post?.lang

    return (
      <Html lang={lang ? lang : 'en-US'}>
        <Head>
          <meta charSet="utf-8" />
          <meta content="Gangadhar S" name="author" />
          <meta property="og:type" content="website" />
          <meta content="summary_large_image" name="twitter:card" />
          <meta name="theme-color" content="#08070b" />
          <meta name="msapplication-TileColor" content="#08070b" />
          <style
            id="stitches"
            dangerouslySetInnerHTML={{ __html: getCssText() }}
          />

          {/* Favicons */}
          <link rel="icon" href="/favicon.ico" sizes="any" />
          <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
          <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="manifest" href="/site.webmanifest" />

          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}');
          `,
            }}
          />
        </Head>
        <Main />
        <NextScript />
      </Html>
    )
  }
}
