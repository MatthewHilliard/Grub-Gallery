import logo from './assets/forkandknife.png'
import menu_bar from './assets/menu_bar.png'
import profile_photo from './assets/profile.png'

function NavBar(){
    return(
        <div class="flex flex-row mx-auto my-auto overflow-hidden">
            <div class="">
                <img class='h-16 py-2 px-2' src={logo}/>
            </div>
            <div class="py-3 text-4xl font-light">
                <h1>Meal Planner</h1>
            </div>
            <div class='flex items-center ml-auto mr-5'>
                <button className=''>
                    <img className='h-10' src={profile_photo}/>
                </button>
                <button className='ml-2'> {/* Adjust the ml-2 (margin-left) as needed */}
                    <img className='h-12' src={menu_bar}/>
                </button>
            </div>
        </div>
    )
}

export default NavBar