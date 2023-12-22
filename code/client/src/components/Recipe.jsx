import { useEffect, useState } from "react"
import { addEventToCalendar } from "../functions/googleCalendar"
import styled from "styled-components"
import addFavorite from "../functions/addFavorite"
import removeFavorite from "../functions/removeFavorite"
import listFavorites from "../functions/listFavorites"
import favorite from '../assets/addFavorite.png'
import unFavorite from '../assets/removeFavorite.png'

// MUI datetime picker : https://mui.com/x/react-date-pickers/getting-started/
import dayjs from 'dayjs';
import 'dayjs/locale/en'; // Import the locale you want to use
import utc from 'dayjs/plugin/utc';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// formatting for dates
dayjs.extend(utc)
dayjs.extend(localizedFormat)



function Recipe({ recipe, isAuthenticated, user, favoritesList, setFavoritesList }) {
  const [activeTab, setActiveTab] = useState('instructions')

    // selectedDateTime : tracks the start date and time for the user's event
    const [selectedDateTime, setSelectedDateTime] = useState(
      dayjs().startOf('day').add(12, 'hours')
    )
    
  
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
              <img className="favoriteIcon" src={unFavorite} onClick={() => removeFavorite(user, { recipe_id: recipe.id }, callListFavorites )} />
              :
              <img className="favoriteIcon" src={favorite} onClick={() => addFavorite(user.uid, recipe, callListFavorites)} />
              )
            }
          <img src={recipe.image} alt="" style={{ marginRight: '400px' }}/>
        </ImageWrapper>
      )

    }, [favoritesList, isAuthenticated, recipe])



    // Google Calendar integration
    const handleAddEvent = async () => {
      try {
        const endTime = selectedDateTime.add(recipe.readyInMinutes, 'minutes')
        const eventDetails = {
          summary: recipe.title,
          description: recipe.summary,
          startTime: selectedDateTime.toISOString(),
          endTime: endTime.toISOString(), 
        }
        console.log('eventDetails', eventDetails)
    
        await addEventToCalendar(eventDetails)
        console.log('Event added successfully!')
      } catch (error) {
        console.error('Error adding event:', error)
      }
    };

    // console.log(selectedDateTime)
  return (

    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DetailWrapper>
          <div>
              <h2>{recipe.title}</h2>
              {displayImageIcon}
              {isAuthenticated && 
                <>
                  <DateTimePicker
                      className="w-[250px]"
                      value={selectedDateTime}
                      onChange={(newDateTime) => setSelectedDateTime(newDateTime)}
                  />
                  
                  <button onClick={handleAddEvent}>Add to gcal</button> 
                </>
              }
          </div>
          <Info>
          
              <Button className={activeTab === 'instructions' ? 'active' : ''} onClick={() => setActiveTab("instructions")}>Instructions</Button> 
              <Button className={activeTab === 'ingredients' ? 'active' : ''} onClick={() => setActiveTab("ingredients")}>Ingredients</Button>
              {activeTab === 'instructions' && (
                              <div>
                              <h1>Overview:</h1>
                              <h3 dangerouslySetInnerHTML={{ __html: recipe.summary }}></h3>
                              <h1>Instructions:</h1>
                              <h3 dangerouslySetInnerHTML={{ __html: recipe.instructions }}></h3>
                              </div>
              )}
              {activeTab === 'ingredients' &&(
                              <div>{recipe.extendedIngredients.map((ingredient) => (
                                  <li key={ingredient.id}>{ingredient.original}</li>
                              ))}</div>
              )}

          </Info>
      </DetailWrapper>
    </LocalizationProvider>

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
