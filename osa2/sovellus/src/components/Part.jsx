import React from "react"

const Part = (props) => {
	console.log(props.osat)
	return (
		<p>
			{props.osat.name} {props.osat.exercises}
		</p>
	)
}

export default Part
