import "./globals.css";
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { Quicksand, Roboto } from '@next/font/google';
import { StateContextProvider } from '@/lib/StateContext';
import { Toaster } from 'react-hot-toast';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'], 
});

const ubuntu = Quicksand({
  subsets: ['latin'],
  weight: ['400', '700'], 
});

export const metadata = {
  title: "Payless4Tech",
  description: "Get high performance laptops at affordable prices",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${ubuntu.className}`}
      >
        <StateContextProvider>
          <div className="flex flex-col mx-auto">
            <Toaster />
            <Navbar />
            <main>
              {children}
            </main>
            <Footer />
          </div>
        </StateContextProvider>
      </body>
    </html>
  );
}