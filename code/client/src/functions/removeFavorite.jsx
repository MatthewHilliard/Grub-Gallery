import Axios from "axios"

async function removeFavorite(user, recipe, callListFavorites){
    Axios.delete("http://localhost:3000/users/removeFavorite", {
      params: {
        user_id: user.uid,
        recipe
      }
    })
    .then((response) => {
      // only call `listFavorites` if on `favorites` page
      if (callListFavorites) {
        callListFavorites()
      }
      console.log("Removed from favorited recipes")
    })
    .catch((error) => {
      console.error('Error removing favorite:', error)
    })
  }


export default removeFavorite