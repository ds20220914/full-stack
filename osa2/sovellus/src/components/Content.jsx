import React from 'react'
import Part from './Part'

const Content = (props) => {
	console.log(props.parts[1])
	return (
		<div>
			<Part osat={props.parts[0]} />
			<Part osat={props.parts[1]} />
			<Part osat={props.parts[2]} />
		</div>
	)
}

export default Content
