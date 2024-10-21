import Navbar from '../../../components/Navbar.jsx';

export const metadata = {
  title: "Payless4Tech",
  description: "Payless4Tech online electronic shop",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}