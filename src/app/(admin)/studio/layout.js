import './globals.css';

export const metadata = {
  title: "Payless4Tech",
  description: "Payless4Tech online electronic shop",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}