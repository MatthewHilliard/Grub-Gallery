function SearchResults(props) {
    {/* note: can also use "props" to represent every input taken for these functions. So props.searchMealsList is the same thing */ }
        // "props" is just a standard way of passing parameters from a high level to lower level component - De Rocco
    {/* why does it print props.searchMealsList twice in test console? */ }
        // that's just how react works lol ig they wanna make sure we don't miss anything :// lol - De Rocco
    { /* Uses the map function on the searchMealsList and does some "work" using the element and an index which starts from 0 */ }
        // Yuh
    const mealsList = props.searchMealsList.map((element, index) => (

        // LOOKS UNDER CONSTRUCTION

        //Work:
        //Sets a unique key based on the index for each div container
        <div key={index}>
            {/* Grabs the element's title & image attribute (remember they have been converted to an object), which is the name of the food & an image of the food */}
            <h3>{element.title}</h3>
            <img className='h-10' src={element.image} />
        </div>
    ))
    return (
        <div>
            {/* Displays the newly mapped list, which is just a bunch of div containers of information for each element */}
            {mealsList}
        </div>
    )
}

export default SearchResults