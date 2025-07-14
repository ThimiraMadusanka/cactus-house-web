import '../styles/globals.css';
import "react-toastify/dist/ReactToastify.css";
import { Tauri } from 'next/font/google'
import { ToastContainer } from 'react-toastify';

export const metadata = {
  title: "Cactus House",
  description: "Discover the best Cactus plants in the world.",
};

const tauri = Tauri({ 
  weight: '400',
  subsets: ['latin'],
})

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) { 
  return (
    <html lang="en">
      <body>
        <main className={tauri.className}>
          {children}
          <ToastContainer position="top-right" />
        </main>
      </body>
    </html>
  );
}
