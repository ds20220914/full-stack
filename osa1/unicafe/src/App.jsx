import { useState } from "react"

const Button = (props) => (
	<button onClick={props.handleClick}>{props.text}</button>
)

const StatisticLine = (props) => {
	return (
		<table>
			<tbody>
				<tr>
					<td>{props.text}</td>
					<td>{props.status}</td>
				</tr>
			</tbody>
		</table>
	)
}

const App = () => {
	// tallenna napit omaan tilaansa
	const [good, setGood] = useState(0)
	const [neutral, setNeutral] = useState(0)
	const [bad, setBad] = useState(0)
	const total = good + neutral + bad
	const average = (good - bad) / total
	const positive = (good / total) * 100

	if (total === 0) {
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
				No feedback given
			</div>
		)
	}
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
			<StatisticLine text="good" status={good} />
			<StatisticLine text="neutral " status={neutral} />
			<StatisticLine text="bad" status={bad} />
			<StatisticLine text="total " status={total} />
			<StatisticLine text="average " status={average} />
			<StatisticLine text="positive" status={positive} />
		</div>
	)
}

export default App
