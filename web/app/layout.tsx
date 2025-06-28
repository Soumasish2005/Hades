import './globals.css';
import type { Metadata } from 'next';
import AuthSessionProvider from '@/components/providers/SessionProvider';

export const metadata: Metadata = {
  title: 'Hades - AI-Powered Cybersecurity Agent',
  description: 'Advanced AI-driven cybersecurity tools for red teamers, bug bounty hunters, and security engineers.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head></head>
      <body className="font-libertinus">
        <AuthSessionProvider>
          {children}
        </AuthSessionProvider>
      </body>
    </html>
  );
}