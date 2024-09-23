import services from "../services/note"

const Persons = (props) => {
	const personsToShow = props.persons.filter((person) =>
		person.name.toLowerCase().includes(props.filter.toLowerCase())
	)
	console.log("2", personsToShow)
	return (
		<ul>
			{personsToShow.map((person, index) => (
				<li key={index}>
					{person.name} {person.number}{" "}
					<button
						onClick={() =>
							services.handleDelete(
								person.id,
								person.name,
								props.persons,
								props.setPersons,
								props.updateNote
							)
						}
					>
						delete
					</button>
				</li>
			))}
		</ul>
	)
}

export default Persons
