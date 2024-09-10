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

const Course = ({ course }) => {
	return (
		<div>
			<Header course={course.name} />
			<Content parts={course.parts} />
		</div>
	)
}

export default Course
