import styled from "styled-components"

function SearchResults(props) {
    {/* note: we use "props" as a standard to represent every input taken for these lower level components. So props.searchMealsList is the same thing.  */ }
    { /* Uses the map function on the searchMealsList and does some "work" using the element and an index which starts from 0 */ }
    const mealsList = props.searchMealsList.map((element, index) => (

        // LOOKS UNDER CONSTRUCTION

        //Work:
        //Sets a unique key based on the index for each div container
        <Grid key={element.id}>
          <Card>
            <img src={element.image} alt={element.title}/>
            <h4>{element.title}</h4>
          </Card>
        </Grid>
    ))
    return (
        <div>
            {/* Displays the newly mapped list, which is just a bunch of div containers of information for each element */}
            <Grid>{mealsList}</Grid>
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
export default SearchResults

