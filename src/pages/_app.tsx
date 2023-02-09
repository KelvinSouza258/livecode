import '@/styles/globals.css'

import { Roboto } from '@next/font/google'
import type { AppProps } from 'next/app'
import Link from 'next/link'

const roboto = Roboto({
    subsets: ['latin'],
    weight: ['400', '500', '700'],
    variable: '--roboto-font',
})

export default function App({ Component, pageProps }: AppProps) {
    return (
        <main className={`${roboto.variable} font-sans`}>
            <nav className="flex justify-end gap-3 px-8 py-2">
                <Link href="/">Home</Link>
                <Link href="/adicionar-post">Adicionar post</Link>
            </nav>
            <Component {...pageProps} />
        </main>
    )
}
