import logo from './assets/forkandknife.png'
import menu_bar from './assets/menu_bar.png'

function NavBar(){
    return(
        <div class="flex flex-row mx-auto my-auto overflow-hidden">
            <div class="">
                <img class='h-16 py-2 px-2' src={logo}/>
            </div>
            <div class="py-3 text-4xl font-light">
                <h1>Meal Planner</h1>
            </div>
            <button class=''>
                <img class='h-16' src={menu_bar}/>
            </button>
        </div>
    )
}

export default NavBar