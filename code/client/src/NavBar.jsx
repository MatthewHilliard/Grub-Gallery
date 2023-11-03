import logo from './assets/forkandknife.png'
import menu_bar from './assets/menu_bar.png'
import profile_photo from './assets/profile.png'
import { useState } from 'react'

function NavBar(){
    const [isOpen, setIsOpen] = useState(false);
    return(
        <div class="flex flex-row mx-auto my-auto overflow-hidden">
            <div class='flex items-center'>
                <img class='h-16 py-2 px-2' src={logo}/>
                <h1 class="py-3 text-4xl font-light">Meal Planner</h1>
            </div>
            <div class='flex items-center ml-auto mr-5'>
                <button class=''>
                    <img class='h-10' src={profile_photo}/>
                </button>
                <button onClick={() => setIsOpen((prev) => !prev)} class='ml-5'> {/* Adjust the ml-2 (margin-left) as needed */}
                    <img class='h-12' src={menu_bar}/>
                </button>
                {isOpen && <div class="bg-[#B28370] absolute top-14 flex flex-col items-start rounded w-full">
                    <div class="flex flex-auto flex-col hover:bg-blue-300 cursour-pointer rounded-r-lg border-l-transparent ">
                        <h3>Favorites</h3>
                        <h3>Schedule</h3>
                    </div>
                </div>
                    }
            </div>
        </div>
    )
}

export default NavBar