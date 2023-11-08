import food1 from "../assets/spaghetti.jpg"
import food2 from "../assets/food2.jpg"
import food3 from "../assets/food3.jpg"
import food4 from "../assets/food4.jpg"
import food5 from "../assets/food5.jpg"
import food6 from "../assets/food6.jpg"
import { Link } from 'react-router-dom'
import Axios from "axios"
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    // Perform the API request using Axios (replace with your API endpoint)
    // Once data is fetched, navigate to the "APIDataPage"
    try{
      Axios.post('http://localhost:3000/search/browse', body)
        .then(response => {
        const apiData = JSON.parse(response.data)
        // Pass the data as state to the "APIDataPage"
        const results = data.results
        navigate('/Browse_Meals', { state: { apiData } });
      })
    } catch (error) {
      console.log("Error fetching data from backend:", error)
    }
  };
    return(
      <div className="grid grid-cols-2 gap-y-6 relative top-[200px]"> 
        <h1 className="text-8xl font-semibold px-10">Find. Plan. Eat.</h1>
        <div className="row-span-4">
          <div className="box-border h-[500px] w-[800px] rounded-3xl bg-[#B28370] boxShadow ml-auto mr-[20px]">
            <div className="grid grid-cols-3 p-9 gap-12">
              <img src={food1} className ="h-48 rounded-xl"/>
              <img src={food2} className ="h-48 rounded-xl"/>
              <img src={food3} className ="h-48 rounded-xl"/>
              <img src={food4} className ="h-48 rounded-xl"/>
              <img src={food5} className ="h-48 rounded-xl"/>
              <img src={food6} className ="h-48 rounded-xl"/>
            </div>
          </div>
        </div>

        <div className="px-10 text-lg py-6">
          <h2>Discover delectable dishes and seamlessly integrate them into your schedule with Google Calender integration. Elevate your dining experience effortlessly with Meal Planner.</h2>
        </div>

        <div className="px-10">
        <Link to="/browse_meals">
          <button onClick={handleButtonClick} className="bg-gray-700 hover:bg-gray-900 text-white py-2 px-5 rounded">
            Browse Meals
          </button>
          </Link>
        </div>
        
      </div> 
    )
}

export default Home