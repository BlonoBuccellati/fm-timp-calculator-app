import type { Metadata } from 'next';
import { Space_Mono } from 'next/font/google';
import '@/styles/globals.css';

const spaceMono = Space_Mono({
  variable: '--font-space-mono',
  subsets: ['latin'],
  weight: ['700'],
});
export const metadata: Metadata = {
  title: 'Frontend Mentor | Tip calculator app',
  description: 'Tip calculator app',
  icons: 'favicon-32x32.png',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${spaceMono.variable} antialiased`}>{children}</body>
    </html>
  );
}
