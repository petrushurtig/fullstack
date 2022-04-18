import { useState } from 'react'

export const useField = (type) => {
    const [value, setValue] = useState("")
  
    const change = {
        value,
        onChange: e => {
            setValue(e.target.value)
        },
        type
    }
    const reset = () => {
        setValue('')
    }
    return [value, change, reset]
  }