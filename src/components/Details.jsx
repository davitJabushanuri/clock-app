import React from 'react'

const Details = ({ geolocation, detailsInfo }) => {
	return (
		<div className='details'>
			<div className='details__container'>
				<p className='details__container__key'>current timezone</p>
				<h2 className='details__container__value'>
					{geolocation?.timezone?.id}
				</h2>
			</div>
			<div className='details__container'>
				<p className='details__container__key'>day of the year</p>
				<h2 className='details__container__value'>
					{detailsInfo.dayOfTheYear}
				</h2>
			</div>
			<div className='details__container'>
				<p className='details__container__key'>day of the week</p>
				<h2 className='details__container__value'>
					{detailsInfo.dayOfTheWeek}
				</h2>
			</div>
			<div className='details__container'>
				<p className='details__container__key'>week number</p>
				<h2 className='details__container__value'>{detailsInfo.weekNumber}</h2>
			</div>
		</div>
	)
}

export default Details
