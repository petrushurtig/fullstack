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
    console.log(list[0]);
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
        
      </div>
    )
  }
   
  
}
export default App;