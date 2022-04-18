import { useState, useEffect } from "react"

export const useField = (type) => {
    const [value, setValue] = useState('')
  
    const onChange = (event) => {
      setValue(event.target.value)
    }
  
    return {
      type,
      value,
      onChange
    }
  }

export const useCountry = (name) => {
    const [country, setCountry] = useState(null)

    useEffect(() => {
        fetch(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
        .then(res => res.json())
        .then(data => setCountry(data[0]))
        .catch((err) => console.log(err))
    }, [name])
    
    return country
  }