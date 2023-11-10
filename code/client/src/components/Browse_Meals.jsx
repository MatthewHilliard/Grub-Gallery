import styled from "styled-components"

function Browse_Meals(props) {
  const mealsList = props.browseMealsList.map((element, index) => (
        <Grid key={element.id}>
          <Card>
            <img src={element.image} alt={element.title}/>
            <h4>{element.title}</h4>
          </Card>
        </Grid>
    ))
  return (
    <div>
      <PopularPicksHeader>Our Popular Picks:</PopularPicksHeader>
    <Grid>
      {mealsList}
    </Grid>
    </div>
  )
}

const Wrapper = styled.div`
  margin: 4rem 0rem;
`;

const Card = styled.div`
  min-height: 20rem;
  border-radius: 2rem;
  overflow: hidden;
  img {
    border-radius: 2rem;
    width: 100%;
    max-height: 100%; /* Ensure the image doesn't exceed the container height */
  }
  h4 {
    text-align: center;
    padding: 1rem;
  }
`;

const Grid = styled.div`
display: grid;
grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
grid-gap: 2rem;
margin: 0 auto; /* Center the grid horizontally */
max-width: 1200px; /* Set a maximum width for the grid */
margin-top: 20px; /* Adjust the value as needed */
`;

const PopularPicksHeader = styled.h1`
margin-top: 40px;
  font-size: 1.5rem; /* Adjust the font size as needed */
  font-weight: bold;
  text-align: left;
  margin-left: 100px;
`;
export default Browse_Meals
