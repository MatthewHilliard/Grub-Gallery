import Axios from "axios"

function listFavorites(user, isAuthenticated, setFavoritesList) {
    // only run get request if user is authenticated
    if (isAuthenticated) {
      // Send "get" request using Axios to the backend and sets favoritesList to its data returned back
      Axios.get('http://localhost:3000/users/getFavorites',
        {
          params: {
            user
          }
        })
        .then((response) => {
          console.log("getting favorites", response)
          // Need to get favorites
          setFavoritesList(response.data)
          // update `recipe` (aka `parsedData`) in localStorage
          localStorage.setItem('favoritesList', JSON.stringify(response.data))
        })
        .catch((error) => {
          console.error('Error fetching favorites:', error)
        })
    }
  }

export default listFavorites