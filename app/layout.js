import { ChakraProvider } from '@chakra-ui/react';
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Question Generator",
  description: "Generate questions to start a conversation with someone new.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{background: "#1a202c"}} className={inter.className}>
        <ChakraProvider>
          {children}
        </ChakraProvider>
      </body>
    </html>
  );
}
