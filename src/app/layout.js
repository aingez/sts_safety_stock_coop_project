import "./globals.css";
import Nav from "../components/Nav";
import { Inter } from "next/font/google";
import Footer from "../components/Footer";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "./ThemeProviders";
import SwitchTheme from "../components/themeSwitch";

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
            <div className="fixed bottom-4 right-4">
              <SwitchTheme />
            </div>
            <div className="mx-20">
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
