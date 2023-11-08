import React from 'react'

function Browse_Meals(props) {
  console.log(props.browseMealsList)
  const mealsList = props.browseMealsList.map((element, index) => (
    <div key={index}>
    <h3>{element.title}</h3>
    <img className='h-10' src={element.image}/>
    </div>
))
  return (
    <div>
      HELLO
      {mealsList}
    </div>
  )
}

export default Browse_Meals
