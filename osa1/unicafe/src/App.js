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
const Average = (props) => {
  const ave = props.average / props.all;
  return(
    <>
    average {ave}
    </>
  )
}
const Positive = (props) => {
  const pos = (props.good / props.all) * 100;
  return(
    <div>
    positive {pos} %
    </div>
  )
}
const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allVotes, setAllVotes] = useState(0);
  const [average, setAverage] = useState(0);

  const increaseGood = () => { 
    setGood(good +1);
    setAllVotes(allVotes + 1);
    setAverage(average +1);
  }
  const increaseNeutral = () => {
    setNeutral(neutral +1);
    setAllVotes(allVotes + 1);
  }
  const increaseBad = () => {
    setBad(bad +1);
    setAllVotes(allVotes + 1);
    setAverage(average -1);
  }

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
      <p>all {allVotes}</p>
      <Average average={average} all={allVotes} />
      <Positive good={good} all={allVotes} />
    </div>
  )
}

export default App