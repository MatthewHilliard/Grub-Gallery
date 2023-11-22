import Axios from 'axios'
import { useEffect, useState } from 'react'
import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import handleRecipeClick from "../functions/handleRecipeClick"
import removeFavorite from "../functions/removeFavorite"

function Favorites({ user, favoritesList, setFavoritesList, isAuthenticated, setRecipe }) {
  const navigate = useNavigate()
  console.log(favoritesList)

  function listFavorites() {
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

  useEffect(() => {
    listFavorites()
  }, [])


  const favoritesDisplayList = favoritesList.map((element, index) => (
    <Grid key={element.recipe_id}>
      <Card>
        <h4>{element.title}</h4>
        <Link to={"/recipe"} onClick={() => handleRecipeClick(element.recipe_id, setRecipe, navigate)}>
          <img src={element.image} alt={element.title}/>
        </Link>
        <button className="pl-14 pt-2" onClick={() => removeFavorite(user, element, listFavorites)}>Remove from Favorites</button>
      </Card>
    </Grid>
  ))

  return (
    <div>
      <h1 className="text-5xl text-center pt-5"> Your Favorites </h1>
      <Grid>
        { /* console.log(favoritesList) */}
        {favoritesDisplayList}
      </Grid>
    </div>
  )
}

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

export default Favorites