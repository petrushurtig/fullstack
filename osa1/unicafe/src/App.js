import { useState } from 'react'

const Statistics = (props) => {
  const ave = props.stats.average / props.stats.all;
  const pos = (props.stats.good / props.stats.all) * 100;
  console.log(props.stats.all);
  if(props.stats.all === 0) return(<div>
    No feedback given
  </div>)
  
  return(
    <>
    <table>
      <tr>
        <td>good</td>
        <td>{props.stats.good}</td>
      </tr>
      <tr>
        <td>neutral</td>
        <td>{props.stats.neutral}</td>
      </tr>
      <tr>
        <td>bad</td>
        <td>{props.stats.bad}</td>
      </tr>
      <tr>
        <td>all</td>
        <td>{props.stats.all}</td>
      </tr>
      <tr>
        <td>average</td>
        <td>{ave}</td>
      </tr>
      <tr>
        <td>positive</td>
        <td>{pos}%</td>
      </tr>
    </table>
    {/* <StatisticLine text="good" value={props.stats.good} />
    <StatisticLine text="neutral" value={props.stats.neutral} />
    <StatisticLine text="bad" value={props.stats.bad} />
    <StatisticLine text="all" value={props.stats.all} />
    <StatisticLine text="average" value={ave} />
    <StatisticLine text="positive" value={pos + '%'} /> */}
    </>
  )
}
// const StatisticLine = (props) => {
//   return (
//     <p>{props.text} {props.value}</p>
//   )
// }
const Button = (props) => {
  return(
    <button onClick={props.handleClick}>{props.name}</button>
  )
}

const App = () => {
  const [stats, setStats] = useState({good: 0, neutral: 0, bad: 0, all: 0, average: 0});

  const increaseGood = () => { 
    const newStats = {
      ...stats, 
      good: stats.good +1,
      all: stats.all +1,
      average: stats.average +1
    }
    setStats(newStats)
  }
  const increaseNeutral = () => {
    const newStats = {
      ...stats, 
      neutral: stats.neutral +1,
      all: stats.all +1,
    }
    setStats(newStats)
  }
  const increaseBad = () => {
    const newStats = {
      ...stats, 
      bad: stats.bad +1,
      all: stats.all +1,
      average: stats.average -1
    }
    setStats(newStats)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button name="good" handleClick={increaseGood}/>
      <Button name="neutral" handleClick={increaseNeutral}/>
      <Button name="bad" handleClick={increaseBad}/>
      <h2>Statistics</h2>
      <Statistics stats={stats}/>
    </div>
  )
}

export default App