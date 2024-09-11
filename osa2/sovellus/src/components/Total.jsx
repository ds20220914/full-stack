import React from "react"

const Total = (props) => {
	return (
		<div>
			<p>
				Number of exercises{" "}
				{props.total[0].exercises +
					props.total[1].exercises +
					props.total[2].exercises}
			</p>
		</div>
	)
}
export default Total
