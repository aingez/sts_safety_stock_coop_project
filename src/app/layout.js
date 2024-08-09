import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "./components/Nav"
import Footer from "./components/Footer"

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "STS Safety Stock Monitor",
  description: "Developed by STS",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Nav />
          <div className="mx-10">
            {children}
          </div>
        <Footer />
      </body>
    </html>
  );
}
