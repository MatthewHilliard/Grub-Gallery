function SearchResults(props) {
    const mealsList = props.searchMealsList.map((element, index) => (
        <div key={index}>
        <h3>{element.title}</h3>
        <img className='h-10' src={element.image}/>
        </div>
    ))
    return (
        <div>
            {mealsList}
        </div>
    )
}

export default SearchResults