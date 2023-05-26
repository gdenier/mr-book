import { ClerkProvider } from "@clerk/nextjs"
import "~/styles/globals.css"
import { Inter, Lora } from "next/font/google"
import { cookies } from "next/dist/client/components/headers"
import { Providers } from "./providers"

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
      <html
        lang="en"
        className={`${lora.variable} ${inter.variable}`}
        suppressHydrationWarning
      >
        <body className="bg-background antialiased">
          <Providers>{children}</Providers>
        </body>
      </html>
    </ClerkProvider>
  )
}
