import React from "react"

const Total = (props) => {
	const totalExercises = props.total
		.map((part) => part.exercises)
		.reduce((sum, exercises) => sum + exercises, 0)

	return (
		<b>
			<p>Number of exercises {totalExercises}</p>
		</b>
	)
}
export default Total
