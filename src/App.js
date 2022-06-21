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
import Details from './components/Details'

function App() {
	const [geolocation, setGeolocation] = useState({})
	const [time, setTime] = useState()
	const [isDay, setIsDay] = useState(false)
	const [greeting, setGreeting] = useState('Good morning')
	const [background, setBackground] = useState(mobileDayBackground)
	const [detailsInfo, setDetailsInfo] = useState({})

	const [dropDown, setDropDown] = useState(false)

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

		setDetailsInfo({
			dayOfTheYear: data?.day_of_year,
			dayOfTheWeek: data?.day_of_week,
			weekNumber: data?.week_number,
		})

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

		console.log(data)
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
			{!dropDown && <Quotes />}

			<div style={{ bottom: dropDown ? '0' : null }} className='timeContainer'>
				<Time
					dropDown={dropDown}
					setDropDown={setDropDown}
					greeting={greeting}
					time={time}
					geolocation={geolocation}
					isDay={isDay}
				/>
				<Details geolocation={geolocation} detailsInfo={detailsInfo} />
			</div>
		</div>
	)
}

export default App
