// components/layout.js

import Head from 'next/head';
import Navigation from './navigation';

const Layout = ({ children }) => (
  <>
    <Head>
      <title>iPatch - Part Request</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main>
        <Navigation/>
      <div>{children}</div>
    </main>
  </>
);

export default Layout;