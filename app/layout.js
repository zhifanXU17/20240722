import './globals.css';
import Header from './components/Header';
import Footer from './components/Footer';

export const metadata = {
  twitter: {
    card: 'summary_large_image',
    site: '@PDFdotai',
  },
  title:
    'Free PDF Page Rotator - Rotate Individual or All Pages',
  description:
    'Rotate individual or all pages in your PDF effortlessly. No downloads or sign-ups. Fast, secure, and user-friendly. Try now!',
  robots: 'index,follow',
  openGraph: {
    type: 'website',
    url: 'https://pdf.ai',
    images: [
      {
        type: 'image/jpeg',
        url: 'https://imagedelivery.net/pcavElAZUUevXK53Dl4vWA/4738d269-b536-45f2-57e1-fe07fef90d00/public',
      },
    ],
  },

  alternates: {
    canonical: 'http://pdf.ai/',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
