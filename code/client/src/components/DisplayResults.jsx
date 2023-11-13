import { Link } from "react-router-dom";
import styled from "styled-components"
import Axios from "axios"
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';


function DisplayResults(props) {
    const navigate = useNavigate()

    // handleRecipeClick : calls spoonacular api from backend `/search/recipe` endpoint and updates `recipe` object
    const handleRecipeClick = async (id) => {
      // Perform the API request using Axios (replace with your API endpoint)
      // Once data is fetched, navigate to the "APIDataPage"
      try {
        Axios.post("http://localhost:3000/search/recipe", { id: id }).then(
          (response) => {
            const apiData = response.data
            // Pass the data as state to the "APIDataPage"
            const parsedData = JSON.parse(apiData)
            // Use the setRecipe prop directly
            props.setRecipe(parsedData)
            // update `recipe` (aka `parsedData`) in localStorage
            localStorage.setItem('recipe', JSON.stringify(parsedData))
            
            // navigate to recipe page
            navigate('/recipe')
          }
        )
      } catch (error) {
        console.log("Error fetching data from backend:", error);
      }
    }

    function addFavorite(response) {
      // console.log("favorite clicked", response)

      // body : object of data being sent to backend endpoint
      const body = {
          user_id: props.user.sub,
          recipe_id: response.id,
          title: response.title,
          image: response.image
      }
      console.log("BODY", body)
      // Call backend's MongoDB 'createUsers' endpoint to create the user, backend sends "response" back ("response" pretty useless unless debugging)
      // Backend takes in "req.body", which is the name & email retrieved from Google
      Axios.put("http://localhost:3000/users/addFavorite", body)
          .then((response) => {
              console.log("Create User API call response: " + response)
          })
      }



    {/* note: we use "props" as a standard to represent every input taken for these lower level components. So props.searchMealsList is the same thing.  */ }
    { /* Uses the map function on the searchMealsList and does some "work" using the element and an index which starts from 0 */ }
    const mealsList = props.mealsList.map((element, index) => (

        //Sets a unique key based on the index for each div container
        <Grid key={element.id}>
          <Card>
            <Link to={"/recipe"} onClick={() => handleRecipeClick(element.id)}>
                <img src={element.image} alt={element.title}/>
              </Link>
              <h4>{element.title}</h4>

              {props.isAuthenticated &&
                <button onClick={() => addFavorite(element)}>
                  Add favorite
                </button>
              }
          </Card>
        </Grid>
    ))
    return (
        <div className="mt-20">
            {/* Displays the newly mapped list, which is just a bunch of div containers of information for each element */}
            <Grid>{mealsList}</Grid>
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

