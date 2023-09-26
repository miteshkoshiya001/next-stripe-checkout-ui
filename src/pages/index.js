import Image from 'next/image'
import { Inter } from 'next/font/google'
import PaymentUi from '@/components/PaymentUi'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main
      className= " min-h-screen"
    >
      <PaymentUi />
    </main>
  )
}
