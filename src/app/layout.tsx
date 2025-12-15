import type { Metadata } from 'next';
import { Montserrat, Merriweather, Inter } from 'next/font/google';
import './globals.css';
import { getData } from '@/lib/data';

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
});

const merriweather = Merriweather({
  weight: ['300', '400', '700'],
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export async function generateMetadata(): Promise<Metadata> {
  const data = await getData();
  const { meta } = data.seo;

  return {
    title: {
      default: meta.title,
      template: `%s | ${data.businessInfo.name}`,
    },
    description: meta.description,
    keywords: meta.keywords,
    authors: [{ name: data.businessInfo.name }],
    creator: data.businessInfo.name,
    publisher: data.businessInfo.name,
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      siteName: data.businessInfo.name,
      title: meta.title,
      description: meta.description,
      images: [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: data.businessInfo.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
    },
    alternates: {
      canonical: '/',
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = await getData();
  const { schema } = data.seo;

  return (
    <html
      lang="en"
      className="overflow-x-hidden"
      suppressHydrationWarning
    >
      <head>
        {/* Schema.org JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema),
          }}
        />

        {/* Favicon - Add your favicon files to /public */}
        <link rel="icon" href="/favicon.ico" sizes="any" />

        {/* Theme Color */}
        <meta name="theme-color" content="#1e3a5f" />

        {/* Disable phone number detection on iOS */}
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body className="min-h-screen antialiased overflow-x-hidden" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
