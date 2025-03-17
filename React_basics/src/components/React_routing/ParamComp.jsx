import React from 'react'
import { useParams } from 'react-router-dom'

const ParamComp = () => {
    const {id} = useParams();//sends the id as a parameter
  return (
    <div>
      Params: {id}
    </div>
    /*the id is used as an id parameter which sends the parameters in the routing 
    if id=smtg in url then it acts as a query parameter */
  )
}

export default ParamComp
