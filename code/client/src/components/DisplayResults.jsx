import styled from "styled-components"
import Axios from "axios"
import { useNavigate, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import handleRecipeClick from "../functions/handleRecipeClick"
import removeFavorite from "../functions/removeFavorite"
import listFavorites from "../functions/listFavorites"

function DisplayResults(props) {
    // navigate : redirect to other pages (react-router-dom function)
    const navigate = useNavigate()

    // Function to call listFavorites with the required parameters
    const callListFavorites = () => {
      listFavorites(props.user, props.isAuthenticated, props.setFavoritesList);
    }

    // mealsList : state variable to map meals to elements rendered on the page
    const [displayMealsList, setDisplayMealsList] = useState([])

    // useEffect : re-initialize `favoritesId` and `favoritesIdSet` every time `favoritesList` is changed
    useEffect(() => {
      // obtain list of favorites
      const favoritesId = props.favoritesList.map((element, index) => element.recipe_id)
      // convert to `set` (to increase look-up time effeciency)
      const favoritesIdSet = new Set(favoritesId)

      // update mealsList
      setDisplayMealsList(
        props.mealsList.map((element, index) => (
          //Sets a unique key based on the index for each div container
          <Grid key={element.id}>
            <Card>
              <Link to={"/recipe"} onClick={() => handleRecipeClick(element.id, props.setRecipe, navigate)}>
                  <img src={element.image} alt={element.title}/>
                </Link>
                <h4>{element.title}</h4>
                {props.isAuthenticated && (
                  favoritesIdSet.has(String(element.id)) ?
                  <button onClick={() => removeFavorite(props.user, { recipe_id: element.id }, callListFavorites )}>
                    Remove favorite
                  </button>
                  :
                  <button onClick={() => addFavorite(element)}>
                    Add favorite
                  </button>
                )
                }
            </Card>
          </Grid>
        ))
    )

    }, [props.favoritesList])

    
 
    function addFavorite(response) {

      // body : object of data being sent to backend endpoint
      const body = {
          user_id: props.user.sub,
          recipe_id: response.id,
          title: response.title,
          image: response.image
      }

      // Call backend's MongoDB 'createUsers' endpoint to create the user, backend sends "response" back ("response" pretty useless unless debugging)
      // Backend takes in "req.body", which is the name & email retrieved from Google
      Axios.put("http://localhost:3000/users/addFavorite", body)
          .then((response) => {
              callListFavorites()
              console.log("Add favorite api call repsonse: " + response)
          })
      }


    return (
        <div className="mt-20">
            {/* Displays the newly mapped list, which is just a bunch of div containers of information for each element */}
            <Grid>{displayMealsList}</Grid>
        </div>
    )
}

// template strings below used for styling custom divs

const Card = styled.div`
  min-height: 20rem;
  border-radius: 2rem;
  overflow: hidden;
  img {
    border-radius: 2rem;
    width: 100%;
    max-height: 100%; /* Ensure the image doesn't exceed the container height */

    &:hover {
      transform: scale(0.97);
      filter: brightness(0.8)
    }
  }
  h4 {
    text-align: center;
    padding: 1rem;
  }
`

const Grid = styled.div`
display: grid;
grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
grid-gap: 2rem;
margin: 0 auto; /* Center the grid horizontally */
max-width: 1200px; /* Set a maximum width for the grid */
margin-top: 20px; /* Adjust the value as needed */
`

const PopularPicksHeader = styled.h1`
margin-top: 40px;
  font-size: 1.5rem; /* Adjust the font size as needed */
  font-weight: bold;
  text-align: left;
  margin-left: 100px;
`

export default DisplayResults

