const Content = ({ parts }) => {
	return (
		<div>
			{parts.map((part) => (
				<Part key={part.id} osat={part} />
			))}
		</div>
	)
}

const Header = (props) => {
	return <h2>{props.course}</h2>
}

const Part = (props) => {
	console.log(props.osat)
	return (
		<p>
			{props.osat.name} {props.osat.exercises}
		</p>
	)
}

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

const Course = ({ course }) => {
	return (
		<div>
			<Header course={course.name} />
			<Content parts={course.parts} />
			<Total total={course.parts} />
		</div>
	)
}

export default Course
