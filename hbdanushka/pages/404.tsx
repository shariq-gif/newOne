// pages/404.tsx
import Head from 'next/head';

export default function Custom404() {
  return (
    <>
      <Head>
        <title>404: Page Removed</title>
      </Head>
      <div
        style={{
          height: '100vh',
          backgroundColor: '#111',
          color: '#fff',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          fontFamily:
            '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
          textAlign: 'center',
          padding: '0 1rem',
        }}
      >
        <h1 style={{ fontSize: '3rem', margin: 0 }}>404 | Page Not Found</h1>
        <p style={{ fontSize: '1.25rem', marginTop: '1rem' }}>
          This page has been removed.
        </p>
      </div>
    </>
  );
}
