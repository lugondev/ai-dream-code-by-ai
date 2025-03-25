import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import './globals.css'

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
	title: 'Lucky Numbers Dream Oracle | Lottery Number Predictions',
	description: 'Transform your dreams into lucky lottery numbers with our mystical dream interpreter. Get personalized dream meanings and fortune predictions.',
	keywords: 'lottery numbers, dream interpretation, lucky numbers, dream meaning, fortune telling, gambling predictions',
	metadataBase: new URL('https://loto79.top'),
	themeColor: '#1E40AF',
	manifest: '/manifest.json',
	openGraph: {
		title: 'Lucky Numbers Dream Oracle | Lottery Predictions',
		description: 'Get your personalized lucky lottery numbers from dream interpretations',
		siteName: 'Lucky Numbers Dream Oracle',
		type: 'website',
		locale: 'en_US',
		images: [
			{
				url: '/fortune-cookie.png',
				width: 800,
				height: 800,
				alt: 'Fortune Cookie with Lucky Numbers',
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Lucky Numbers Dream Oracle',
		description: 'Turn your dreams into lucky lottery numbers',
		images: ['/fortune-cookie.png'],
	},
	viewport: {
		width: 'device-width',
		initialScale: 1,
		maximumScale: 1,
	},
	robots: {
		index: true,
		follow: true,
	},
	icons: {
		icon: '/favicon.ico',
		apple: '/fortune-cookie.png',
	},
}

export default function RootLayout({children}: {children: React.ReactNode}) {
	return (
		<html lang='en'>
			<body className={inter.className}>{children}</body>
		</html>
	)
}
