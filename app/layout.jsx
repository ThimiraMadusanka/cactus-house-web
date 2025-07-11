import '@styles/globals.css'

import { Tauri } from 'next/font/google'

export const metadata = {
  title: "Cactus House",
  description: "Discover the best Cactus plants in the world.",
};

const tauri = Tauri({ 
  weight: '400',
  subsets: ['latin'],
})

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main className={tauri.className}>
          {children}
        </main>
      </body>
    </html>
  );
}
