import food1 from "../assets/spaghetti.jpg"
import food2 from "../assets/food2.jpg"
import food3 from "../assets/food3.jpg"
import food4 from "../assets/food4.jpg"
import food5 from "../assets/food5.jpg"
import food6 from "../assets/food6.jpg"

function Home() {
  
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
          <button className="bg-gray-700 hover:bg-gray-900 text-white py-2 px-5 rounded">
            Browse Meals
          </button>
        </div>
        
      </div> 
    )
}

export default Home