import Axios from "axios"

function listFavorites(user, isAuthenticated, setFavoritesList) {
    // only run get request if user is authenticated
    if (isAuthenticated) {
      // Send "get" request using Axios to the backend and sets favoritesList to its data returned back
      Axios.get('http://localhost:3000/users/getFavorites',
        {
          params: {
            user_id: user.uid
          }
        })
        .then((response) => {
          console.log("getting favorites", response)
          const favorites = response.data
          
          // convert favorites into object (if not), and grab keys (if length is 0, we found no favorites)
          const length = Object.keys(favorites).length

          // Need to get favorites
          setFavoritesList(length > 0 ? response.data : [])
          // update `recipe` (aka `parsedData`) in localStorage
          localStorage.setItem('favoritesList', JSON.stringify(response.data))
        })
        .catch((error) => {
          console.error('Error fetching favorites:', error)
        })
    }
  }

export default listFavorites