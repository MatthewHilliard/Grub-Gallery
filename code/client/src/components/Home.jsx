function Home() {
  
    return(
      <div className="grid grid-cols-2 gap-y-6 relative top-[200px]"> 
      
        <h1 className="text-7xl font-semibold px-10">Find. Plan. Eat.</h1>

        <div className="row-span-3">
          <div className="box-border h-[500px] w-[800px] rounded-3xl bg-[#B28370] boxShadow ml-auto mr-[20px]">
          </div>
          <div className="grid col-span-3">
            <img></img>
          </div>
        </div>

        <div className="px-10">
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