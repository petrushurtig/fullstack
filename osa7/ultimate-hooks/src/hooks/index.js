import { useState, useEffect } from 'react'
import axios from 'axios'

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
export const useResource = (baseUrl) => {
    const [resources, setResources] = useState([])
  
    useEffect(() => {
        getAll()
    }, [])

    const getAll = () => {
        axios.get(baseUrl)
        .then(res => setResources(res.data))
    }

    const create = (resource) => {
        axios.post(baseUrl, resource)
        .then(res => {
            setResources(resources.concat(res))
        })
    }

    const service = {
      create,
      getAll
    }
  
    return [
      resources, service
    ]
  }