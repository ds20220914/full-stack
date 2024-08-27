import { useState } from "react"

const Button = (props) => (
	<button onClick={props.handleClick}>{props.text}</button>
)

const Statistics = (props) => {
	return (
		<div>
			<p>{props.status}</p>
		</div>
	)
}

const App = () => {
	// tallenna napit omaan tilaansa
	const [good, setGood] = useState(0)
	const [neutral, setNeutral] = useState(0)
	const [bad, setBad] = useState(0)

	return (
		<div>
			<h2>give feedback</h2>
			<Button handleClick={() => setGood(good + 1)} text="good">
				good
			</Button>
			<Button handleClick={() => setNeutral(neutral + 1)} text="neutral">
				neutral
			</Button>
			<Button handleClick={() => setBad(bad + 1)} text="bad">
				bad
			</Button>
			<h2>statistics</h2>
			<Statistics status={good} />
			<Statistics status={neutral} />
			<Statistics status={bad} />
		</div>
	)
}

export default App
