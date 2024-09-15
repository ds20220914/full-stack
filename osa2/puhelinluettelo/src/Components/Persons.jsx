const Persons = (props) => {
	const personsToShow = props.persons.filter((person) =>
		person.name.toLowerCase().includes(props.filter.toLowerCase())
	)

	return (
		<ul>
			{personsToShow.map((person, index) => (
				<li key={index}>
					{person.name} {person.number}
				</li>
			))}
		</ul>
	)
}

export default Persons
