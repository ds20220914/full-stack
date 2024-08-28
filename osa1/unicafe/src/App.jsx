import { useState } from "react"

const Button = (props) => (
	<button onClick={props.handleClick}>{props.text}</button>
)

const Statistics = (props) => {
	return <div>{props.status}</div>
}

const Total = (props) => {
	return <div>total {props.good + props.neutral + props.bad}</div>
}

const Average = (props) => {
	if (props.good === 0 || props.good + props.bad + props.neutral === 0) {
		return <div>Average 0</div>
	}
	return (
		<div>
			Average {(props.good - props.bad) / (props.good + props.bad + props.neutral)}
		</div>
	)
}

const Positive = (props) => {
	if (props.good === 0 || props.good + props.bad + props.neutral === 0) {
		return <div>Positive 0</div>
	}

	return (
		<div>
			Positive {(props.good / (props.good + props.bad + props.neutral)) * 100}
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
			<Total good={good} neutral={neutral} bad={bad} />
			<Average good={good} neutral={neutral} bad={bad} />
			<Positive good={good} neutral={neutral} bad={bad} />
		</div>
	)
}

export default App
