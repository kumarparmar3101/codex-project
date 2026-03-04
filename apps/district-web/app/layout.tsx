import type { PropsWithChildren } from 'react';
import './globals.css';
import { districtTheme } from '../src/theme/districtTheme';

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body style={{ fontFamily: districtTheme.font }}>
        <main>
          <header className="app-header">
            <h1>District</h1>
            <nav className="app-nav" aria-label="Primary">
              <a href="/">Home</a>
              <a href="/city/mumbai">Mumbai</a>
              <a href="/city/delhi">Delhi</a>
              <a href="/city/bengaluru">Bengaluru</a>
              <a href="/my-bookings">My bookings</a>
            </nav>
          </header>
          {children}
        </main>
      </body>
    </html>
  );
}
