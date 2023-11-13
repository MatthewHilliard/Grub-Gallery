import Axios from 'axios'
import { useEffect, useState } from 'react';



function Favorites({ user }) {

  // can set globally within app if want to use elsewhere
  const [favoritesList, setFavoritesList] = useState([])

  function listFavorites() {

    // Send "get" request using Axios to the backend and sets favoritesList to its data returned back
    Axios.get('http://localhost:3000/users/getFavorites',
      {
        params: {
          user
        }
      })
      .then((response) => {
        // Need to get favorites
        setFavoritesList(response.data)
      })
  }

  useEffect(() => {
    listFavorites()
  }, [])

  const favoritesDisplayList = favoritesList.map((element, index) => (
    <div id={element.id}>
      <h4>{element.title}</h4>
    </div>
  ))

  return (
    <div>
      <h1> Your Favorites </h1>
      <div>
        { /* console.log(favoritesList) */}
        {favoritesDisplayList}
      </div>
    </div>
  )
}

export default Favorites