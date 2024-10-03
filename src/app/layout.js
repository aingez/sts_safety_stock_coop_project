import "./globals.css";
import Nav from "../components/Nav";
import { Inter } from "next/font/google";
import Footer from "../components/Footer";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "./ThemeProviders";

const inter = Inter({ subsets: ["latin"], display: 'swap' });

export const metadata = {
  title: "STS Safety Stock Monitor",
  description: "Developed by Aingthawan K.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <div className="bg-gray-200 dark:bg-neutral-700">
          <Nav />
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            transition={false}
          >
            <div className="md:mx-20 sm:mx-10 mx-5">
              <Toaster position="bottom-center" />
              {children}
            </div>
          </ThemeProvider>
        </div>
        <Footer />
      </body>
    </html>
  );
}
