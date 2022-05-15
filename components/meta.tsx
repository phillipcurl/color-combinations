import Head from 'next/head';
import nightwind from 'nightwind/helper';

// import { CMS_NAME, HOME_OG_IMAGE_URL } from '../lib/constants';

const Meta = () => {
  return (
    <Head>
      <meta name="robots" content="index,follow" />
      <meta name="googlebot" content="index,follow" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@philcurl" />
      <meta name="twitter:creator" content="@philcurl" />
      <meta property="og:type" content="website" />
      <meta property="og:image:alt" content="Phillip Curl" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:site_name" content="Phillip Curl" />
      <meta name="theme-color" content="#fefefe" />
      <link rel="apple-touch-icon" href="/static/meta/apple-touch-icon.png" />
      <link rel="mask-icon" href="/static/meta/mask-icon.svg" color="#050505" />
      <link rel="manifest" href="/static/meta/manifest.json" />
      <meta
        name="description"
        content="Product Engineer focused on building a faster, more enjoyable web. Senior Software Engineer at Finite State."
      />
      <meta property="og:url" content="https://phillipcurl.com/about" />
      <meta property="og:title" content="About" />
      <meta
        property="og:description"
        content="Product Engineer focused on building a faster, more enjoyable web. Senior Software Engineer at Finite State."
      />
      <meta
        property="og:image"
        content="https://phillipcurl.com/static/meta/og-image.png"
      />
      {/* <link
        rel="icon"
        href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>👋</text></svg>"
      ></link> */}

      {/* <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/favicon/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon/favicon-16x16.png"
      />
      <link rel="manifest" href="/favicon/site.webmanifest" />
      <link
        rel="mask-icon"
        href="/favicon/safari-pinned-tab.svg"
        color="#000000"
      /> */}
      {/* <link rel="shortcut icon" href="/favicon/favicon.ico" /> */}

      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="msapplication-config" content="/favicon/browserconfig.xml" />
      {/* <meta name="theme-color" content="#000" /> */}
      <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      <meta
        name="description"
        content={`Based on the book, "A Dictionary of Color Combinations" by Sanzo Wada (1883-1967)`}
      />
      <meta property="og:image" content="TODO" />
      <script dangerouslySetInnerHTML={{ __html: nightwind.init() }} />
    </Head>
  );
};

export default Meta;
