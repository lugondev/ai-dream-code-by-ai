'use client'

import {useState} from 'react'

export default function Home() {
	const [dream, setDream] = useState('')
	const [interpretation, setInterpretation] = useState('')
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')

	const interpretDream = async () => {
		if (!dream.trim()) {
			setError('Please enter your dream first')
			return
		}

		setLoading(true)
		setError('')

		try {
			const response = await fetch('/api/interpret-dream', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({dream}),
			})

			const data = await response.json()

			if (!response.ok) {
				throw new Error(data.error || 'Failed to interpret dream')
			}

			setInterpretation(data.interpretation)
		} catch (err: unknown) {
			const errorMessage = err instanceof Error ? err.message : 'Failed to get dream interpretation. Please try again.'
			setError(errorMessage)
		} finally {
			setLoading(false)
		}
	}

	const handleShare = () => {
		if (navigator.share) {
			navigator
				.share({
					title: 'My Dream Interpretation',
					text: interpretation,
				})
				.catch(() => {
					// Handle share error silently
				})
		} else {
			navigator.clipboard.writeText(interpretation).then(() => {
				alert('Interpretation copied to clipboard!')
			})
		}
	}

	return (
		<main className='min-h-screen bg-gradient-to-b from-purple-900 to-black text-white p-4'>
			<div className='max-w-2xl mx-auto pt-10'>
				<h1 className='text-4xl font-bold text-center mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500'>Mystical Dream Decoder</h1>
				<p className='text-center mb-8 text-purple-200'>Transform your dreams into lucky numbers</p>

				<div className='space-y-6'>
					<div className='relative'>
						<div className='space-y-2'>
							<textarea value={dream} onChange={(e) => setDream(e.target.value)} placeholder='Start with "I had a dream..." or "Last night I dreamed..."' className='w-full h-32 p-4 rounded-lg bg-purple-900/30 border border-purple-500/50 focus:border-gold-400 focus:ring-2 focus:ring-gold-400/50 outline-none text-white placeholder-purple-300' />
							<p className='text-purple-300 text-sm text-center'>Share your dream in English or Vietnamese (Chia sẻ giấc mơ bằng tiếng Anh hoặc tiếng Việt)</p>
						</div>
					</div>

					{error && <p className='text-red-400 text-center text-sm'>{error}</p>}

					<button onClick={interpretDream} disabled={loading} className='w-full py-3 px-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 rounded-lg font-semibold text-white transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed'>
						{loading ? 'Decoding Dream...' : 'Decode My Dream 🔮'}
					</button>

					{interpretation && (
						<div className='mt-8 p-6 rounded-lg bg-purple-900/30 border border-purple-500/50 space-y-4'>
							<div className='prose prose-invert max-w-none'>
								{interpretation.split('\n').map((line, i) => (
									<p key={i} className='mb-2'>
										{line}
									</p>
								))}
							</div>
							<button onClick={handleShare} className='w-full mt-4 py-2 px-4 bg-purple-800/50 hover:bg-purple-700/50 rounded-lg text-sm font-medium text-purple-200 transition-colors duration-200'>
								Share Result 📲
							</button>
						</div>
					)}
				</div>
			</div>
		</main>
	)
}
