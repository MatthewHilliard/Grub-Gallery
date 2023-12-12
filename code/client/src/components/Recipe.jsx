import { useEffect, useState } from "react"
import styled from "styled-components"
import addFavorite from "../functions/addFavorite"
import removeFavorite from "../functions/removeFavorite"
import listFavorites from "../functions/listFavorites"
import favorite from '../assets/addFavorite.png'
import unFavorite from '../assets/removeFavorite.png'

function Recipe({ recipe, isAuthenticated, user, favoritesList, setFavoritesList }) {
  const [activeTab, setActiveTab] = useState('instructions')


  // Function to call listFavorites with the required parameters
  const callListFavorites = () => {
    listFavorites(user, isAuthenticated, setFavoritesList);
  }

  // mealsList : state variable to properly display image and favorite/unfavorite icon
  const [displayImageIcon, setDisplayImageIcon] = useState([])

  // useEffect : re-initialize `favoritesId` and `favoritesIdSet` every time `favoritesList` is changed
  useEffect(() => {
    // obtain list of favorites
    const favoritesId = favoritesList.map((element, index) => element.recipe_id)
    // convert to `set` (to increase look-up time effeciency)
    const favoritesIdSet = new Set(favoritesId)

    // update displayImageIcon
    setDisplayImageIcon(
      <ImageWrapper>
        {isAuthenticated && (
          favoritesIdSet.has(String(recipe.id)) ?
            <img className="favoriteIcon" src={unFavorite} onClick={() => removeFavorite(user, { recipe_id: recipe.id }, callListFavorites)} />
            :
            <img className="favoriteIcon" src={favorite} onClick={() => addFavorite(user.sub, recipe, callListFavorites)} />
        )
        }
        <img src={recipe.image} alt="" style={{ marginRight: '400px' }} />
      </ImageWrapper>
    )

  }, [favoritesList, isAuthenticated, recipe])

  return (
    <DetailWrapper>
      <div>
        <h2>{recipe.title}</h2>
        {displayImageIcon}
      </div>
      <Info>

        <Button className={activeTab === 'instructions' ? 'active' : ''} onClick={() => setActiveTab("instructions")}>Instructions</Button>
        <Button className={activeTab === 'ingredients' ? 'active' : ''} onClick={() => setActiveTab("ingredients")}>Ingredients</Button>
        {activeTab === 'instructions' && (
          <div>
            <h1> <mark>Overview: </mark></h1>
            <h3 dangerouslySetInnerHTML={{ __html: recipe.summary }}></h3>
            <h1><mark>Instructions: </mark></h1>
            <h3 dangerouslySetInnerHTML={{ __html: recipe.instructions }}></h3>
          </div>
        )}
        {activeTab === 'ingredients' && (
          <div>{recipe.extendedIngredients.map((ingredient) => (
            <li key={ingredient.id}>{ingredient.original}</li>
          ))}</div>
        )}

      </Info>
    </DetailWrapper>
  )
}

export default Recipe




const DetailWrapper = styled.div`
    margin-top: 10rem;
    margin-bottom: 5rem;
    margin-left: 5rem;
    margin-right: 5rem;
    display: flex;
    h2 {
        font-size: 30px;
        margin-bottom: 2rem;
    }
    img {
      border-radius: 20px;
    }
`;

const ImageWrapper = styled.div`
  width: 400px; /* adjust as needed */
  .favoriteIcon {
    position: absolute;
    margin-top: -20px;
    margin-left: -20px;
    width: 50px;
    z-index: 1; /* Ensure the icon is on top */


    &:hover {
      cursor: pointer;
      transform: scale(1.2);
      filter: brightness(.95)
    }
  }
`

const Button = styled.button`
    padding: 1rem 2rem;
    color: #313131;
    background: white;
    border: 2px solid black;
    margin-right: 2rem;
    font-weight: 600;
    &.active {
        background: black;
        color: white;
    }
`;

const Info = styled.div`
margin-left: ${props => (props.activeTab === 'instructions' ? '4rem' : props.activeTab === 'ingredients' ? '-196rem' : '0')};
  padding: 0 2rem; /* Adjust padding as needed */
  h3 {
    font-size: 1.2rem;
  }
  img {
    max-height: 600px;
  }
`;
