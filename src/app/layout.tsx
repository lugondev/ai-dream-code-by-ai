import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import './globals.css'

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
	title: 'Mystical Dream Decoder | Lucky Numbers from Dreams',
	description: 'Transform your dreams into lucky numbers with our mystical dream interpreter. Get personalized interpretations and lucky numbers for your dreams.',
}

export default function RootLayout({children}: {children: React.ReactNode}) {
	return (
		<html lang='en'>
			<body className={inter.className}>{children}</body>
		</html>
	)
}
