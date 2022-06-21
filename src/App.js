import React, { useState, useEffect } from 'react'
import Quotes from './components/Quotes'
import './scss/main.scss'

// backgrounds
import mobileDayBackground from './assets/mobile/bg-image-daytime.jpg'
import mobileNightBackground from './assets/mobile/bg-image-nighttime.jpg'
import tabletDayBackground from './assets/tablet/bg-image-daytime.jpg'
import tabletNightBackground from './assets/tablet/bg-image-nighttime.jpg'
import desktopDayBackground from './assets/desktop/bg-image-daytime.jpg'
import desktopNightBackground from './assets/desktop/bg-image-nighttime.jpg'
import Time from './components/Time'

function App() {
	const [geolocation, setGeolocation] = useState({})
	const [time, setTime] = useState()
	const [isDay, setIsDay] = useState(false)
	const [greeting, setGreeting] = useState('Good morning')
	const [background, setBackground] = useState(mobileDayBackground)

	const worldTimeApi = 'http://worldtimeapi.org/api/ip'
	const geolocationApi = `https://api.ipbase.com/v2/info?apikey=${process.env.REACT_APP_GEOLOCATION_API_KEY}&language=en&ip=`

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
		hours > 6 && hours < 18 ? setIsDay(true) : setIsDay(false)
		hours > 6 && hours <= 12
			? setGreeting('Good morning')
			: hours > 12 && hours <= 18
			? setGreeting('Good afternoon')
			: setGreeting('Good evening')
	}

	const setBackgroundImage = () => {
		if (window.innerWidth < 768) {
			isDay
				? setBackground(mobileDayBackground)
				: setBackground(mobileNightBackground)
		} else if (window.innerWidth < 992) {
			isDay
				? setBackground(tabletDayBackground)
				: setBackground(tabletNightBackground)
		} else {
			isDay
				? setBackground(desktopDayBackground)
				: setBackground(desktopNightBackground)
		}
	}

	console.log(geolocation)

	useEffect(() => {
		fetchGeolocation(geolocationApi)
		fetchWorldTime(worldTimeApi)
	}, [geolocationApi])

	useEffect(() => {
		setBackgroundImage()
	}, [isDay])

	return (
		<div
			className='App'
			style={{
				backgroundImage: `url(${background})`,
			}}
		>
			<Quotes />
			<Time
				greeting={greeting}
				time={time}
				geolocation={geolocation}
				isDay={isDay}
			/>
		</div>
	)
}

export default App
