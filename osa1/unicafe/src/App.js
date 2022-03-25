import { useState } from 'react'

const Statistics = (props) => {
  const ave = props.average / props.all;
  const pos = (props.good / props.all) * 100;
  console.log(props.all);
  if(props.all === 0) return(<div>
    No feedback given
  </div>)
  
  return(
    <>
    <StatisticLine text="good" value={props.good} />
    <StatisticLine text="neutral" value={props.neutral} />
    <StatisticLine text="bad" value={props.bad} />
    <StatisticLine text="all" value={props.all} />
    <StatisticLine text="average" value={ave} />
    <StatisticLine text="positive" value={pos + '%'} />
    </>
  )
}
const StatisticLine = (props) => {
  return (
    <p>{props.text} {props.value}</p>
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
      <h2>Statistics</h2>
      <Statistics average={average} all={allVotes} good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App