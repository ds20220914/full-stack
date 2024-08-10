const Header = (props) => {
	return (
		<div>
			<h1>{props.course}</h1>
		</div>
	)
}

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

const Part = (props) => {
	return (
		<div>
			<p>
				{props.osat.name} {props.osat.exercises}
			</p>
		</div>
	)
}

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

const App = () => {
	const course = {
		name: "Half Stack application development",
		parts: [
			{
				name: "Fundamentals of React",
				exercises: 10,
			},
			{
				name: "Using props to pass data",
				exercises: 7,
			},
			{
				name: "State of a component",
				exercises: 14,
			},
		],
	}
	return (
		<div>
			<Header course={course.name} />
			<Content parts={course.parts} />
			<Total total={course.parts} />
		</div>
	)
}

export default App
