import { ClerkProvider } from "@clerk/nextjs"
import "~/styles/globals.css"
import { Inter, Lora } from "next/font/google"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

const lora = Lora({ subsets: ["latin"], variable: "--font-serif" })

export const metadata = {
  title: "Mr Book",
  description: "Manage your book shelf with ease.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${lora.variable} ${inter.variable}`}>
        <body>{children}</body>
      </html>
    </ClerkProvider>
  )
}
