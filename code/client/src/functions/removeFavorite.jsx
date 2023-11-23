import Axios from "axios"

async function removeFavorite(user, recipe, listFavorites){
    Axios.delete("http://localhost:3000/users/removeFavorite", {
      params: {
        user,
        recipe
      }
    })
    .then((response) => {
      // only call `listFavorites` if on `favorites` page
      if (listFavorites) {
          listFavorites()
      }
      console.log("Removed from favorited recipes")
    })
    .catch((error) => {
      console.error('Error removing favorite:', error)
    })
  }


export default removeFavorite