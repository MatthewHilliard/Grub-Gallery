import styled from "styled-components"
import Axios from "axios"
import { useNavigate, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import handleRecipeClick from "../functions/handleRecipeClick"
import addFavorite from "../functions/addFavorite"
import removeFavorite from "../functions/removeFavorite"
import listFavorites from "../functions/listFavorites"
import favorite from '../assets/addFavorite.png'
import unFavorite from '../assets/removeFavorite.png'

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
            {props.isAuthenticated && (
              favoritesIdSet.has(String(element.id)) ?
                <img className="favoriteIcon" src={unFavorite} onClick={() => removeFavorite(props.user, { recipe_id: element.id }, callListFavorites)} />
                :

                <img className="favoriteIcon" src={favorite} onClick={() => addFavorite(props.user.uid, element, callListFavorites)} />
                )
              }

            <Link to={"/recipe"} onClick={() => handleRecipeClick(element.id, props.setRecipe, navigate)}>
              <img className="recipeImage" src={element.image} alt={element.title} />
            </Link>

            <h4>{element.title}</h4>

          </Card>
        </Grid>
      ))
    )

    }, [props.favoritesList, props.mealsList, props.isAuthenticated])



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
  .recipeImage {
    border-radius: 2rem;

    max-height: 100%; /* Ensure the image doesn't exceed the container height */

    &:hover {
      transform: scale(0.98);
      filter: brightness(0.8)
    }
  }
  h4 {
    text-align: center;
    padding: 1rem;
    font-weight: 600;
  }

  .favoriteIcon {
    position: absolute;
    margin-top: -10px;
    margin-left: -10px;
    width: 30px;
    z-index: 1; /* Ensure the icon is on top */

    // backdrop-filter: blur(10px);
    // box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
    // background: linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1));
    // border-radius: 50%; /* Optional: to create a circular background */


    &:hover {
      cursor: pointer;
      transform: scale(1.2);
      filter: brightness(.95)
    }
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

