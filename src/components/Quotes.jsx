import React, { useState, useEffect } from 'react'
import RefreshIcon from '../assets/desktop/icon-refresh.svg'

const Quotes = () => {
	const [quote, setQuote] = useState()

	const randomQuoteApi =
		'https://programming-quotes-api.herokuapp.com/Quotes/random'

	const getRandomQuote = async () => {
		const res = await fetch(randomQuoteApi)
		const data = await res.json()
		setQuote({
			quote: data.en,
			author: data.author,
		})
	}

	useEffect(() => {
		getRandomQuote()
	}, [])

	return (
		<section className='quotes'>
			<div className='quotes__container'>
				<div className='quotes__container__quote'>{quote && quote.quote}</div>
				<div className='quotes__container__author'>{quote && quote.author}</div>
				<div className='quotes__container__buttonContainer'>
					<button
						onClick={getRandomQuote}
						className='quotes__container__buttonContainer__button'
					>
						<img src={RefreshIcon} alt='' />
					</button>
				</div>
			</div>
		</section>
	)
}

export default Quotes
