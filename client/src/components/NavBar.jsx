import logo from '../assets/forkandknife.png'
import profile_photo from '../assets/profile.png'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Squash as Hamburger } from 'hamburger-react'
import { useClickAway } from "react-use";
import { useRef } from "react";
import { routes } from "../HamburgerMenuRoutes.js";
import { AnimatePresence, motion } from "framer-motion";
import Axios from 'axios'
import './Header.css';


function NavBar({ setSearchMealsList, user, isAuthenticated }) {

    // navigate : used to redirect user to other urls...
    const navigate = useNavigate()
    const ref = useRef(null);
    useClickAway(ref, () => setOpen(false));

    // create and maintain "searchString" within searchbar
    const [searchString, setSearchString] = useState("")

    // handleChange : update "searchString" for each keypress in searchbar
    function handleChange(event) {
        const { value } = event.target
        setSearchString(value)
    }

    // handleKeyDown : grabs keyboard symbol that user entered (check for 'Enter')
    function handleKeyDown(event) {
        if (event.key === 'Enter') {
            search()
        }
    }

    // make request to backend for search
    function search() {
        // Body init here, will be passed into the API call for searching meals
        const body = {
            searchString
        }
        try {
            Axios.post("http://localhost:3000/search/meals", body).then((response) => {
                // parse response data from JSON to a newly created javascript object, where the keys turn into attributes and the values turn into the value of those attributes
                const data = JSON.parse(response.data)

                // obtain array of results from api call. Results is an attribute of the newly created object
                const results = data.results

                // reassign searchMealsList
                setSearchMealsList(results)

                // store `searchMealsList` (aka `results`) in local storage
                localStorage.setItem('searchMealsList', JSON.stringify(results))

                // redirect to the `search/display-results` page
                navigate('/search/display-results')
            })
        } catch (error) {
            console.log("Error fetching data from backend:", error)
        }
    }

    // Hamburger menu opened or closed state
    const [isOpen, setOpen] = useState(false)

    // initialize firstName variable
    let firstName

    // extract first name from `user` (update variable)
    if (isAuthenticated) {
        firstName = user.displayName.split(" ")[0]
    }

    return (
        <div className="sticky bg-[#fad7b9] ">
            <div className="flex flex-row justify-center items-center mx-auto my-auto overflow-hidden">

                {/* Makes everything within this Link container a href, which points to the home route of pathname "/" */}
                <Link to="/">
                    <div className='flex items-center flex-shrink-0'>
                        <img className='h-16 py-2 px-2' src={logo} />
                        <h1 className="py-3 text-4xl font-light">Grub Gallery</h1>
                    </div>
                </Link>

                <div className="ml-5 mr-5 w-[350px]"> {/* NOT COMMENT: Can change the placement as needed*/}
                    {/* Creates the input box of type "search", updates searchString by calling handleChange & sees if "enter" is pressed */}
                    <input
                        type="search"
                        placeholder="What would you like to eat today?"
                        className="w-full p-4 rounded-full focus:outline-none"
                        name="searchbar"
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                    />
                </div>

                <div className='flex items-center ml-auto mr-5 flex-shrink-0'>

                    {isAuthenticated ?
                        <>
                            <div className='mr-5'>Hello, {firstName}</div>
                            <button className=''>
                                <Link to="/login"><img className='h-10 rounded-full' src={user.photoURL} /></Link>
                            </button>
                        </>
                        :
                        <button className=''>

                            <Link to="/login"><img className='h-10 rounded-full' src={profile_photo} /></Link>

                        </button>
                    }


                    {/* menu bar button */}
                    <button className='ml-5'> {/* NOT COMMENT: Adjust the ml-2 (margin-left) as needed */}
                        <Hamburger toggled={isOpen} toggle={setOpen} />
                        <AnimatePresence>
                            {isOpen && (
                                <div className="fixed shadow-4xl right-0 top-[4.0rem] p-5 pt-0 border-b border-b-white/20">
                                    <ul className="grid gap-2">
                                        {routes.map((route, idx) => {
                                            return (
                                                <motion.li
                                                    initial={{ scale: 0, opacity: 0 }}
                                                    animate={{ scale: 1, opacity: 1 }}
                                                    transition={{
                                                        type: "spring",
                                                        stiffness: 260,
                                                        damping: 20,
                                                        delay: 0.1 + idx / 10,
                                                    }}
                                                    key={route.title}
                                                    className="w-full p-[0.08rem] rounded-xl bg-gradient-to-tr from-neutral-800 via-neutral-950 to-neutral-700"
                                                >
                                                    <Link to={route.href}
                                                        onClick={() => setOpen((prev) => !prev)}
                                                        className={
                                                            "flex items-center justify-between w-full p-5 rounded-xl bg-gray-700"
                                                        }
                                                    >
                                                        <span className="flex gap-1 text-lg text-white">{route.title}</span>
                                                    </Link>
                                                </motion.li>
                                            )
                                        })}
                                    </ul>
                                </div>
                            )}
                        </AnimatePresence>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default NavBar