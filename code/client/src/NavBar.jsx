import logo from './assets/forkandknife.png'

function NavBar(){
    return(
        <div class="flex flex-row">
            <div class="basis-1/8">
                <img class='h-16' src={logo}/>
            </div>
            <div class="basis-1/8 py-3 text-4xl font-light">
                <h1>Meal Planner</h1>
            </div>
        </div>
    )
}

export default NavBar