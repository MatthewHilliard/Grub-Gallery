import logo from '../assets/forkandknife.png'
import menu_bar from '../assets/menu_bar.png'
import profile_photo from '../assets/profile.png'
import { Link } from 'react-router-dom'

function NavBar(){
    return(
        <div className="flex flex-row mx-auto my-auto overflow-hidden">
            <div className='flex items-center'>
                <Link to="/"><img className='h-16 py-2 px-2' src={logo}/></Link>
                <h1 className="py-3 text-4xl font-light">Meal Planner</h1>
            </div>
            <div className="ml-5 mt-2"> {/*Can change the placement as needed*/}

                <form className="w-[480px] relative">
                    <div className="relative">
                        <input type="search" placeholder="What would you like to eat today?" className="w-full p-4 rounded-full" /> {/*Color*/}
                    </div>
                </form>
            </div>

            <div className='flex items-center ml-auto mr-5'>
                <button className=''>
                    <Link to="/login"><img className='h-10' src={profile_photo}/></Link>
                </button>
                <button className='ml-5'> {/* Adjust the ml-2 (margin-left) as needed */}
                    <img className='h-12' src={menu_bar}/>
                </button>
            </div>
        </div>
    )
}

export default NavBar