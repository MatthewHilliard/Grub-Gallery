// import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';
import { signInWithGoogle, handleSignOut } from "../Firebase"
import Axios from 'axios'
import checkmark from "../assets/checkmark.png";
import foodsafety from "../assets/food-safety.png";


// obtain google client_id from environmental variables
const client_id = import.meta.env.VITE_GOOGLE_CLIENT_ID


function Login({ user, isAuthenticated, setIsAuthenticated }) {


    // If we have no user: sign in button
    // If we have a user: show the log out button

    return (
        <div className="flex justify-center items-center gap-[200px] mt-[100px] ml-[100px] mr-[100px]">
            {/* Column 1 */}
            <div className='flex flex-col gap-[50px] items-center mr-auto'>
                <img src={foodsafety} className="max-w-[300px]" />


                {/* Main Content */}
                <h1 className="text-[34px] font-semibold">Find healthy and trusted recipes</h1>
                
                {/* Checkmarks and Text */}
                <div className="flex flex-col gap-[20px] text-[24px]">
                    <div className="flex items-center mb-4">
                        <img src={checkmark} className="h-8 pr-5" />
                        <h1>Find your favorite meals and recipes</h1>
                    </div>
                    <div className="flex items-center mb-4">
                        <img src={checkmark} className="h-8 pr-5" />
                        <h1>Filter suggestions for allergens, macros... etc.</h1>
                    </div>
                    <div className="flex items-center">
                        <img src={checkmark} className="h-8 pr-5" />
                        <h1>
                            Instantly save recipes with{' '}
                            <a href="https://calendar.google.com/calendar/u/0/r" target="_blank" rel="noopener noreferrer" className="underline">
                                Google Calendar
                            </a>
                        </h1>
                    </div>
                </div>
                
            </div>


            {/* Column 2 */}
            <div className="box-border h-[500px] w-[600px] min-w-[400px] rounded-3xl bg-[#B28370] boxShadow">
                {/* Sign Out Button */}
                {isAuthenticated ? 
                    <button className="google-btn w-60 h-10" onClick={handleSignOut}>
                        Sign Out
                    </button>
                    :
                    <div className='flex flex-col gap-[50px] text-white'>
                        <div className='flex flex-col gap-[20px] mt-[80px] ml-[50px] mr-[50px]'>
                            <h1 className="text-[40px] font-semibold">Sign up or log in</h1>
                            <p className="text-[20px]">Login below to start utilizing GrubGallery’s advanced features (e.g. Google Calendar, personalized meal suggestions...)</p>
                        </div>
                        
                        <button className="google-btn mb-4 md:mb-0 ml-auto mr-auto" onClick={signInWithGoogle}>
                            Sign In With Google
                        </button>
                    </div>
                }
            </div>

        </div>

    )
}

export default Login