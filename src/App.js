import React, { useState, useEffect } from 'react'
import './scss/main.scss'

function App() {
	const [geolocation, setGeolocation] = useState({})

	const randomQuoteApi =
		'https://programming-quotes-api.herokuapp.com/Quotes/random'

	const worldTimeApi = 'https://worldtimeapi.org/api/timezone/Asia/Tbilisi'

	const GEOLOCATION_API_KEY = process.env.REACT_APP_GEOLOCATION_API_KEY

	const geolocationApi = `https://api.ipbase.com/v2/info?apikey=${GEOLOCATION_API_KEY}&language=en&ip=`

	const fetchGeolocation = async url => {
		const res = await fetch(url)
		const data = await res.json()
		setGeolocation(data.data)
	}
	console.log(geolocation)

	useEffect(() => {
		fetchGeolocation(geolocationApi)
	}, [])

	return <div className='App'></div>
}

export default App
