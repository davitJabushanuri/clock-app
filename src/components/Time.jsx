import React from 'react'
import dayIcon from '../assets/desktop/icon-sun.svg'
import nightIcon from '../assets/desktop/icon-moon.svg'
import downArrow from '../assets/desktop/icon-arrow-down.svg'
import upArrow from '../assets/desktop/icon-arrow-up.svg'

const Time = ({
	greeting,
	time,
	geolocation,
	isDay,
	setDropDown,
	dropDown,
}) => {
	return (
		<section className='time'>
			<div className='time__greeting'>
				<img
					className='time__greeting__icon'
					src={isDay ? dayIcon : nightIcon}
					alt=''
				/>
				<h1 className='time__greeting__text'>{greeting.toUpperCase()}</h1>
			</div>

			<div className='time__clock'>
				<h2 className='time__clock__text'>{time}</h2>
				<h3 className='time__clock__timezone'>
					{geolocation?.timezone?.code} BST
				</h3>
			</div>

			<div className='time__location'>
				<h3 className='time__location__text'>
					IN {geolocation?.location?.city?.name},{' '}
					{geolocation?.location?.country?.alpha2}
				</h3>
			</div>

			<div className='time__dropdown'>
				<button
					onClick={() => setDropDown(prev => !prev)}
					className='time__dropdown__button'
				>
					<span>MORE</span>
					<div className='time__dropdown__button__image'>
						<img
							style={{ transform: dropDown ? 'rotate(180deg)' : null }}
							src={downArrow}
							alt=''
						/>
					</div>
				</button>
			</div>
		</section>
	)
}

export default Time
