import axios from 'axios';
import { useEffect, useState } from 'react';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchWord, setSearchWord] = useState('');

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
    .then(res => {
      setCountries(res.data);
      //setCountries(res.data.);
    })
  }, []);
  console.log(searchWord);

  return(
    <div>
      <input value={searchWord} onChange={(e) => setSearchWord(e.target.value)}/>
      <CountryList setSearchWord={setSearchWord} searchWord={searchWord} countries={countries}/>
    </div>
  )
}
const CountryList = ({searchWord, setSearchWord, countries}) => {
  const list = countries.filter(country => country.name.common.match(new RegExp(searchWord, "i")));
  const [temp, setTemp] = useState();
  const [wind, setWind] = useState();
  const [icon, setIcon] = useState('');
  
  if(searchWord === '') return <p>Search some countries</p>
  if(list.length > 10) return <p>Too many results</p>
  if(list.length < 1) return <p>No results</p>
  if(list.length > 1  && list.length <= 10)
  return(
    <div>
      {list
        .map(country => 
        <div>
         <p 
          key={country.name.common}
          >
              {country.name.common}
              <button onClick={() => setSearchWord(country.name.common)}>show</button>
            </p>
        </div>
        )}
    </div>
  )
  if(list.length === 1) {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${list[0].name.common}&appid=${process.env.REACT_APP_API_KEY}&units=metric`)
    .then(res => {
      setIcon(`http://openweathermap.org/img/wn/${res.data.weather[0].icon}@2x.png`)
      setWind(res.data.wind.speed)
      setTemp(res.data.main.temp)
    });
    return(
      <div>
        <h2>{list[0].name.common}</h2>
        <p>{list[0].capital}</p>
        <p>{list[0].area}</p>
        <h4>languages:</h4>
        <ul>
          {Object.entries(list[0].languages).map(([key, value]) => (
            <li key={key}>{value}</li>
          ))}
        </ul>
        <img alt='flag' src={list[0].flags.png} height='100px' width='150px' />
        <h3>Weather in {list[0].name.common}</h3>
        <p>temperature {temp} Celsius</p>
        <img alt="icon" src={icon} height={50} width={50}></img>
        <p>wind {wind} m/s</p>
      </div>
    )
  }
}
export default App;