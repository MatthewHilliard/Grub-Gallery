import Axios from 'axios'

function getFavorites(user) {
    Axios.get('http://localhost:3000/users/getFavorites', {
        params: {
          user
        }
      })
      .then(function (response) {
        console.log(response);
      })
}

function Favorites(user){
    return(
        <h1>test</h1>
    )
}

export default Favorites