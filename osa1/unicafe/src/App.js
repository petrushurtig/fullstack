import { useState } from 'react'

const Display = (props) => {
  return(
    <>
      <p>good {props.good}</p>
      <p>neutral {props.neutral}</p>
      <p>bad {props.bad}</p>
    </>
  )
}
const Button = (props) => {
  return(
    <button onClick={props.handleClick}>{props.name}</button>
  )
}
const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGood = () => setGood(good +1);
  const increaseNeutral = () => setNeutral(neutral +1);
  const increaseBad = () => setBad(bad +1);

  return (
    <div>
      <h1>give feedback</h1>
      <Button name="good" handleClick={increaseGood}/>
      <Button name="neutral" handleClick={increaseNeutral}/>
      <Button name="bad" handleClick={increaseBad}/>
      {/* <Display good={good} neutral={neutral} bad={bad} /> */}
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
    </div>
  )
}

export default App