function SearchResults(props) {
    {/* note: we use "props" as a standard to represent every input taken for these lower level components. So props.searchMealsList is the same thing.  */ }
    { /* Uses the map function on the searchMealsList and does some "work" using the element and an index which starts from 0 */ }
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