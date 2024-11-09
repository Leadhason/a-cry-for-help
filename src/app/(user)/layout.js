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
    <html lang="en" className="h-full">
      <body
        className={`${ubuntu.className} flex flex-col min-h-full`}
      >
        <StateContextProvider>
          <div className="flex flex-col flex-grow">
            <Toaster />
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </StateContextProvider>
      </body>
    </html>
  );
}