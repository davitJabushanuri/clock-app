import React, { useState, useEffect } from 'react'
import Quotes from './components/Quotes'
import './scss/main.scss'

function App() {
	const [geolocation, setGeolocation] = useState({})
	const [time, setTime] = useState()

	const worldTimeApi = 'https://worldtimeapi.org/api/timezone/Asia/Tbilisi'

	const GEOLOCATION_API_KEY = process.env.REACT_APP_GEOLOCATION_API_KEY

	const geolocationApi = `https://api.ipbase.com/v2/info?apikey=${GEOLOCATION_API_KEY}&language=en&ip=`

	const fetchGeolocation = async url => {
		const res = await fetch(url)
		const data = await res.json()
		setGeolocation(data.data)
	}

	const fetchWorldTime = async url => {
		const res = await fetch(url)
		const data = await res.json()
		const date = new Date(data.unixtime * 1000)
		var hours = date.getHours()
		var minutes = '0' + date.getMinutes()
		var formattedTime = hours + ':' + minutes.substr(-2)
		setTime(formattedTime)
		console.log(formattedTime)
	}

	useEffect(() => {
		fetchGeolocation(geolocationApi)
	}, [geolocationApi])

	useEffect(() => {
		fetchWorldTime('http://worldtimeapi.org/api/ip')
	}, [geolocation])

	return (
		<div className='App'>
			<Quotes />
		</div>
	)
}

export default App
